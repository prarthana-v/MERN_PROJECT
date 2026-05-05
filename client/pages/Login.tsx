import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) throw new Error("Name is required");
        await register(name, email, password);
      }
      navigate('/');
    } catch (err: any) {
      // api.ts now provides detailed error messages in err.message
      setError(err.message || (isLogin ? 'Invalid credentials' : 'Registration failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    // Optional: Clear form
    // setName(''); setEmail(''); setPassword('');
  };

  // Helper for demo
  const fillAdmin = () => {
    setEmail('admin@gmail.com');
    setPassword('admin');
    setIsLogin(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-rose-50/30 px-4 py-12">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-stone-100 transition-all duration-300">
        <h2 className="font-serif text-3xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Join Lumière'}
        </h2>
        <p className="text-center text-stone-500 mb-8">
          {isLogin 
            ? 'Please enter your details to sign in.' 
            : 'Create an account to start your journey.'}
        </p>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm text-center border border-red-100 animate-fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required={!isLogin}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          {/* {isLogin && (
            <div className="flex justify-end">
              <button type="button" className="text-sm text-rose-500 hover:text-rose-600">
                Forgot Password?
              </button>
            </div>
          )} */}

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting 
              ? (isLogin ? 'Signing In...' : 'Creating Account...') 
              : (isLogin ? 'Sign In' : 'Create Account')
            }
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-stone-500">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleMode} 
              className="text-rose-500 font-medium hover:underline focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {/* Demo Helper - Only show in Login mode for simplicity */}
        {/* {isLogin && (
          <div className="mt-8 pt-6 border-t border-stone-100">
            <p className="text-xs text-center text-stone-400 mb-2">Demo Credentials:</p>
            <div className="flex flex-col gap-2">
              <button onClick={fillAdmin} className="text-xs bg-stone-100 hover:bg-stone-200 py-2 rounded text-stone-600 transition-colors">
                Admin: admin@gmail.com / admin
              </button>
               <button onClick={() => {setEmail('user@gmail.com'); setPassword('user');}} className="text-xs bg-stone-100 hover:bg-stone-200 py-2 rounded text-stone-600 transition-colors">
                User: user@gmail.com / user
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Login;