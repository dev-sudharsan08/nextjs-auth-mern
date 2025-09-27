



import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4 relative'>
      {/* Hero Section */}
      <div className='text-center max-w-4xl mx-auto relative z-10'>
        {/* Main Heading */}
        <div className='mb-8'>
          <h1 className='text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight'>
            Welcome to
            <span className='block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              TaskFlow
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed'>
            Your ultimate task management solution. Organize, prioritize, and achieve your goals with ease.
          </p>
        </div>

        {/* Feature Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 group'>
            <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-white mb-2'>Smart Organization</h3>
            <p className='text-slate-300 text-sm'>Organize your tasks with priority levels and due dates</p>
          </div>

          <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 group'>
            <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-white mb-2'>Lightning Fast</h3>
            <p className='text-slate-300 text-sm'>Built with Next.js for blazing fast performance</p>
          </div>

          <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 group'>
            <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-white mb-2'>Secure & Private</h3>
            <p className='text-slate-300 text-sm'>Your data is protected with enterprise-grade security</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Link
            href='/signup'
            className='group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1'
          >
            <span className='flex items-center space-x-2'>
              <svg className='w-5 h-5 group-hover:rotate-12 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
              </svg>
              <span>Get Started Free</span>
            </span>
          </Link>

          <Link
            href='/login'
            className='group px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105'
          >
            <span className='flex items-center space-x-2'>
              <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
              </svg>
              <span>Sign In</span>
            </span>
          </Link>
        </div>

        {/* Stats */}
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          <div className='bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10'>
            <div className='text-3xl font-bold text-white mb-2'>10K+</div>
            <div className='text-slate-300'>Active Users</div>
          </div>
          <div className='bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10'>
            <div className='text-3xl font-bold text-white mb-2'>1M+</div>
            <div className='text-slate-300'>Tasks Completed</div>
          </div>
          <div className='bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-10'>
            <div className='text-3xl font-bold text-white mb-2'>99.9%</div>
            <div className='text-slate-300'>Uptime</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-30 animate-bounce'></div>
      <div className='absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-25 animate-pulse'></div>
    </div>
  );
}

