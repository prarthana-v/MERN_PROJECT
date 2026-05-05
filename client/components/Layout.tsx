import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User as UserIcon, Menu, X, LogOut, Sun, Loader } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-stone-800">
      {/* Promo Bar */}
      <div className="bg-stone-900 text-white text-xs py-2 text-center tracking-wider">
        FREE SHIPPING ON ORDERS OVER $50 | WORLDWIDE DELIVERY
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight text-rose-900">
                Lumière<span className="text-rose-400">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium hover:text-rose-500 transition-colors ${location.pathname === link.path ? 'text-rose-500' : 'text-stone-600'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-stone-600 hover:text-rose-500">
                    <UserIcon size={20} />
                    <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-xl shadow-xl border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    {user.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600">Admin Dashboard</Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600">My Profile</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-rose-50 hover:text-rose-600 flex items-center">
                      <LogOut size={14} className="mr-2" /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-stone-600 hover:text-rose-500 font-medium text-sm">Login</Link>
              )}

              <Link to="/cart" className="text-stone-600 hover:text-rose-500 relative">
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-stone-600">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-lg animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-3 text-base font-medium text-stone-700 hover:text-rose-500 hover:bg-rose-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-stone-100 my-2 pt-2">
                 {user ? (
                   <>
                     <div className="px-3 py-2 text-sm text-rose-500 font-semibold">Hi, {user.name}</div>
                     {user.role === 'admin' && (
                        <Link to="/admin" className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-rose-500" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
                     )}
                     <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-stone-700 hover:text-rose-500">Logout</button>
                   </>
                 ) : (
                    <Link to="/login" className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-rose-500" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                 )}
                 <Link to="/cart" className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-rose-500" onClick={() => setIsMobileMenuOpen(false)}>Cart ({itemCount})</Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-serif text-2xl font-bold text-white block mb-4">Lumière.</span>
            <p className="text-sm leading-relaxed">Defining beauty with nature and science. Premium skincare for the modern individual.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-rose-400">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-rose-400">Skincare</Link></li>
              <li><Link to="/shop" className="hover:text-rose-400">Makeup</Link></li>
              <li><Link to="/shop" className="hover:text-rose-400">Wellness</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-rose-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-rose-400">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-rose-400">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Stay in touch</h3>
            <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex">
              <input type="email" placeholder="Enter your email" className="bg-stone-800 border-none text-white px-4 py-2 rounded-l-md w-full focus:ring-1 focus:ring-rose-500" />
              <button className="bg-rose-500 text-white px-4 py-2 rounded-r-md hover:bg-rose-600">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs">
          &copy; 2023 Lumière Beauty. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
