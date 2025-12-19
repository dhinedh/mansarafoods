import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Package, CheckCircle, Truck, Home, ArrowLeft, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types/database';

export function TrackOrder() {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrder();
  }, [user, orderNumber]);

  const fetchOrder = () => {
    if (!user || !orderNumber) return;

    const ordersKey = `mansara_orders_${user.id}`;
    const storedOrders = localStorage.getItem(ordersKey);

    if (storedOrders) {
      const orders: Order[] = JSON.parse(storedOrders);
      const foundOrder = orders.find(o => o.order_number === orderNumber);
      setOrder(foundOrder || null);
    }
  };

  const trackingSteps = [
    { status: 'pending', label: 'Order Placed', icon: Package, description: 'Your order has been placed successfully' },
    { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle, description: 'Seller confirmed your order' },
    { status: 'packed', label: 'Packed', icon: Package, description: 'Items are packed and ready to ship' },
    { status: 'shipped', label: 'Out for Delivery', icon: Truck, description: 'Your order is on the way' },
    { status: 'delivered', label: 'Delivered', icon: Home, description: 'Order delivered successfully' },
  ];

  const getStepStatus = (stepStatus: string) => {
    if (!order) return 'upcoming';

    const statusOrder = ['pending', 'confirmed', 'packed', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.order_status);
    const stepIndex = statusOrder.indexOf(stepStatus);

    if (order.order_status === 'cancelled') {
      return 'cancelled';
    }

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  if (!user) return null;

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFDF7' }}>
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600 mb-4">Order not found</p>
          <Link
            to="/account"
            className="inline-block px-6 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
          >
            Go to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="py-8 px-4" style={{ backgroundColor: '#1F2A7C' }}>
        <div className="max-w-7xl mx-auto">
          <Link
            to="/account"
            className="inline-flex items-center gap-2 text-white mb-4 hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Orders
          </Link>
          <h1 className="text-4xl font-bold text-white">Track Order</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Order Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="font-semibold text-lg">{order.order_number}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Order Date</p>
              <p className="font-semibold">
                {new Date(order.created_at).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="font-semibold text-xl" style={{ color: '#1F2A7C' }}>
                ₹{order.total_amount.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">Payment Method</p>
              <p className="font-semibold uppercase">{order.payment_method || 'COD'}</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
            <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
            <p className="font-semibold">{order.shipping_address.full_name}</p>
            <p className="text-sm">{order.shipping_address.phone}</p>
            <p className="text-sm">{order.shipping_address.address_line1}</p>
            {order.shipping_address.address_line2 && (
              <p className="text-sm">{order.shipping_address.address_line2}</p>
            )}
            <p className="text-sm">
              {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
            Order Tracking
          </h2>

          {order.order_status === 'cancelled' ? (
            <div className="text-center py-8">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: '#FFEBEE' }}
              >
                <X className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-xl font-semibold text-red-600 mb-2">Order Cancelled</p>
              <p className="text-gray-600">This order has been cancelled</p>
            </div>
          ) : (
            <div className="space-y-6">
              {trackingSteps.map((step, index) => {
                const Icon = step.icon;
                const status = getStepStatus(step.status);

                return (
                  <div key={step.status} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          status === 'completed'
                            ? 'bg-green-100'
                            : status === 'current'
                            ? 'bg-blue-100'
                            : 'bg-gray-100'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            status === 'completed'
                              ? 'text-green-600'
                              : status === 'current'
                              ? 'text-blue-600'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            status === 'completed' ? 'bg-green-400' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <h3
                        className={`font-semibold mb-1 ${
                          status === 'completed' || status === 'current'
                            ? 'text-gray-900'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </h3>
                      <p
                        className={`text-sm ${
                          status === 'completed' || status === 'current'
                            ? 'text-gray-600'
                            : 'text-gray-400'
                        }`}
                      >
                        {step.description}
                      </p>
                      {status === 'current' && (
                        <span
                          className="inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full"
                          style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
                        >
                          Current Status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4" style={{ color: '#1F2A7C' }}>
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="tel:+918838887064"
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFF2CC' }}
              >
                <Package className="w-5 h-5" style={{ color: '#1F2A7C' }} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                  Call Support
                </p>
                <p className="text-sm text-gray-600">+91 88388 87064</p>
              </div>
            </a>

            <a
              href="mailto:mansarafoods@gmail.com"
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FFE4F0' }}
              >
                <Package className="w-5 h-5" style={{ color: '#E91E63' }} />
              </div>
              <div>
                <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                  Email Us
                </p>
                <p className="text-sm text-gray-600">mansarafoods@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
