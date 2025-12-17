import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function OrderSuccess() {
  const { orderNumber } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="max-w-md w-full mx-4 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <CheckCircle className="w-20 h-20 mx-auto mb-6" style={{ color: '#4CAF50' }} />

          <h1 className="text-3xl font-bold mb-4" style={{ color: '#1F2A7C' }}>
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-2">Thank you for your order</p>

          {orderNumber && (
            <p className="text-lg font-semibold mb-6" style={{ color: '#E91E63' }}>
              Order #{orderNumber}
            </p>
          )}

          <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: '#FFF2CC' }}>
            <p className="text-sm text-gray-700">
              You will receive an order confirmation email shortly. We'll notify you when your order is shipped.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              to="/account"
              className="block w-full py-3 rounded-lg font-semibold transition-all hover:shadow-md"
              style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
            >
              View Order History
            </Link>

            <Link
              to="/products"
              className="block w-full py-3 rounded-lg font-semibold border-2 transition-all hover:bg-gray-50"
              style={{ borderColor: '#1F2A7C', color: '#1F2A7C' }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
