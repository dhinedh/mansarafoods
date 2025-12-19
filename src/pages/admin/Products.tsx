import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { AdminLayout } from '../../components/AdminLayout';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types/database';

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    setProducts(mockProducts);
    setLoading(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    alert('Delete functionality is view-only in demo mode');
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1F2A7C' }}>
            Products
          </h1>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-md"
            style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found</p>
            </div>
          ) : (
            <table className="w-full">
              <thead style={{ backgroundColor: '#FFF2CC' }}>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Image
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Name
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Category
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Price
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Status
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Flags
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="px-6 py-4">
                      <img
                        src={product.images[product.main_image_index] || product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold" style={{ color: '#1F2A7C' }}>
                        {product.name}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">₹{product.price}</p>
                      {product.offer_price && (
                        <p className="text-sm text-gray-500">Offer: ₹{product.offer_price}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.stock_quantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          product.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {product.is_offer && (
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-yellow-100 text-yellow-800">
                            Offer
                          </span>
                        )}
                        {product.is_new_arrival && (
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-pink-100 text-pink-800">
                            New
                          </span>
                        )}
                        {product.is_featured && (
                          <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="p-2 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Edit className="w-5 h-5" style={{ color: '#1F2A7C' }} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
