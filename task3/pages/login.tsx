import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from "../src/services/api";
import { Eye, EyeOff, Search, ClipboardList, Binoculars } from 'lucide-react';
import search from '../public/Screenshot 2026-01-15 085544.png';
import apply from '../public/Screenshot 2026-01-15 090029.png';
import binoculars from '../public/Screenshot 2026-01-15 090255.png'


const Login = () => {
  const [userData, setUserData] = useState({ name: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const users = await authApi.getUsers();
      const user = users.find(u => u.username === userData.name && u.password === userData.password);

      if (user) {
        // Save to signInData for dashboard to read the username
        localStorage.setItem('signInData', JSON.stringify({ name: userData.name, password: userData.password }));
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/profile');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white items-center justify-center p-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-16 items-center">
        {/* Left Side */}
        <div className="flex-1 w-full mt-40 max-w-md md:max-w-none text-left">
          <h1 className="text-6xl font-extrabold text-[#222] mb-2 leading-none">Job Application Tracker.</h1>
          <p className="text-xl italic text-gray-500 mb-12">seamlessly tracking your job applications.</p>
          
          <div className="flex gap-6 mt-8">
            <div className="p-1 flex items-center justify-center">
              <img src={search} alt="search" className='h-40 w-600'/>
            </div>
            <div className="p-4 flex items-start justify-start">
              <img src={apply} alt="search" className='h-30 w-450'/>
            </div>
            <div className="p-4 flex items-center justify-center">
              <img src={binoculars} alt="search" className='h-60 w-650'/>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 w-full max-w-[440px]">
          <h2 className="text-5xl font-extrabold text-black mb-6 text-left">Sign in.</h2>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-10 w-full shadow-sm">
            {error && (
              <div className="mb-6 text-xs text-red-500 font-bold text-center uppercase tracking-wider">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-2 tracking-widest">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-50 bg-[#fafafa] rounded-lg text-sm transition-all focus:outline-none focus:border-gray-200 focus:bg-white"
                    placeholder="Enter username"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-black text-black mb-2 tracking-widest">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 border border-gray-50 bg-[#fafafa] rounded-lg text-sm transition-all focus:outline-none focus:border-gray-200 focus:bg-white"
                    placeholder="Enter password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#2d2d2d] text-white py-4 rounded-xl text-sm font-bold mt-2 transition-all hover:opacity-90 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-medium text-gray-600">
              Don't have an account? <Link to="/signup" className="text-blue-500 font-bold hover:underline underline-offset-4 ml-1">Sign up here.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
