import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { mockOrders } from '../../data/mockData';
import { Order } from '../../types/database';

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    setOrders(mockOrders);
    setLoading(false);
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, order_status: newStatus } : o)));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, order_status: newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      packed: 'bg-purple-100 text-purple-800',
      shipped: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1F2A7C' }}>
          Orders
        </h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No orders found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead style={{ backgroundColor: '#FFF2CC' }}>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Order #
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Date
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Amount
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Payment
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-6 py-4">
                      <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                        {order.order_number}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">₹{order.total_amount.toFixed(2)}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          order.payment_status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.order_status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                          order.order_status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="packed">Packed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Eye className="w-5 h-5" style={{ color: '#1F2A7C' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {selectedOrder && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedOrder(null)}
          >
            <div
              className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
                Order Details
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-semibold">{selectedOrder.order_number}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-xl" style={{ color: '#1F2A7C' }}>
                    ₹{selectedOrder.total_amount.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Shipping Address</p>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
                    <p className="font-semibold">{selectedOrder.shipping_address.full_name}</p>
                    <p>{selectedOrder.shipping_address.phone}</p>
                    <p>{selectedOrder.shipping_address.address_line1}</p>
                    {selectedOrder.shipping_address.address_line2 && (
                      <p>{selectedOrder.shipping_address.address_line2}</p>
                    )}
                    <p>
                      {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state}{' '}
                      - {selectedOrder.shipping_address.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="mt-6 w-full py-2 rounded-lg font-semibold transition-all hover:shadow-md"
                style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
