// src/pages/Auth/LoginPage.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginLoading, loginError } = useAuth();

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    }
  };

  // ✅ Combine both errors safely (since both are string)
  const errorMessage = error || loginError;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-fadeIn">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Login to your E-Commerce Agent account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ✅ Error Alert */}
            {errorMessage && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg animate-slideInDown">
                <p className="text-sm text-red-800">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label className="label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-12"
                  disabled={loginLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-12"
                  disabled={loginLoading}
                />
              </div>

              <div className="text-right mt-2">
                <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
            </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loginLoading && <Loader className="w-5 h-5 animate-spin" />}
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Don't have an account?
              </span>
            </div>
          </div>

          <Link
            to="/register"
            className="btn-outline w-full text-center block"
          >
            Create Account
          </Link>
        </div>

        <p className="text-center text-white/80 mt-6 text-sm">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}