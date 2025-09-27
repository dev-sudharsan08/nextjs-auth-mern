import Link from 'next/link';

export default function Features() {
  const features = [
    {
      icon: (
        <svg className='w-8 h-8 text-indigo-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' />
        </svg>
      ),
      title: 'Smart Task Management',
      description: 'Organize your tasks with intelligent categorization, priority levels, and due date tracking.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-purple-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
        </svg>
      ),
      title: 'Lightning Fast Performance',
      description: 'Built with Next.js for blazing fast performance and seamless user experience.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
        </svg>
      ),
      title: 'Enterprise Security',
      description: 'Your data is protected with enterprise-grade security and encryption.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-orange-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
        </svg>
      ),
      title: 'Intuitive Design',
      description: 'Beautiful, modern interface designed for maximum productivity and user satisfaction.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-cyan-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
        </svg>
      ),
      title: 'Real-time Sync',
      description: 'Your tasks sync across all devices in real-time, keeping you always up to date.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: (
        <svg className='w-8 h-8 text-pink-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
        </svg>
      ),
      title: 'Advanced Analytics',
      description: 'Track your productivity with detailed analytics and insights into your work patterns.',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div className='min-h-screen px-4 sm:px-6 lg:px-8 py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent'>
            Powerful Features
          </h1>
          <p className='text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto'>
            Discover the amazing features that make TaskFlow the ultimate task management solution
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/signup'
              className='px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1'
            >
              Get Started Free
            </Link>
            <Link
              href='/contact'
              className='px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105'
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 group hover:scale-105'
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>{feature.title}</h3>
              <p className='text-slate-300 leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className='bg-white bg-opacity-5 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white border-opacity-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold text-white mb-4'>
              Trusted by Thousands
            </h2>
            <p className='text-slate-300 text-lg'>
              Join the growing community of productive users
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-4xl sm:text-5xl font-bold text-indigo-400 mb-2'>10K+</div>
              <div className='text-slate-300'>Active Users</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl sm:text-5xl font-bold text-purple-400 mb-2'>1M+</div>
              <div className='text-slate-300'>Tasks Completed</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl sm:text-5xl font-bold text-green-400 mb-2'>99.9%</div>
              <div className='text-slate-300'>Uptime</div>
            </div>
            <div className='text-center'>
              <div className='text-4xl sm:text-5xl font-bold text-orange-400 mb-2'>24/7</div>
              <div className='text-slate-300'>Support</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='text-center mt-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-white mb-6'>
            Ready to Boost Your Productivity?
          </h2>
          <p className='text-xl text-slate-300 mb-8 max-w-2xl mx-auto'>
            Start organizing your tasks today and experience the difference
          </p>
          <Link
            href='/signup'
            className='inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group'
          >
            <svg className='w-5 h-5 group-hover:rotate-12 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
            </svg>
            <span>Get Started Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
