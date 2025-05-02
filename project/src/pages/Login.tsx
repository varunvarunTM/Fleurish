import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Here you would typically store the token in localStorage or a secure cookie
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[#FFF1F8]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="font-serif text-3xl font-bold text-[#37474F] text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-[#78909C] text-center mb-8">
            Log in to your Bloom & Deliver account
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-[#78909C]" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#78909C]" />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-[#F8BBD0] hover:text-[#C48B9F] mt-1 transition-colors duration-300"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center btn-primary py-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Log In
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[#78909C]">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-[#F8BBD0] hover:text-[#C48B9F] font-medium transition-colors duration-300"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;