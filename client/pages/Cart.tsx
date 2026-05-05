import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { Trash2, ArrowLeft } from 'lucide-react';
import api from '@/services/mockApi';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl mb-4">Your bag is empty</h2>
        <p className="text-stone-500 mb-8">Looks like you haven't added any luxury treats yet.</p>
        <Link to="/shop">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
  try {
    const orderPayload = {
      items: items.map(i => ({
        id: i._id,
        title: i.title,
        price: i.price,
        quantity: i.quantity,
        image: i.image
      })),
      total: cartTotal
    };

    const order = await api.createOrder(orderPayload);

    alert("Order placed successfully!");
    clearCart();

    console.log("ORDER CREATED: ", order);

  } catch (err: any) {
    console.error("Order Error:", err);
    alert(err.message || "Failed to place order");
  }
};


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-3xl font-bold mb-8">Shopping Bag</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="space-y-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 py-6 border-b border-stone-100">
                <div className="w-24 h-24 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                   <div className="flex justify-between">
                     <div>
                       <h3 className="font-medium text-stone-900"><Link to={`/product/${item.id}`}>{item.title}</Link></h3>
                       <p className="text-sm text-stone-500">{item.category}</p>
                     </div>
                     <p className="font-medium">${item.price * item.quantity}</p>
                   </div>
                   <div className="flex justify-between items-center">
                      <div className="flex items-center border border-stone-200 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-stone-50 text-stone-600">-</button>
                        <span className="px-2 text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-stone-50 text-stone-600">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500">
                        <Trash2 size={18} />
                      </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/shop" className="inline-flex items-center text-sm font-medium text-rose-500 mt-8 hover:text-rose-600">
            <ArrowLeft size={16} className="mr-2"/> Continue Shopping
          </Link>
        </div>

        <div className="lg:col-span-4 mt-12 lg:mt-0">
           <div className="bg-stone-50 p-6 rounded-2xl">
             <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
             <div className="space-y-4 mb-6 pb-6 border-b border-stone-200">
                <div className="flex justify-between">
                   <span className="text-stone-600">Subtotal</span>
                   <span className="font-medium">${cartTotal}</span>
                </div>
                <div className="flex justify-between">
                   <span className="text-stone-600">Shipping</span>
                   <span className="font-medium">{cartTotal > 50 ? 'Free' : '$10.00'}</span>
                </div>
             </div>
             <div className="flex justify-between text-lg font-bold mb-8">
                <span>Total</span>
                <span>${cartTotal > 50 ? cartTotal : cartTotal + 10}</span>
             </div>
             <Button fullWidth onClick={handleCheckout}>Checkout</Button>
             <p className="text-xs text-center text-stone-400 mt-4">Secure Checkout. 100% Satisfaction Guarantee.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
