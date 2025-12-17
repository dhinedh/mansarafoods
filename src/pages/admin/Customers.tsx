import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';
import { Profile, Order } from '../../types/database';

interface CustomerStats extends Profile {
  total_orders: number;
  total_spent: number;
}

export function Customers() {
  const [customers, setCustomers] = useState<CustomerStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerStats | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);

    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_admin', false)
      .order('created_at', { ascending: false });

    if (profiles) {
      const customersWithStats = await Promise.all(
        profiles.map(async (profile) => {
          const { data: orders } = await supabase
            .from('orders')
            .select('total_amount')
            .eq('user_id', profile.id);

          const total_orders = orders?.length || 0;
          const total_spent = orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0;

          return {
            ...profile,
            total_orders,
            total_spent,
          };
        })
      );

      setCustomers(customersWithStats);
    }

    setLoading(false);
  };

  const viewCustomerDetails = async (customer: CustomerStats) => {
    setSelectedCustomer(customer);

    const { data } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', customer.id)
      .order('created_at', { ascending: false });

    if (data) setCustomerOrders(data);
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
          Customers
        </h1>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading customers...</p>
            </div>
          ) : customers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No customers found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead style={{ backgroundColor: '#FFF2CC' }}>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Name
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Email
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Phone
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Total Orders
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Total Spent
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Joined
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="px-6 py-4">
                      <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                        {customer.full_name || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                    <td className="px-6 py-4 text-gray-600">{customer.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">{customer.total_orders}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">₹{customer.total_spent.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(customer.created_at).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => viewCustomerDetails(customer)}
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

        {selectedCustomer && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setSelectedCustomer(null)}
          >
            <div
              className="bg-white rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
                Customer Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFF2CC' }}>
                  <h3 className="font-semibold mb-3" style={{ color: '#1F2A7C' }}>
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Name:</span>{' '}
                      {selectedCustomer.full_name || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {selectedCustomer.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{' '}
                      {selectedCustomer.phone || 'N/A'}
                    </p>
                    <p>
                      <span className="font-semibold">Joined:</span>{' '}
                      {new Date(selectedCustomer.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg" style={{ backgroundColor: '#FFE4F0' }}>
                  <h3 className="font-semibold mb-3" style={{ color: '#1F2A7C' }}>
                    Order Statistics
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Total Orders:</span>{' '}
                      {selectedCustomer.total_orders}
                    </p>
                    <p>
                      <span className="font-semibold">Total Spent:</span> ₹
                      {selectedCustomer.total_spent.toFixed(2)}
                    </p>
                    <p>
                      <span className="font-semibold">Average Order:</span> ₹
                      {selectedCustomer.total_orders > 0
                        ? (selectedCustomer.total_spent / selectedCustomer.total_orders).toFixed(2)
                        : '0.00'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
                  Order History
                </h3>

                {customerOrders.length === 0 ? (
                  <div className="text-center py-8 text-gray-600">No orders yet</div>
                ) : (
                  <div className="space-y-3">
                    {customerOrders.map((order) => (
                      <div
                        key={order.id}
                        className="p-4 border-2 border-gray-200 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                            {order.order_number}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.total_amount.toFixed(2)}</p>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(
                              order.order_status
                            )}`}
                          >
                            {order.order_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
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
