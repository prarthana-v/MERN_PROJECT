import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100">
      <Link to={`/product/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-stone-100">
         <img 
           src={product.image} 
           alt={product.title} 
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         />
         {product.stock < 5 && product.stock > 0 && (
           <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
             LOW STOCK
           </div>
         )}
         {product.stock === 0 && (
           <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
             <span className="bg-stone-800 text-white px-3 py-1 text-sm font-bold">SOLD OUT</span>
           </div>
         )}
      </Link>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs text-rose-500 font-semibold uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center text-yellow-500 text-xs font-bold">
            <Star size={12} fill="currentColor" className="mr-1"/> {product.rating}
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-rose-500 transition-colors truncate">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-stone-900">${product.price}</span>
          <button 
            onClick={() => addToCart(product, 1)}
            disabled={product.stock === 0}
            className="p-2 rounded-full bg-stone-100 text-stone-800 hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
