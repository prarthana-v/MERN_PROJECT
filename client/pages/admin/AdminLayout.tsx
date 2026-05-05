import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 fixed h-full hidden md:flex flex-col z-10">
        <div className="h-20 flex items-center px-8 border-b border-stone-100">
          <span className="font-serif text-2xl font-bold text-rose-900">Lumière<span className="text-rose-400">.</span></span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4 px-4 mt-4">Menu</div>
           {navItems.map(item => (
             <Link 
               key={item.path}
               to={item.path} 
               className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-rose-50 text-rose-600' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'}`}
             >
               <span className="mr-3">{item.icon}</span>
               {item.name}
             </Link>
           ))}
        </nav>

        <div className="p-4 border-t border-stone-100">
          <button 
             onClick={handleLogout}
             className="flex items-center w-full px-4 py-3 text-sm font-medium text-stone-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} className="mr-3"/> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
