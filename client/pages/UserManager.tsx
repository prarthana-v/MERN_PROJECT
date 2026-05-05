import React, { useEffect, useState } from 'react';
import { api } from '@/services/mockApi';
import { User } from '@/types';
import { Users, Mail, Calendar, Shield, User as UserIcon } from 'lucide-react';

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-stone-500">Loading Users...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-8 flex items-center">
        <Users className="mr-3 text-rose-500" /> User Management
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-100">
              <tr>
                <th className="px-6 py-4 font-medium text-stone-500">User</th>
                <th className="px-6 py-4 font-medium text-stone-500">Role</th>
                <th className="px-6 py-4 font-medium text-stone-500">Joined Date</th>
                {/* <th className="px-6 py-4 font-medium text-stone-500 text-right">Actions</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {users.map((user) => (
                <tr key={user.id || user._id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold mr-3 overflow-hidden">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon size={20} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-stone-900">{user.name}</div>
                        <div className="text-xs text-stone-500 flex items-center mt-0.5">
                          <Mail size={10} className="mr-1" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-stone-100 text-stone-800'
                    }`}>
                      {user.role === 'admin' && <Shield size={10} className="mr-1" />}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600 text-sm">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-stone-400" />
                      {user.createdAt 
                        ? new Date(user.createdAt).toLocaleDateString() 
                        : 'N/A'}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <button className="text-stone-400 hover:text-stone-600 font-medium text-sm">
                      Edit
                    </button>
                  </td> */}
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-stone-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManager;