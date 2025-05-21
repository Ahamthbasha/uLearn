import React, { useState } from 'react';
import type { LoginProps, LoginCredentials } from '../../types/LoginFormTypes'; // Adjust path

const LoginForm: React.FC<LoginProps> = ({
  role,
  onSubmit,
  showRegisterToggle = true,
  imageUrl = 'https://i.imgur.com/LKX7Kc6.png',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const credentials: LoginCredentials = { email, password };
    onSubmit(credentials);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const newUser = { username, email, password };
    console.log('Registering user:', newUser);
    // Replace with your register API call
  };

  const handleGoogleAuth = () => {
    console.log('Redirecting to Google Auth...');
    // Trigger your OAuth logic here (e.g., window.location.href = '/api/auth/google')
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
            {role} <span className="text-black">{activeTab === 'login' ? 'Login' : 'Register'}</span>
          </h2>

          {/* Toggle Tabs */}
          {showRegisterToggle && (
            <div className="flex justify-center mb-6">
              <button
                type="button"
                className={`px-6 py-2 font-semibold rounded-l-full ${
                  activeTab === 'login' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={`px-6 py-2 font-semibold rounded-r-full ${
                  activeTab === 'register' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-2.5 cursor-pointer text-sm text-blue-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>

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

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <input
                type="text"
                placeholder="Enter your Username"
                className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute right-4 top-2.5 cursor-pointer text-sm text-blue-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </span>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className="w-full border px-4 py-2 rounded-full focus:ring-2 focus:ring-blue-500"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute right-4 top-2.5 cursor-pointer text-sm text-blue-500"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
              >
                Sign Up
              </button>

              {/* Google Auth Button */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-full mt-2 hover:bg-gray-100"
              >
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                Sign up with Google
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
