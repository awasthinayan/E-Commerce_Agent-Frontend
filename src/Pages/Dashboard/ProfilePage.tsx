// src/pages/Dashboard/ProfilePage.tsx

import { useState } from 'react';
import { User, Save, Loader } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import useAuth from '../../Hooks/useAuth';
import userService from '../../Services/user.Service';

const AVAILABLE_KPIS = ['GMV', 'CAC', 'LTV', 'Conversion Rate', 'AOV', 'Return Rate'];
const AVAILABLE_MARKETPLACES = ['Amazon', 'Flipkart', 'Shopify', 'WooCommerce', 'eBay', 'Etsy'];
const AVAILABLE_CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Beauty', 'Sports', 'Books'];

export default function ProfilePage() {
  const { user } = useAuth();
  const [selectedKPIs, setSelectedKPIs] = useState(user?.preferences?.kpis || []);
  const [selectedMarketplaces, setSelectedMarketplaces] = useState(user?.preferences?.marketplaces || []);
  const [selectedCategories, setSelectedCategories] = useState(user?.preferences?.categories || []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleKPIToggle = (kpi: string) => {
    setSelectedKPIs((prev) =>
      prev.includes(kpi) ? prev.filter((k) => k !== kpi) : [...prev, kpi]
    );
  };

  const handleMarketplaceToggle = (marketplace: string) => {
    setSelectedMarketplaces((prev) =>
      prev.includes(marketplace)
        ? prev.filter((m) => m !== marketplace)
        : [...prev, marketplace]
    );
  };

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSavePreferences = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setMessage('');

      await userService.updatePreferences(user._id, {
        kpis: selectedKPIs,
        marketplaces: selectedMarketplaces,
        categories: selectedCategories,
      });

      setMessage('Preferences updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: unknown) {
      setMessage('Failed to update preferences');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600" />
            Profile Settings
          </h1>
          <p className="text-gray-600">Customize your preferences and account settings</p>
        </div>

        {/* User Info Card */}
        {user && (
          <div className="card mb-8 animate-slideInUp">
            <h2 className="heading-2 text-gray-900 mb-6">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="label">Full Name</label>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
              <div>
                <label className="label">Email Address</label>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              <div>
                <label className="label">Member Since</label>
                <p className="text-gray-900 font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="label">Account Status</label>
                <span className="badge badge-success">Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Preferences Card */}
        <div className="card animate-slideInUp">
          <h2 className="heading-2 text-gray-900 mb-6">Your Preferences</h2>

          {message && (
            <div
              className={`p-4 rounded-lg mb-6 animate-slideInDown ${
                message.includes('success')
                  ? 'bg-green-100 border border-green-300 text-green-800'
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}
            >
              {message}
            </div>
          )}

          {/* KPIs Section */}
          <div className="mb-8">
            <h3 className="heading-3 text-gray-900 mb-4">Key Performance Indicators (KPIs)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_KPIS.map((kpi) => (
                <label
                  key={kpi}
                  className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedKPIs.includes(kpi)}
                    onChange={() => handleKPIToggle(kpi)}
                    className="w-5 h-5 text-blue-600 cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium">{kpi}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marketplaces Section */}
          <div className="mb-8">
            <h3 className="heading-3 text-gray-900 mb-4">E-commerce Marketplaces</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_MARKETPLACES.map((marketplace) => (
                <label
                  key={marketplace}
                  className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedMarketplaces.includes(marketplace)}
                    onChange={() => handleMarketplaceToggle(marketplace)}
                    className="w-5 h-5 text-purple-600 cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium">{marketplace}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="mb-8">
            <h3 className="heading-3 text-gray-900 mb-4">Product Categories</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition-all duration-300"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="w-5 h-5 text-indigo-600 cursor-pointer"
                  />
                  <span className="text-gray-900 font-medium">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSavePreferences}
            disabled={loading}
            className="btn-primary flex items-center gap-2 w-full justify-center"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Preferences
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}