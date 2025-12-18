import { mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export function Offers() {
  const offers = mockProducts.filter(p => p.is_offer && p.is_active);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div
        className="py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #FDB913 0%, #E91E63 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Special Offers</h1>
          <p className="text-xl text-white/90">
            Amazing deals on your favorite MANSARA products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {offers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No offers available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
