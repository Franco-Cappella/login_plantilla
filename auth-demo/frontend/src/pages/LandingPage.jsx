import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">A</span>
              </div>
              <span className="text-xl font-bold">AuthDemo</span>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => window.location.href = '/login'}
                className="px-6 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => window.location.href = '/register'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AuthDemo
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8">
            Authentication that just works
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            A complete authentication system built with React and Node.js.
            Secure user management, role-based access, and comprehensive API protection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button 
              onClick={() => window.location.href = '/register'}
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl"
            >
              Start Free Trial
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 hover:bg-gray-50"
            >
              Try Demo
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-bold mb-2">JWT Auth</h3>
              <p className="text-gray-600">Secure JSON Web Token authentication</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Role-Based</h3>
              <p className="text-gray-600">Flexible permission system</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Dashboard</h3>
              <p className="text-gray-600">Comprehensive user management</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 AuthDemo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
