import Link from 'next/link';
import { HiCheck, HiOutlineClipboardCheck, HiOutlineRefresh, HiOutlineUserAdd } from 'react-icons/hi';
import {
  HiOutlineBolt,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineChartBar,
  HiOutlineBookOpen,
} from 'react-icons/hi2';


export default function Features() {
  const features = [
    {
      icon: <HiOutlineClipboardCheck className='w-8 h-8 text-white' />,
      title: 'Smart Task Management',
      description: 'Organize your tasks with intelligent categorization, priority levels, and due date tracking.',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: <HiOutlineBolt className='w-8 h-8 text-white' />,
      title: 'Lightning Fast Performance',
      description: 'Built with Next.js for blazing fast performance and seamless user experience.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <HiOutlineShieldCheck className='w-8 h-8 text-white' />,
      title: 'Enterprise Security',
      description: 'Your data is protected with enterprise-grade security and encryption.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <HiOutlineHeart className='w-8 h-8 text-white' />,
      title: 'Intuitive Design',
      description: 'Beautiful, modern interface designed for maximum productivity and user satisfaction.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <HiOutlineRefresh className='w-8 h-8 text-white' />,
      title: 'Real-time Sync',
      description: 'Your tasks sync across all devices in real-time, keeping you always up to date.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <HiOutlineChartBar className='w-8 h-8 text-white' />,
      title: 'Advanced Analytics',
      description: 'Track your productivity with detailed analytics and insights into your work patterns.',
      color: 'from-pink-500 to-purple-500',
    },
  ];

  
  const features2 = [
    {
      title: '10K+',
      text: 'Active Users',
    },
    {
      title: '1M+',
      text: 'Tasks Completed',
    },
    {
      title: '99.9%',
      text: 'Uptime',
    },
    {
      title: '24/7',
      text: 'Support',
    },
  ];

  return (
   <div className='px-4 sm:px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent'>
            Powerful Features
          </h1>
          <p className='text-xl sm:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto'>
            Discover the core capabilities that make TaskRebel the ultimate task management solution.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
            <Link
              href='/signup'
              className='group relative px-10 py-4 bg-gradient-to-br from-indigo-500 to-purple-700 text-white text-lg font-extrabold rounded-full shadow-[0_15px_30px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.6)] transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 active:scale-105 active:translate-y-0'
            >
              <span className='flex items-center space-x-3'>
                <HiOutlineUserAdd className='w-6 h-6 group-hover:scale-110 transition-transform duration-500' />
                <span>Get Started Free</span>
              </span>
            </Link>
            <Link
              href='/contact'
              className='group px-10 py-4 bg-white/10 backdrop-blur-xl text-white text-lg font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-white/5'
            >
              <span className='flex items-center space-x-3'>
                <HiOutlineBookOpen className='w-6 h-6 group-hover:scale-110 transition-transform duration-500' />
                <span>Learn More</span>
              </span>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 mb-20 p-8 bg-indigo-900/10 rounded-3xl border border-indigo-700/50 shadow-2xl shadow-indigo-900/20'>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start p-4 border-b border-indigo-700/50 last:border-b-0 group transition-all duration-300 hover:bg-indigo-700/20 rounded-lg 
                ${(index === 4 || index === 5) ? 'lg:border-b-0' : ''}`}
            >
              <div className='flex-shrink-0 mt-1 mr-4'>
                <HiCheck className='w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors'>{feature.title}</h3>
                <p className='text-slate-400 leading-normal text-base'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
         <div className='mt-20 grid grid-cols-1 md:grid-cols-4 gap-6 text-center max-w-6xl mx-auto'>
          {features2.map((item, index) => (
            <div key={index} className='bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-lg transition-all hover:border-indigo-500/50 hover:shadow-indigo-500/30 duration-500'>
              <div className='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2'>{item.title}</div>
              <div className='text-slate-200 text-base font-medium uppercase tracking-wider'>{item.text}</div>
            </div>
          ))}
        </div>
        <div className='text-center mt-20'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-white mb-6'>
            Ready to Boost Your Productivity?
          </h2>
          <p className='text-xl text-slate-400 mb-10 max-w-2xl mx-auto'>
            Start organizing your tasks today and experience the difference
          </p>
          <Link
            href='/signup'
            className='inline-flex items-center space-x-3 px-10 py-4 bg-gradient-to-br from-indigo-500 to-purple-700 text-white text-lg font-extrabold rounded-full shadow-[0_15px_30px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.6)] transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 group'
          >
            <HiOutlineUserAdd className='w-6 h-6 group-hover:scale-110 transition-transform duration-500' />
            <span>Get Started Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
}