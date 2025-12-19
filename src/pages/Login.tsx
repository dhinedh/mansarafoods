import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState<'customer' | 'admin'>('customer');
  const { signIn, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      if (profile.is_admin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      // Navigation is handled by the useEffect hook above
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to login');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FFFDF7' }}>
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-2 text-center" style={{ color: '#1F2A7C' }}>
            Welcome Back
          </h2>

          <div className="p-3 mb-4 bg-blue-50 border border-blue-200 rounded-lg text-xs">
            <p className="font-semibold text-blue-900 mb-1">Demo Credentials:</p>
            <p className="text-blue-800">Customer: customer@example.com / customer123</p>
            <p className="text-blue-800">Admin: admin@mansarafoods.com / admin123</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setLoginType('customer')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                loginType === 'customer'
                  ? 'text-white'
                  : 'border-2 text-gray-600'
              }`}
              style={{
                backgroundColor: loginType === 'customer' ? '#FDB913' : 'transparent',
                color: loginType === 'customer' ? '#1F2A7C' : '#1F2A7C',
                borderColor: loginType === 'customer' ? 'transparent' : '#E0E0E0',
              }}
            >
              Customer
            </button>
            <button
              onClick={() => setLoginType('admin')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                loginType === 'admin'
                  ? 'text-white'
                  : 'border-2 text-gray-600'
              }`}
              style={{
                backgroundColor: loginType === 'admin' ? '#1F2A7C' : 'transparent',
                color: loginType === 'admin' ? 'white' : '#1F2A7C',
                borderColor: loginType === 'admin' ? 'transparent' : '#E0E0E0',
              }}
            >
              Admin
            </button>
          </div>

          <p className="text-gray-600 text-center mb-6 text-sm">
            {loginType === 'customer' ? 'Login to your customer account' : 'Login to admin panel'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#1F2A7C' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#E91E63] outline-none transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold transition-all hover:shadow-md disabled:opacity-50"
              style={{ backgroundColor: '#FDB913', color: '#1F2A7C' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold" style={{ color: '#E91E63' }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
