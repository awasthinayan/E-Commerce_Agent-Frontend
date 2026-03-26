// // src/pages/Dashboard/DashboardPage.tsx

// import { Link } from 'react-router-dom';
// import { MessageSquare, User, Settings, ArrowRight } from 'lucide-react';
// import Navbar from '../../Components/Common/Navbar';
// import useAuth from '../../Hooks/useAuth';

// export default function DashboardPage() {
//   const { user } = useAuth();

//   const stats = [
//     {
//       icon: MessageSquare,
//       label: 'Chat',
//       description: 'Start conversations',
//       color: 'from-blue-500 to-blue-600',
//       link: '/chat',
//     },
//     {
//       icon: User,
//       label: 'Profile',
//       description: 'Manage your profile',
//       color: 'from-purple-500 to-purple-600',
//       link: '/profile',
//     },
//     {
//       icon: Settings,
//       label: 'Preferences',
//       description: 'Customize settings',
//       color: 'from-indigo-500 to-indigo-600',
//       link: '/profile',
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Welcome Section */}
//         <div className="mb-12 animate-fadeIn">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Welcome back, <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{user?.name}!</span>
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl">
//             Your E-Commerce Agent is ready to help you optimize your business. Choose an action below to get started.
//           </p>
//         </div>

//         {/* Quick Actions Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <Link
//                 key={index}
//                 to={stat.link}
//                 className="card-hover group"
//               >
//                 <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${stat.color} mb-4`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                   {stat.label}
//                 </h3>
//                 <p className="text-gray-600 text-sm mb-4">{stat.description}</p>
//                 <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
//                   Explore <ArrowRight className="w-4 h-4 ml-1" />
//                 </div>
//               </Link>
//             );
//           })}
//         </div>

//         {/* User Info Section */}
//         {user && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInUp">
//             {/* Personal Info */}
//             <div className="card">
//               <h3 className="heading-3 text-gray-900">Personal Information</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm text-gray-600">Name</label>
//                   <p className="text-lg font-semibold text-gray-900">{user.name}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Email</label>
//                   <p className="text-lg font-semibold text-gray-900">{user.email}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Member Since</label>
//                   <p className="text-lg font-semibold text-gray-900">
//                     {new Date(user.createdAt).toLocaleDateString('en-US', {
//                       year: 'numeric',
//                       month: 'long',
//                       day: 'numeric',
//                     })}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Preferences Overview */}
//             <div className="card">
//               <h3 className="heading-3 text-gray-900">Your Preferences</h3>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm text-gray-600">KPIs</label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {user.preferences.kpis.length > 0 ? (
//                       user.preferences.kpis.map((kpi) => (
//                         <span
//                           key={kpi}
//                           className="badge badge-primary"
//                         >
//                           {kpi}
//                         </span>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 text-sm">No KPIs selected</p>
//                     )}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm text-gray-600">Marketplaces</label>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {user.preferences.marketplaces.length > 0 ? (
//                       user.preferences.marketplaces.map((marketplace) => (
//                         <span
//                           key={marketplace}
//                           className="badge badge-success"
//                         >
//                           {marketplace}
//                         </span>
//                       ))
//                     ) : (
//                       <p className="text-gray-500 text-sm">No marketplaces selected</p>
//                     )}
//                   </div>
//                 </div>
//                 <Link
//                   to="/profile"
//                   className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700 text-sm"
//                 >
//                   Update Preferences →
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// src/pages/Dashboard/DashboardPage.tsx

import { Link } from 'react-router-dom';
import { MessageSquare, User, Settings, ArrowRight } from 'lucide-react';
import Navbar from '../../Components/Common/Navbar';
import useAuth from '../../Hooks/useAuth';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">

      {/* Background blobs */}
      <div className="absolute w-[500px] h-[500px] bg-purple-400 rounded-full blur-[140px] opacity-30 top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-blue-400 rounded-full blur-[140px] opacity-30 bottom-[-120px] right-[-120px]" />

      <Navbar />

      <div className="relative max-w-7xl mx-auto px-6 py-14">

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back,
            <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user?.name}
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl">
            Your E-Commerce AI Agent is ready to help you optimize sales and
            business insights.
          </p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <Link
                key={index}
                to={stat.link}
                className="group p-6 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 border hover:-translate-y-1"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${stat.color} mb-5`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600">
                  {stat.label}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {stat.description}
                </p>

                <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Explore
                  <ArrowRight className="w-4 h-4 ml-1" />
                </div>

              </Link>
            );
          })}

        </div>

        {/* User Info */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Personal Info */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border">

              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>

              <div className="space-y-4">

                <div>
                  <label className="text-sm text-gray-500">Name</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-500">Member Since</label>
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

            {/* Preferences */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg border">

              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Your Preferences
              </h3>

              <div className="space-y-6">

                <div>
                  <label className="text-sm text-gray-500">KPIs</label>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.preferences.kpis.length > 0 ? (
                      user.preferences.kpis.map((kpi) => (
                        <span
                          key={kpi}
                          className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700"
                        >
                          {kpi}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No KPIs selected
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500">
                    Marketplaces
                  </label>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {user.preferences.marketplaces.length > 0 ? (
                      user.preferences.marketplaces.map((marketplace) => (
                        <span
                          key={marketplace}
                          className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700"
                        >
                          {marketplace}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No marketplaces selected
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  to="/profile"
                  className="inline-block mt-4 text-indigo-600 font-medium hover:text-indigo-700 text-sm"
                >
                  Update Preferences →
                </Link>

              </div>

            </div>

          </div>
        )}

        {/* About Agent Section */}
        <div className="mt-16 p-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl">

          <h2 className="text-2xl font-bold mb-4">
            About Your E-Commerce AI Agent
          </h2>

          <p className="text-white/90 max-w-3xl mb-6">
            This AI agent helps online sellers make smarter decisions by
            analyzing key business metrics and marketplace performance.
            It provides AI-driven insights to improve pricing strategies,
            optimize product listings, and increase conversions.
          </p>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/10 p-5 rounded-xl">
              <h3 className="font-semibold mb-2">
                Marketplace Insights
              </h3>
              <p className="text-sm text-white/80">
                Compare performance across marketplaces and identify growth opportunities.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-xl">
              <h3 className="font-semibold mb-2">
                KPI Monitoring
              </h3>
              <p className="text-sm text-white/80">
                Track important metrics like conversion rate, revenue, and product performance.
              </p>
            </div>

            <div className="bg-white/10 p-5 rounded-xl">
              <h3 className="font-semibold mb-2">
                AI Recommendations
              </h3>
              <p className="text-sm text-white/80">
                Ask the AI for pricing strategies, marketing suggestions,
                and marketplace comparisons.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Floating Ask AI Button */}
      <Link
        to="/chat"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
      >
        <MessageSquare size={20} />
        Ask AI
      </Link>

    </div>
  );
}