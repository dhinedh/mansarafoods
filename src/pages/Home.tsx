import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Percent, ShoppingBasket, Sparkles, Leaf, Heart, Shield } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/database';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true)
      .limit(6);

    if (data) setFeaturedProducts(data);
  };

  return (
    <div>
      <section
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            'linear-gradient(rgba(31, 42, 124, 0.7), rgba(31, 42, 124, 0.7)), url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nourish from Within</h1>
          <p className="text-2xl md:text-3xl mb-8">The Power of MANSARA</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:shadow-lg"
              style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all hover:bg-white hover:text-gray-900"
              style={{ borderColor: '#FDB913', color: '#FDB913' }}
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ backgroundColor: '#FFFDF7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/offers"
              className="group p-8 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: '#FFF2CC' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#FDB913' }}
              >
                <Percent className="w-8 h-8" style={{ color: '#1F2A7C' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#1F2A7C' }}>
                OFFERS
              </h3>
              <p className="text-gray-700">Special prices on selected products</p>
            </Link>

            <Link
              to="/combos"
              className="group p-8 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: '#FFE4F0' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#E91E63' }}
              >
                <ShoppingBasket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#1F2A7C' }}>
                COMBOS
              </h3>
              <p className="text-gray-700">Curated bundles for maximum value</p>
            </Link>

            <Link
              to="/new-arrivals"
              className="group p-8 rounded-2xl transition-all hover:shadow-xl cursor-pointer"
              style={{ backgroundColor: '#FFFDF7', border: '2px solid #EDE6D6' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ backgroundColor: '#FDB913' }}
              >
                <Sparkles className="w-8 h-8" style={{ color: '#1F2A7C' }} />
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: '#1F2A7C' }}>
                NEW ARRIVALS
              </h3>
              <p className="text-gray-700">Discover our latest products</p>
            </Link>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#1F2A7C' }}>
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4" style={{ backgroundColor: '#FFF2CC' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
            Why MANSARA
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            MANSARA was born from lived experience and a deep understanding of how clean,
            traditional food choices support everyday wellness. We believe that nourishment starts
            from within, and every product we create is a step toward better balance and mindful
            eating.
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
            style={{ backgroundColor: '#1F2A7C', color: 'white' }}
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Leaf className="w-12 h-12 mb-4" style={{ color: '#E91E63' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Pure Ingredients
              </h3>
              <p className="text-gray-700">Carefully selected, naturally clean ingredients</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-12 h-12 mb-4" style={{ color: '#E91E63' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Honest Food
              </h3>
              <p className="text-gray-700">Made with care, transparency, and responsibility</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 mb-4" style={{ color: '#E91E63' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                No Shortcuts
              </h3>
              <p className="text-gray-700">Traditional wisdom meets modern convenience</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
