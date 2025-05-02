import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      navigate('/login');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-[#FFF1F8]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="font-serif text-3xl font-bold text-[#37474F] text-center mb-2">
            Create Account
          </h1>
          <p className="text-[#78909C] text-center mb-8">
            Join Bloom & Deliver to start sending beautiful bouquets
          </p>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="name">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-[#78909C]" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#37474F] mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-[#78909C]" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-[#F8BBD0] focus:ring focus:ring-[#F8BBD0]/20 transition-all duration-300"
                  placeholder="••••••••"
                />
              </div>
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
                  Create Account
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[#78909C]">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#F8BBD0] hover:text-[#C48B9F] font-medium transition-colors duration-300"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;