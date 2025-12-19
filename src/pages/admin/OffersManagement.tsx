import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { mockProducts } from '../../data/mockData';
import { Product } from '../../types/database';

export function OffersManagement() {
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

  const toggleOfferStatus = (product: Product) => {
    setProducts(
      products.map((p) => (p.id === product.id ? { ...p, is_offer: !p.is_offer } : p))
    );
  };

  const updateOfferPrice = (productId: string, offerPrice: number | null) => {
    setProducts(
      products.map((p) => (p.id === productId ? { ...p, offer_price: offerPrice } : p))
    );
  };

  const offerProducts = products.filter((p) => p.is_offer);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8" style={{ color: '#1F2A7C' }}>
          Offers Management
        </h1>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Active Offers ({offerProducts.length})
          </h2>
          <p className="text-gray-600 mb-4">
            Products marked as "Is Offer" will appear on the Offers page. Set an offer price to
            show the discount.
          </p>

          {offerProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No active offers. Enable "Is Offer" flag on products below.
            </div>
          ) : (
            <div className="space-y-4">
              {offerProducts.map((product) => {
                const discount = product.offer_price
                  ? Math.round(((product.price - product.offer_price) / product.price) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg"
                  >
                    <img
                      src={product.images[product.main_image_index]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold" style={{ color: '#1F2A7C' }}>
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">
                          Original: ₹{product.price.toFixed(2)}
                        </span>
                        {product.offer_price && (
                          <>
                            <span className="text-sm font-semibold" style={{ color: '#E91E63' }}>
                              Offer: ₹{product.offer_price.toFixed(2)}
                            </span>
                            <span
                              className="px-2 py-1 text-xs font-bold rounded"
                              style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
                            >
                              {discount}% OFF
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleOfferStatus(product)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove Offer
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold" style={{ color: '#1F2A7C' }}>
              All Products
            </h2>
            <p className="text-sm text-gray-600">
              Enable offer status and set offer prices for products
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead style={{ backgroundColor: '#FFF2CC' }}>
                <tr>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Product
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Price
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Offer Price
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Discount
                  </th>
                  <th className="text-left px-6 py-4 font-semibold" style={{ color: '#1F2A7C' }}>
                    Offer Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const discount = product.offer_price
                    ? Math.round(((product.price - product.offer_price) / product.price) * 100)
                    : 0;

                  return (
                    <tr key={product.id} className="border-b">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[product.main_image_index]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <span className="font-semibold">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          step="0.01"
                          value={product.offer_price || ''}
                          onChange={(e) => {
                            const value = e.target.value ? parseFloat(e.target.value) : null;
                            updateOfferPrice(product.id, value);
                          }}
                          placeholder="Set offer price"
                          className="w-32 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none"
                        />
                      </td>
                      <td className="px-6 py-4">
                        {product.offer_price && (
                          <span
                            className="px-2 py-1 text-sm font-bold rounded"
                            style={{ backgroundColor: '#FFF2CC', color: '#1F2A7C' }}
                          >
                            {discount}% OFF
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleOfferStatus(product)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                            product.is_offer
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {product.is_offer ? 'Offer Active' : 'Enable Offer'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
