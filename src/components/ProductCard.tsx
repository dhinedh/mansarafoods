import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/database';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);

  const mainImage = product.images[product.main_image_index] || product.images[0];
  const displayPrice = product.offer_price || product.price;
  const hasDiscount = product.offer_price && product.offer_price < product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setAdding(true);
    try {
      await addToCart(product.id, undefined, 1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    setAdding(false);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.is_new_arrival && (
          <span
            className="absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white rounded-full"
            style={{ backgroundColor: '#E91E63' }}
          >
            NEW
          </span>
        )}
        {hasDiscount && (
          <span
            className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full"
            style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
          >
            {Math.round(((product.price - product.offer_price!) / product.price) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2" style={{ color: '#1F2A7C' }}>
          {product.name}
        </h3>
        {product.short_description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.short_description}</p>
        )}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold" style={{ color: '#1F2A7C' }}>
              ₹{displayPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock_quantity === 0}
            className="p-2 rounded-lg transition-all hover:shadow-md disabled:opacity-50"
            style={{ backgroundColor: '#FDB913' }}
          >
            <ShoppingCart className="w-5 h-5" style={{ color: '#1F2A7C' }} />
          </button>
        </div>
        {product.stock_quantity === 0 && (
          <p className="text-sm text-red-600 mt-2">Out of stock</p>
        )}
      </div>
    </Link>
  );
}
