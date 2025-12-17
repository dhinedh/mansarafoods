import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/database';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';

export function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (data) {
      setProduct(data);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    if (!product) return;

    setAdding(true);
    try {
      await addToCart(product.id, undefined, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setAdding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Product not found</p>
        <Link
          to="/products"
          className="px-6 py-2 rounded-lg font-semibold"
          style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const displayPrice = product.offer_price || product.price;
  const hasDiscount = product.offer_price && product.offer_price < product.price;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <div className="aspect-square rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-[#E91E63]' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
                {product.name}
              </h1>

              {product.short_description && (
                <p className="text-gray-600 mb-4">{product.short_description}</p>
              )}

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold" style={{ color: '#1F2A7C' }}>
                  ₹{displayPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span
                      className="px-2 py-1 text-sm font-bold rounded"
                      style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
                    >
                      {Math.round(((product.price - product.offer_price!) / product.price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {product.weight && (
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Weight:</span> {product.weight}
                </p>
              )}

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={adding || product.stock_quantity === 0}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md disabled:opacity-50"
                  style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>

              {product.full_description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Description
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.full_description}
                  </p>
                </div>
              )}

              {product.ingredients && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Ingredients
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.ingredients}
                  </p>
                </div>
              )}

              {product.how_to_use && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    How to Use
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.how_to_use}
                  </p>
                </div>
              )}

              {product.storage_instructions && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Storage
                  </h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.storage_instructions}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                  The MANSARA Promise
                </h3>
                <p className="text-sm text-gray-700">
                  Pure ingredients, honest food, no shortcuts. Every product is made with care,
                  transparency, and a commitment to your wellness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
