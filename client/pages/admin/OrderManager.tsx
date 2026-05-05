import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { Order } from '../../types';
import { Eye, Package, CheckCircle, Truck, Clock, X, ChevronDown } from 'lucide-react';

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await api.getOrders();
      console.log(data,'data')
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      // Optimistic update
      setOrders(prev => prev.map(o => (o.id === id || o._id === id) ? { ...o, status: newStatus as any } : o));
      
      const orderId = id; // MongoDB might use _id
      await api.updateOrderStatus(orderId, newStatus);
    } catch (error) {
      console.error("Failed to update status", error);
      fetchOrders(); // Revert on error
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={14} className="mr-1"/>;
      case 'Shipped': return <Truck size={14} className="mr-1"/>;
      default: return <Clock size={14} className="mr-1"/>;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Orders...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8 flex items-center">
        <Package className="mr-3 text-rose-500" /> Order Management
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 font-medium text-stone-500">Order ID</th>
                <th className="px-6 py-4 font-medium text-stone-500">Customer</th>
                <th className="px-6 py-4 font-medium text-stone-500">Date</th>
                <th className="px-6 py-4 font-medium text-stone-500">Total</th>
                <th className="px-6 py-4 font-medium text-stone-500">Status</th>
                <th className="px-6 py-4 font-medium text-stone-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.map((order) => (
                <tr key={order.id || order._id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-stone-500">
                    {(order.id || order._id)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-900">
                      {typeof order.user === 'object' ? order.user.name : 'Unknown User'}
                    </div>
                    <div className="text-xs text-stone-400">
                      {typeof order.user === 'object' ? order.user.email : ''}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600 text-sm">
                    {new Date(order.createdAt || order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-900">
                    ${order.total}
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                       <select 
                         value={order.status}
                         onChange={(e) => handleStatusUpdate(order.id || order._id || '', e.target.value)}
                         className={`appearance-none pl-8 pr-8 py-1.5 rounded-full text-xs font-bold border cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-rose-500 ${getStatusColor(order.status)}`}
                       >
                         <option value="Pending">Pending</option>
                         <option value="Shipped">Shipped</option>
                         <option value="Delivered">Delivered</option>
                       </select>
                       <div className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none ${getStatusColor(order.status).split(' ')[1]}`}>
                         {getStatusIcon(order.status)}
                       </div>
                       <ChevronDown size={12} className={`absolute right-2.5 top-1/2 transform -translate-y-1/2 pointer-events-none ${getStatusColor(order.status).split(' ')[1]}`} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="text-stone-400 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-rose-50"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50 rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Order Details</h2>
                <p className="text-sm text-stone-500 font-mono mt-1">ID: {selectedOrder.id || selectedOrder._id}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Customer</h3>
                   <p className="font-medium text-stone-900">{typeof selectedOrder.user === 'object' ? selectedOrder.user.name : 'Unknown'}</p>
                   <p className="text-sm text-stone-500">{typeof selectedOrder.user === 'object' ? selectedOrder.user.email : ''}</p>
                </div>
                <div className="text-right">
                   <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Summary</h3>
                   <p className="text-sm text-stone-500">Date: {new Date(selectedOrder.createdAt || selectedOrder.date).toLocaleDateString()}</p>
                   <p className="text-xl font-bold text-rose-500 mt-1">${selectedOrder.total}</p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-stone-900 mb-4">Items ({selectedOrder.items.length})</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex items-center p-3 bg-stone-50 rounded-lg border border-stone-100">
                    <div className="w-12 h-12 bg-white rounded-md overflow-hidden flex-shrink-0 border border-stone-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-stone-900">{item.title}</p>
                      <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-stone-900">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-stone-100 bg-stone-50 rounded-b-2xl flex justify-end">
               <button 
                 onClick={() => setSelectedOrder(null)}
                 className="px-6 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors text-sm font-medium"
               >
                 Close
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManager;