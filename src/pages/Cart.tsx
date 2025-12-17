import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';

export function Cart() {
  const { cartItems, updateCartQuantity, removeFromCart, loading } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: '#FFFDF7' }}>
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
          Please Login
        </h2>
        <p className="text-gray-600 mb-6">You need to login to view your cart</p>
        <Link
          to="/login"
          className="px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
        >
          Login
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product
      ? item.product.offer_price || item.product.price
      : item.combo
      ? item.combo.combo_price
      : 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="py-8 px-4" style={{ backgroundColor: '#1F2A7C' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading cart...</p>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const itemData = item.product || item.combo;
                const itemName = item.product ? item.product.name : item.combo?.name || '';
                const itemImage = item.product
                  ? item.product.images[item.product.main_image_index]
                  : item.combo?.image_url || '';
                const itemPrice = item.product
                  ? item.product.offer_price || item.product.price
                  : item.combo?.combo_price || 0;

                return (
                  <div key={item.id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={itemImage}
                          alt={itemName}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2" style={{ color: '#1F2A7C' }}>
                          {itemName}
                        </h3>
                        <p className="text-gray-600 mb-4">₹{itemPrice.toFixed(2)} each</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border-2 border-gray-200 rounded-lg">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xl font-bold" style={{ color: '#1F2A7C' }}>
                          ₹{(itemPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between text-xl font-bold" style={{ color: '#1F2A7C' }}>
                    <span>Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-3 text-center rounded-lg font-semibold transition-all hover:shadow-md"
                  style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
                >
                  Proceed to Checkout
                </Link>

                <Link
                  to="/products"
                  className="block w-full py-3 mt-3 text-center rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                  style={{ borderColor: '#1F2A7C', color: '#1F2A7C' }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
