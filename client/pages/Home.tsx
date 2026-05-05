import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product, Banner } from '../types';
import { api } from '../services/mockApi';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { ArrowRight, CheckCircle, Truck, Shield } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [prods, bans] = await Promise.all([api.getProducts(), api.getBanners()]);
      setFeaturedProducts(prods.slice(0, 4));
      setBanners(bans);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div></div>;

  const heroBanner = banners[0];

  return (
    <div className="flex flex-col gap-16 pb-16">
      
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url(${heroBanner?.image || 'https://images.unsplash.com/photo-1629198789666-4195a62d1847?auto=format&fit=crop&q=80&w=2000'})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-fade-in">
          <p className="text-rose-200 uppercase tracking-[0.2em] mb-4 text-sm font-semibold">New Collection</p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 leading-tight">{heroBanner?.title || 'Natural Beauty, Scientific Results'}</h1>
          <p className="text-lg md:text-xl text-stone-100 mb-10 max-w-2xl mx-auto">{heroBanner?.subtitle || 'Discover our new range of organic skincare crafted for your inner glow.'}</p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-stone-900 hover:bg-rose-50 shadow-2xl border-none">Shop Now</Button>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold mb-3">Shop by Category</h2>
          <div className="h-1 w-20 bg-rose-400 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {['Skincare', 'Makeup', 'Wellness'].map((cat, idx) => (
             <Link to={`/shop?category=${cat}`} key={cat} className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
               <img 
                 src={[
                   'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
                   'https://i.pinimg.com/736x/ce/73/97/ce739727661eb8b4e1e1328fa118e818.jpg',
                   'https://i.pinimg.com/1200x/f5/4d/43/f54d43ea6791f51c8a5e2998a13c2b5c.jpg'
                 ][idx]} 
                 alt={cat} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                 <div className="w-full flex justify-between items-center text-white">
                   <h3 className="text-2xl font-serif font-medium">{cat}</h3>
                   <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0" />
                 </div>
               </div>
             </Link>
           ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-rose-50/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div>
               <h2 className="font-serif text-3xl font-bold mb-2">Trending Now</h2>
               <p className="text-stone-500">Our customers' favorite picks this week.</p>
             </div>
             <Link to="/shop" className="text-rose-600 font-medium hover:text-rose-700 flex items-center">View All <ArrowRight size={16} className="ml-1"/></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features / Benefits */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-xl bg-white shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
              <Truck size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">Fast Shipping</h3>
            <p className="text-stone-500 text-sm">Free worldwide shipping on all orders over $50.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-xl bg-white shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
              <Shield size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">Secure Payment</h3>
            <p className="text-stone-500 text-sm">100% secure payment with encrypted transactions.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-xl bg-white shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 mb-4">
              <CheckCircle size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg mb-2">Authentic Products</h3>
            <p className="text-stone-500 text-sm">Guaranteed authentic products sourced directly.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-stone-900 text-white py-20">
         <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl mb-12">What our community says</h2>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl relative">
              <p className="text-xl md:text-2xl font-serif italic leading-relaxed mb-6">"I've never seen my skin look this radiant. The Rose Quartz Roller and Vitamin C oil are now staples in my daily routine. Absolutely obsessed!"</p>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-rose-500 rounded-full mb-2 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" alt="User" />
                </div>
                <span className="font-bold">Sophia M.</span>
                <span className="text-rose-300 text-sm">Verified Buyer</span>
              </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
