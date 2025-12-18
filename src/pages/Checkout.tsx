import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types/database';

export function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    payment_method: 'cod',
  });

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product
      ? item.product.offer_price || item.product.price
      : item.combo
      ? item.combo.combo_price
      : 0;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setProcessing(true);
    try {
      const orderNumber = `ORD${Date.now()}`;

      const newOrder: Order = {
        id: 'order-' + Date.now(),
        order_number: orderNumber,
        user_id: user.id,
        total_amount: subtotal,
        payment_status: 'pending',
        payment_method: formData.payment_method,
        order_status: 'pending',
        shipping_address: {
          full_name: formData.full_name,
          phone: formData.phone,
          address_line1: formData.address_line1,
          address_line2: formData.address_line2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const ordersKey = `mansara_orders_${user.id}`;
      const existingOrders = localStorage.getItem(ordersKey);
      const orders = existingOrders ? JSON.parse(existingOrders) : [];
      orders.unshift(newOrder);
      localStorage.setItem(ordersKey, JSON.stringify(orders));

      await clearCart();

      navigate(`/order-success/${orderNumber}`);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
    setProcessing(false);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="py-8 px-4" style={{ backgroundColor: '#1F2A7C' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">Checkout</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address_line1}
                    onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={formData.address_line2}
                    onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment_method"
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="mr-3"
                  />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {cartItems.map((item) => {
                  const itemName = item.product ? item.product.name : item.combo?.name || '';
                  const itemPrice = item.product
                    ? item.product.offer_price || item.product.price
                    : item.combo?.combo_price || 0;

                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {itemName} x {item.quantity}
                      </span>
                      <span className="font-semibold">₹{(itemPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}

                <div className="border-t pt-3 flex justify-between text-xl font-bold" style={{ color: '#1F2A7C' }}>
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-md disabled:opacity-50"
                style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
