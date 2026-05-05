import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/mockApi';
import { Order } from '@/types';
import { User, Package, Clock, LogOut, MapPin, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const data = await api.getMyOrders();
          setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Shipped': return 'bg-blue-100 text-blue-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar / User Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 sticky top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4 text-3xl font-serif">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <h2 className="text-xl font-bold text-stone-900">{user.name}</h2>
              <p className="text-stone-500 text-sm">{user.email}</p>
              <div className="mt-2 inline-flex px-3 py-1 bg-stone-100 rounded-full text-xs font-medium text-stone-600 uppercase tracking-wide">
                {user.role} Member
              </div>
            </div>

            <div className="space-y-4 py-6 border-t border-stone-100">
              <div className="flex items-center text-stone-600 text-sm">
                <Mail size={16} className="mr-3" /> {user.email}
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <MapPin size={16} className="mr-3" /> Shipping Address Not Set
              </div>
              <div className="flex items-center text-stone-600 text-sm">
                <Calendar size={16} className="mr-3" /> Joined recently
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100">
              <button 
                onClick={logout}
                className="flex items-center justify-center w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
              >
                <LogOut size={16} className="mr-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content / Orders */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-stone-900 flex items-center">
            <Package className="mr-2 text-rose-500" /> Order History
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto mb-4"></div>
              <p className="text-stone-500">Loading your orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id || order._id} className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-stone-50/30 gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono text-xs font-medium text-stone-500">#{order.id?.substring(0,8) || order._id?.substring(0,8)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 flex items-center">
                        <Clock size={12} className="mr-1" /> 
                        {new Date(order.createdAt || order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-stone-500">Total Amount</p>
                      <p className="text-lg font-bold text-stone-900">${order.total.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-stone-200 bg-white">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-stone-900 truncate">{item.title}</h4>
                            <p className="text-xs text-stone-500 mt-1">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-sm font-medium text-stone-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-100">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Package size={32} />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">No orders yet</h3>
              <p className="text-stone-500 mb-6 max-w-sm mx-auto">Looks like you haven't made any purchases yet. Discover our premium collection today.</p>
              <Link to="/shop">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;