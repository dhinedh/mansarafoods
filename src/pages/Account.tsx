import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Edit2, X, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types/database';

export function Account() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editingPhone, setEditingPhone] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
    if (profile) {
      setEditingName(profile.full_name || '');
      setEditingPhone(profile.phone || '');
    }
  }, [user, navigate, profile]);

  const fetchOrders = () => {
    if (!user) return;

    const ordersKey = `mansara_orders_${user.id}`;
    const storedOrders = localStorage.getItem(ordersKey);

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setSavingProfile(true);
    try {
      await updateProfile({
        full_name: editingName,
        phone: editingPhone
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
    setSavingProfile(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: '#FDB913',
      confirmed: '#4CAF50',
      packed: '#2196F3',
      shipped: '#9C27B0',
      delivered: '#4CAF50',
      cancelled: '#F44336',
    };
    return colors[status] || '#6B6B6B';
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="py-8 px-4" style={{ backgroundColor: '#1F2A7C' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              {editMode ? (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editingPhone}
                      onChange={(e) => setEditingPhone(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={savingProfile}
                      className="flex-1 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-md disabled:opacity-50"
                      style={{ backgroundColor: '#4CAF50', color: 'white' }}
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 py-2 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
                      style={{ borderColor: '#1F2A7C', color: '#1F2A7C' }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                        {profile.full_name || 'User'}
                      </h3>
                      <p className="text-sm text-gray-600">{profile.email}</p>
                      {profile.phone && <p className="text-sm text-gray-600">{profile.phone}</p>}
                    </div>
                    <button
                      onClick={() => setEditMode(true)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" style={{ color: '#1F2A7C' }} />
                    </button>
                  </div>
                </div>
              )}

              <button
                onClick={handleSignOut}
                className="w-full py-2 rounded-lg font-semibold border-2 transition-all hover:bg-red-50"
                style={{ borderColor: '#E91E63', color: '#E91E63' }}
              >
                Logout
              </button>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
                Order History
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-600">No orders yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg" style={{ color: '#1F2A7C' }}>
                            Order #{order.order_number}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <span
                            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
                            style={{ backgroundColor: getStatusColor(order.order_status) }}
                          >
                            {order.order_status.charAt(0).toUpperCase() +
                              order.order_status.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-600">Total Amount</p>
                          <p className="font-semibold text-lg" style={{ color: '#1F2A7C' }}>
                            ₹{order.total_amount.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Payment Status</p>
                          <p className="font-semibold">{order.payment_status}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/track-order/${order.order_number}`)}
                        className="w-full py-2 rounded-lg font-semibold transition-all hover:shadow-md"
                        style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
                      >
                        Track Order
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
