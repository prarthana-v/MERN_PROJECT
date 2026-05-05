import React, { useEffect, useState } from 'react';
import { api } from '../../services/mockApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await api.getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  // Mock Data for Chart
  const chartData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
  ];

  if (!stats) return <div>Loading...</div>;

  const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center">
       <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${color}`}>
         {icon}
       </div>
       <div>
         <p className="text-stone-500 text-sm font-medium">{title}</p>
         <h3 className="text-2xl font-bold text-stone-900">{value}</h3>
       </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8">Dashboard Overview</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`$${stats.totalSales}`} icon={<DollarSign size={24} className="text-emerald-600"/>} color="bg-emerald-50" />
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingBag size={24} className="text-blue-600"/>} color="bg-blue-50" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users size={24} className="text-purple-600"/>} color="bg-purple-50" />
        <StatCard title="Total Products" value={stats.totalProducts} icon={<PackageIcon size={24} className="text-rose-600"/>} color="bg-rose-50" />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 mb-8">
        <h2 className="text-lg font-bold text-stone-900 mb-6">Sales Analytics</h2>
        <div className="h-80 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={chartData}>
               <defs>
                 <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                   <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                   <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                 </linearGradient>
               </defs>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5"/>
               <XAxis dataKey="name" axisLine={false} tickLine={false} />
               <YAxis axisLine={false} tickLine={false} />
               <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
               />
               <Area type="monotone" dataKey="sales" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
             </AreaChart>
           </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const PackageIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22v-9"/></svg>
)

export default AdminDashboard;
