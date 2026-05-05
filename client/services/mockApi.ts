import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Product, User, Order, Banner } from '../types';

// Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Axios instance
const client = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- LOGGING (dev only) ---
const logRequest = (config: InternalAxiosRequestConfig) => {
  console.groupCollapsed(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
  console.log('Headers:', config.headers);
  console.log('Params:', config.params);
  console.log('Data:', config.data);
  console.groupEnd();
};

const logResponse = (response: AxiosResponse) => {
  console.groupCollapsed(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`);
  console.log('Status:', response.status);
  console.log('Data:', response.data);
  console.groupEnd();
};

const logError = (error: AxiosError) => {
  console.groupCollapsed(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
  console.log('Message:', error.message);
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
  }
  console.groupEnd();
};

// --- INTERCEPTORS ---

client.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem('lumiere_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user?.token) config.headers.Authorization = `Bearer ${user.token}`;
    }

    if (import.meta.env.DEV) logRequest(config);
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) logResponse(response);
    return response;
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) logError(error);

    if (error.response?.status === 401) {
      localStorage.removeItem('lumiere_user');
      window.location.href = '/#/login';
    }

    return Promise.reject({
      message: (error.response?.data as any)?.message || error.message,
      status: error.response?.status,
      originalError: error
    });
  }
);

// --- API METHODS (NOW ALL PREFIXED WITH /api) ---
export const api = {
  // PRODUCTS
  getProducts: async (): Promise<Product[]> => {
    const { data } = await client.get<Product[]>('/api/products/all');
    return data;
  },

  getProductById: async (id: string): Promise<Product> => {
    const { data } = await client.get<Product>(`/api/products/get/${id}`);
    return data;
  },

  addProduct: async (productData: any): Promise<Product> => {
  const { data } = await client.post<Product>('/api/products/add', productData);
  console.log(data,'data product add -----------')
  return data;
},

deleteProduct: async (id: string): Promise<void> => {
  await client.delete(`/api/products/delete/${id}`);
},

updateProduct: async (id: string, productData: any): Promise<Product> => {
  const { data } = await client.put(`/api/products/update/${id}`, productData);
  return data;
},


  // AUTH
  login: async (email: string, password: string): Promise<User> => {
    const { data } = await client.post<User>('/api/auth/login', { email, password });
    return data;
  },

  register: async (userData: any): Promise<User> => {
    const { data } = await client.post<User>('/api/auth/register', userData);
    return data;
  },

  // ORDERS
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await client.get<Order[]>('/api/orders/myorders');
    return data;
  },

  getOrders: async (): Promise<Order[]> => {
    const { data } = await client.get<Order[]>('/api/orders/all');
    return data;
  },

    updateOrderStatus: async (orderId: string, status: string): Promise<void> => {
    await client.put(`/api/orders/update/${orderId}/status`, { status });
  },

  createOrder: async (order: any): Promise<Order> => {
  const { data } = await client.post<Order>('/api/orders/create', order);
  return data;
},



  // ADMIN
  getDashboardStats: async () => {
    const { data } = await client.get('/api/admin/stats');
    return data;
  },

  // FILE UPLOAD
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const { data } = await client.post<string>('/api/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 30000
    });

    return data;
  },

   // USERS (FIXED)
  getUsers: async (): Promise<User[]> => {
    const { data } = await client.get<User[]>('/api/auth/allusers');
    return data;
  },

  // BANNERS
  getBanners: async (): Promise<Banner[]> => {
    return await client.get('/api/banners').then(res => res.data);
  }
};



export default api;
