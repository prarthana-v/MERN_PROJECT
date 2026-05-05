import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../types';
import { api } from '../services/mockApi';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  // FIX: Increased default max price to 2000 to cover your expensive items (like the $1299 cleanser)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await api.getProducts();
        // FIX: MongoDB returns '_id', but your frontend components expect 'id'.
        // We map it here to ensure everything works smoothly.
        const mappedData = data.map((p: any) => ({
          ...p,
          id: p._id || p.id // Fallback to existing id if _id doesn't exist
        }));
        setProducts(mappedData);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Clean category comparison helper
    const clean = (str: string | undefined) => (str || "").trim().toLowerCase();

    // CATEGORY FILTER
    if (selectedCategory !== 'All') {
      result = result.filter(p => clean(p.category) === clean(selectedCategory));
    }
    
    // PRICE FILTER
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // SORTING
    if (sortOption === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [products, selectedCategory, priceRange, sortOption]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;

  return (
    <div className="bg-rose-50/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-stone-900">All Products</h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
             <span className="text-sm text-stone-500">{filteredProducts.length} Results</span>
             <select 
               className="bg-white border border-stone-200 text-stone-700 text-sm rounded-lg focus:ring-rose-500 focus:border-rose-500 block p-2.5"
               value={sortOption}
               onChange={(e) => setSortOption(e.target.value)}
             >
               <option value="newest">Newest</option>
               <option value="low-high">Price: Low to High</option>
               <option value="high-low">Price: High to Low</option>
               <option value="rating">Top Rated</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
               <h3 className="font-serif font-bold text-lg mb-4 flex items-center"><SlidersHorizontal size={18} className="mr-2"/> Filter</h3>
               
               <div className="mb-6">
                 <h4 className="font-medium mb-3 text-stone-900">Categories</h4>
                 <div className="space-y-2">
                   {['All', 'Skincare', 'Makeup', 'Wellness', 'Tools'].map(cat => (
                     <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                       <input 
                         type="radio" 
                         name="category" 
                         checked={selectedCategory === cat}
                         onChange={() => setSelectedCategory(cat)}
                         className="text-rose-500 focus:ring-rose-500"
                       />
                       <span className={`text-sm ${selectedCategory === cat ? 'font-medium text-rose-500' : 'text-stone-600'}`}>{cat}</span>
                     </label>
                   ))}
                 </div>
               </div>

               <div>
                 <h4 className="font-medium mb-3 text-stone-900">Price Range</h4>
                 {/* FIX: Increased max value on slider input to 2000 */}
                 <input 
                   type="range" 
                   min="0" 
                   max="2000" 
                   value={priceRange[1]} 
                   onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                   className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                 />
                 <div className="flex justify-between text-xs text-stone-500 mt-2">
                   <span>$0</span>
                   <span>${priceRange[1]}</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
             {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {filteredProducts.map(product => (
                   <ProductCard key={product.id} product={product} />
                 ))}
               </div>
             ) : (
               <div className="text-center py-20">
                 <p className="text-stone-500 text-lg">No products found matching your filters.</p>
                 <button onClick={() => {setSelectedCategory('All'); setPriceRange([0, 2000])}} className="mt-4 text-rose-500 hover:underline">Clear Filters</button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;