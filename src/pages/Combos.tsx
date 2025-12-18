import { ShoppingCart } from 'lucide-react';
import { mockCombos, getComboProducts } from '../data/mockData';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';

export function Combos() {
  const combos = mockCombos.filter(c => c.is_active);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async (comboId: string) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    try {
      await addToCart(undefined, comboId, 1);
    } catch (error) {
      console.error('Error adding combo to cart:', error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div
        className="py-12 px-4"
        style={{
          background: 'linear-gradient(135deg, #E91E63 0%, #FDB913 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Value Combos</h1>
          <p className="text-xl text-white/90">
            Curated bundles designed for maximum value and convenience
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {combos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No combos available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {combos.map((combo) => {
              const savings = combo.original_price - combo.combo_price;
              const savingsPercent = Math.round((savings / combo.original_price) * 100);
              const comboProducts = getComboProducts(combo.id);

              return (
                <div
                  key={combo.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  {combo.image_url && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={combo.image_url}
                        alt={combo.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: '#1F2A7C' }}>
                      {combo.name}
                    </h3>
                    {combo.description && (
                      <p className="text-gray-600 text-sm mb-4">{combo.description}</p>
                    )}

                    {comboProducts.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                          Includes:
                        </p>
                        <ul className="space-y-1">
                          {comboProducts.map((item, idx) => (
                            <li key={idx} className="text-sm text-gray-600">
                              • {item.quantity}x {item.product.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="border-t pt-4">
                      <div className="flex items-baseline justify-between mb-2">
                        <div>
                          <span className="text-2xl font-bold" style={{ color: '#1F2A7C' }}>
                            ₹{combo.combo_price.toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ₹{combo.original_price.toFixed(2)}
                          </span>
                        </div>
                        <span
                          className="px-2 py-1 text-xs font-bold rounded"
                          style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
                        >
                          {savingsPercent}% OFF
                        </span>
                      </div>
                      <p className="text-sm mb-4" style={{ color: '#E91E63' }}>
                        You save ₹{savings.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleAddToCart(combo.id)}
                        className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md"
                        style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add Combo to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
