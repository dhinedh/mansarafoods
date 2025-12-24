import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { user, profile } = useAuth();
  const { cartCount } = useCart();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Offers', path: '/offers' },
    { label: 'Combos', path: '/combos' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="MANSARA FOODS" className="h-16 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                {item.label}
                {isActive(item.path) && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5"
                    style={{ backgroundColor: '#E91E63' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>

            <Link
              to={user ? '/account' : '/login'}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <User className="w-6 h-6" />
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-gray-900 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ backgroundColor: '#E91E63' }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                style={isActive(item.path) ? { color: '#E91E63' } : {}}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-lg px-4 py-2 outline-none"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
