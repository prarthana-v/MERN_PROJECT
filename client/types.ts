export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  ingredients?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  _id?: string; // MongoDB ID
  user: User | string | any; // Supports populated user object or ID string
  userId?: string; // Legacy support
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  date: string;
  createdAt?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export interface Coupon {
  code: string;
  discount: number; // percentage
  minOrder: number;
}
