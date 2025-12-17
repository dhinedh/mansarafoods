import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types/database';
import { ProductCard } from '../components/ProductCard';

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('is_new_arrival', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (data) setProducts(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div
        className="py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #1F2A7C 0%, #E91E63 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">New Arrivals</h1>
          <p className="text-xl text-white/90">
            Discover our latest additions to the MANSARA family
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading new arrivals...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No new arrivals at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
