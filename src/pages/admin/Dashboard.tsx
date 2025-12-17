import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, Clock } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { supabase } from '../../lib/supabase';

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    todayOrders: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [products, orders, todayOrders, customers, pendingOrders] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('order_status', 'pending'),
    ]);

    setStats({
      totalProducts: products.count || 0,
      totalOrders: orders.count || 0,
      todayOrders: todayOrders.count || 0,
      totalCustomers: customers.count || 0,
      pendingOrders: pendingOrders.count || 0,
    });
  };

  const statCards = [
    {
      icon: ShoppingCart,
      label: 'Total Orders',
      value: stats.totalOrders,
      color: '#1F2A7C',
      bgColor: '#E3F2FD',
    },
    {
      icon: Clock,
      label: "Today's Orders",
      value: stats.todayOrders,
      color: '#FDB913',
      bgColor: '#FFF2CC',
    },
    {
      icon: Package,
      label: 'Total Products',
      value: stats.totalProducts,
      color: '#E91E63',
      bgColor: '#FFE4F0',
    },
    {
      icon: Clock,
      label: 'Pending Orders',
      value: stats.pendingOrders,
      color: '#FF9800',
      bgColor: '#FFF3E0',
    },
    {
      icon: Users,
      label: 'Total Customers',
      value: stats.totalCustomers,
      color: '#4CAF50',
      bgColor: '#E8F5E9',
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1F2A7C' }}>
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm"
                style={{ borderLeft: `4px solid ${stat.color}` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#1F2A7C' }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/admin/products/new"
              className="p-4 rounded-lg text-center font-semibold transition-all hover:shadow-md"
              style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
            >
              Add Product
            </Link>
            <Link
              to="/admin/orders"
              className="p-4 rounded-lg text-center font-semibold transition-all hover:shadow-md"
              style={{ backgroundColor: '#E91E63', color: 'white' }}
            >
              View Orders
            </Link>
            <Link
              to="/admin/combos/new"
              className="p-4 rounded-lg text-center font-semibold border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: '#1F2A7C', color: '#1F2A7C' }}
            >
              Create Combo
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
