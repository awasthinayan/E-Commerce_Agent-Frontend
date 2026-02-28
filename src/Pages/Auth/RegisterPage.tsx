// src/pages/Auth/RegisterPage.tsx

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Loader } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import type { AxiosError } from 'axios';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const { register, registerLoading, registerError } = useAuth();

  // ✅ Typed change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Modern React 19 compatible typing
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        preferences: {
          kpis: [],
          marketplaces: [],
          categories: [],
        },
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message || 'Registration failed'
        );
      } else {
        setError('Something went wrong');
      }
    }
  };

  // Safely extract registerError message
  const registerErrorMessage =
    registerError && axios.isAxiosError(registerError)
      ? (registerError as AxiosError<{ message?: string }>)
          .response?.data?.message
      : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center px-4 py-8">
      <div className="relative z-10 w-full max-w-md animate-fadeIn">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Create Account
            </h1>
            <p className="text-gray-600">
              Join E-Commerce Agent today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {(error || registerErrorMessage) && (
              <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-sm text-red-800">
                  {error || registerErrorMessage}
                </p>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field pl-12"
                  disabled={registerLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-12"
                  disabled={registerLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-12"
                  disabled={registerLoading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-12"
                  disabled={registerLoading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={registerLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
            >
              {registerLoading && (
                <Loader className="w-5 h-5 animate-spin" />
              )}
              {registerLoading
                ? 'Creating Account...'
                : 'Create Account'}
            </button>
          </form>

          <div className="my-6 text-center text-sm text-gray-500">
            Already have an account?
          </div>

          <Link
            to="/login"
            className="btn-outline w-full text-center block"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}