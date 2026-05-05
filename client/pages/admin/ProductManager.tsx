import React, { useState, useEffect } from 'react';
import { api } from '../../services/mockApi';
import { Product } from '../../types';
import Button from '../../components/Button';
import { Edit, Trash2, Plus, X } from 'lucide-react';

const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await api.getProducts();
    setProducts(data);
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsModalOpen(true);
  };
const handleDelete = async (id: string) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  try {
    console.log(id)
    await api.deleteProduct(id); // 🔥 call backend
    setProducts(prev => prev.filter(p => p._id !== id)); // update UI
  } catch (err: any) {
    console.error("Delete error:", err);
    alert(err.message || "Failed to delete product.");
  }
};


const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // If editing an existing product
    if (formData._id) {
      // --- CALL UPDATE API ---
      const updated = await api.updateProduct(formData._id, formData);

      // Update UI state
      setProducts(prev =>
        prev.map(p => p._id === formData._id ? updated : p)
      );

    } else {
      // --- ADD NEW PRODUCT ---
      const created = await api.addProduct(formData);

      setProducts(prev => [...prev, created]);
    }

    setIsModalOpen(false);
    setFormData({});
  } catch (err) {
    console.log("Error saving product:", err);
    alert(err.message || "Something went wrong.");
  }
};


  return (
    <div>
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-2xl font-bold text-stone-900">Products</h1>
         <Button onClick={() => { setFormData({}); setIsModalOpen(true); }}>
           <Plus size={18} className="mr-2 inline" /> Add Product
         </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-stone-50 border-b border-stone-100">
             <tr>
               <th className="px-6 py-4 font-medium text-stone-500">Product</th>
               <th className="px-6 py-4 font-medium text-stone-500">Category</th>
               <th className="px-6 py-4 font-medium text-stone-500">Price</th>
               <th className="px-6 py-4 font-medium text-stone-500">Stock</th>
               <th className="px-6 py-4 font-medium text-stone-500 text-right">Actions</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-stone-100">
             {products.map(p => (
               <tr key={p.id} className="hover:bg-stone-50/50">
                 <td className="px-6 py-4 flex items-center">
                   <img src={p.image} alt="" className="w-10 h-10 rounded-md object-cover mr-3"/>
                   <span className="font-medium text-stone-900">{p.title}</span>
                 </td>
                 <td className="px-6 py-4 text-stone-600">{p.category}</td>
                 <td className="px-6 py-4 text-stone-900">${p.price}</td>
                 <td className="px-6 py-4 text-stone-600">
                   <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                     {p.stock}
                   </span>
                 </td>
                 <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="p-2 text-stone-500 hover:text-rose-500"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-2 text-stone-500 hover:text-red-500"><Trash2 size={18} /></button>
                 </td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-2xl relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"><X size={24}/></button>
              <h2 className="text-xl font-bold mb-6">{formData.id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} className="space-y-4">

              {/* TITLE */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Title</label>
                <input
                  required
                  value={formData.title || ""}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-stone-200 rounded-lg p-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  required
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-stone-200 rounded-lg p-2 h-24 resize-none focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              {/* PRICE + STOCK */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Price</label>
                  <input
                    type="number"
                    required
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full border border-stone-200 rounded-lg p-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Stock</label>
                  <input
                    type="number"
                    required
                    value={formData.stock || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: Number(e.target.value) })
                    }
                    className="w-full border border-stone-200 rounded-lg p-2 focus:ring-rose-500 focus:border-rose-500"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={formData.category || "Skincare"}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full border border-stone-200 rounded-lg p-2"
                >
                  <option>Skincare</option>
                  <option>Makeup</option>
                  <option>Wellness</option>
                  <option>Tools</option>
                </select>
              </div>

              {/* IMAGE URL */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                <input
                  required
                  value={formData.image || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full border border-stone-200 rounded-lg p-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              {/* INGREDIENTS */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Ingredients (Optional)</label>
                <textarea
                  value={formData.ingredients || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, ingredients: e.target.value })
                  }
                  className="w-full border border-stone-200 rounded-lg p-2 h-20 resize-none focus:ring-rose-500 focus:border-rose-500"
                />
              </div>

              <Button fullWidth type="submit">Save Product</Button>
            </form>

           </div>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
