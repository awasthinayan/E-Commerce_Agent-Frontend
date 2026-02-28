// src/pages/Dashboard/DashboardPage.tsx

import { Link } from 'react-router-dom';
import { MessageSquare, User, Settings, ArrowRight } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import useAuth from '../../Hooks/useAuth';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      icon: MessageSquare,
      label: 'Chat',
      description: 'Start conversations',
      color: 'from-blue-500 to-blue-600',
      link: '/chat',
    },
    {
      icon: User,
      label: 'Profile',
      description: 'Manage your profile',
      color: 'from-purple-500 to-purple-600',
      link: '/profile',
    },
    {
      icon: Settings,
      label: 'Preferences',
      description: 'Customize settings',
      color: 'from-indigo-500 to-indigo-600',
      link: '/profile',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{user?.name}!</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Your E-Commerce Agent is ready to help you optimize your business. Choose an action below to get started.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Link
                key={index}
                to={stat.link}
                className="card-hover group"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{stat.description}</p>
                <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* User Info Section */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInUp">
            {/* Personal Info */}
            <div className="card">
              <h3 className="heading-3 text-gray-900">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-lg font-semibold text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Member Since</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Preferences Overview */}
            <div className="card">
              <h3 className="heading-3 text-gray-900">Your Preferences</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">KPIs</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.preferences.kpis.length > 0 ? (
                      user.preferences.kpis.map((kpi) => (
                        <span
                          key={kpi}
                          className="badge badge-primary"
                        >
                          {kpi}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No KPIs selected</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Marketplaces</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {user.preferences.marketplaces.length > 0 ? (
                      user.preferences.marketplaces.map((marketplace) => (
                        <span
                          key={marketplace}
                          className="badge badge-success"
                        >
                          {marketplace}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No marketplaces selected</p>
                    )}
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700 text-sm"
                >
                  Update Preferences →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}