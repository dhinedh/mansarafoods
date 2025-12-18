import { useState, useEffect } from 'react';
import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export function Products() {
  const products = mockProducts.filter(p => p.is_active);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Porridge Mixes', 'Oil & Ghee'];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="py-8 px-4" style={{ backgroundColor: '#1F2A7C' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Products</h1>
          <p className="text-white/80 mt-2">
            Browse our complete range of pure, nourishing foods
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="font-semibold mb-4" style={{ color: '#1F2A7C' }}>
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'font-semibold'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    style={
                      selectedCategory === category
                        ? { backgroundColor: '#FFF2CC', color: '#1F2A7C' }
                        : {}
                    }
                  >
                    {category === 'all' ? 'All Products' : category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
