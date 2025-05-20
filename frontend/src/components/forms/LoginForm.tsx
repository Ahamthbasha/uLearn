// components/AuthForm.tsx

import React, { useState } from 'react';
import type { LoginProps, LoginCredentials } from '../../types/LoginFormTypes'; // adjust path as needed

const LoginForm: React.FC<LoginProps> = ({
  role,
  onSubmit,
  showRegisterToggle = true,
  imageUrl = 'https://i.imgur.com/LKX7Kc6.png',
  title = 'Login',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: LoginCredentials = { email, password };
    onSubmit(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full max-w-5xl">
        {/* Left image section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={imageUrl}
            alt={`${role} illustration`}
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>

        {/* Right form section */}
        <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center capitalize">
            {role} <span className="text-black">{title}</span>
          </h2>

          {/* Toggle Buttons */}
          {showRegisterToggle && (
            <div className="flex justify-center mb-6">
              <button
                type="button"
                className={`px-6 py-2 font-semibold rounded-l-full ${
                  activeTab === 'login'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={`px-6 py-2 font-semibold rounded-r-full ${
                  activeTab === 'register'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-600'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your Email Address"
                className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Enter your Password"
                className="w-full border border-gray-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
              >
                Login
              </button>

              <p className="text-center text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                Forgot Password?
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
