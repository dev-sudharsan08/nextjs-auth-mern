import Link from 'next/link';
import { HiCheckCircle, HiLightningBolt, HiLockClosed, HiOutlineUserAdd } from 'react-icons/hi';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

export default function Home() {

const homeData = [
  {
    icon: <HiCheckCircle className='w-8 h-8 text-white' />,
    title: 'Smart Organization',
    description: (
      <>
        Organize your tasks with <strong>priority levels</strong> and due dates for peak productivity.
      </>
    ),
    className: 'from-blue-500 to-cyan-400',
  },
  {
    icon: <HiLightningBolt className='w-8 h-8 text-white' />,
    title: 'Lightning Fast',
    description: (
      <>
        Built with <strong>Next.js</strong> for blazing fast performance and instant loading.
      </>
    ),
    className: 'from-purple-500 to-pink-500',
  },
  {
    icon: <HiLockClosed className='w-8 h-8 text-white' />,
    title: 'Secure & Private',
    description: (
      <>
        Your data is protected with <strong>enterprise-grade security</strong> and strict privacy protocols.
      </>
    ),
    className: 'from-green-500 to-emerald-400',
  },
];


  const features = [
    {
      title: '10K+',
      text: 'Active Users',
      className: 'from-indigo-400 to-purple-400',
    },
    {
      title: '1M+',
      text: 'Tasks Completed',
      className: 'from-purple-400 to-pink-400',
    },
    {
      title: '99.9%',
      text: 'Uptime',
      className: 'from-green-400 to-emerald-400',
    },
    {
      title: '24/7',
      text: 'Support',
      className: 'from-orange-400 to-red-400',
    },
  ];

  return (
    <div className='flex flex-col items-center justify-center px-4 sm:px-6 relative'>
      <div className='text-center max-w-7xl mx-auto mx-auto relative z-10'>
        <div className='mb-8'>
          <h1 className='text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight'>
            Welcome to
            <span className='block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              TaskRebel
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed'>
            Your ultimate task management solution. Organize, prioritize, and achieve your goals with ease.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 p-4 rounded-3xl'>
          {homeData.map((item, index) => (
            <div key={index} className='bg-white/5 backdrop-blur-lg rounded-2xl p-7 border border-white/10 shadow-2xl hover:bg-white/15 transition-all duration-500 group transform hover:-translate-y-1'>
              <div aria-label={`${item.title} icon`} className={`w-14 h-14 bg-gradient-to-br ${item.className} rounded-xl flex items-center justify-center mb-6 shadow-${item.className.replace('from-', '').replace(' to-', '-')}/50 group-hover:scale-105 transition-transform duration-500 mx-auto`}>

                {item.icon}
              </div>
              <h3 className='text-xl font-bold text-white mb-3 tracking-wide'>{item.title}</h3>
              <p className='text-slate-300 text-base'>{item.description}</p>
            </div>
          ))}
        </div>
        <div className='flex flex-col sm:flex-row gap-6 justify-center items-center mt-10'>
          <Link
            href='/signup'
            className='group relative px-10 py-4 bg-gradient-to-br from-indigo-500 to-purple-700 text-white text-lg font-extrabold rounded-full shadow-[0_15px_30px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(99,102,241,0.6)] transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 active:scale-105 active:translate-y-0'
          >
            <span className='flex items-center space-x-3'>
              <HiOutlineUserAdd className='w-6 h-6 group-hover:translate-x-2 transition-transform duration-500' />
              <span>Get Started Free</span>
            </span>
          </Link>
          <Link
            href='/login'
            className='group relative px-10 py-4 bg-gradient-to-br from-teal-400 to-emerald-600 text-white text-lg font-extrabold rounded-full shadow-[0_15px_30px_-5px_rgba(52,211,163,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(52,211,163,0.6)] transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 active:scale-105 active:translate-y-0'
          >
            <span className='flex items-center space-x-3'>
              <HiOutlineArrowRightOnRectangle className='w-6 h-6 group-hover:translate-x-2 transition-transform duration-500' />
              <span>Sign In</span>
            </span>
          </Link>
        </div>
        <div className='bg-indigo-900/15 rounded-3xl p-8 sm:p-12 border border-indigo-700/50 shadow-2xl shadow-indigo-900/20 mt-14 md:mt-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-extrabold text-white mb-4'>
              Trusted by Thousands
            </h2>
            <p className='text-slate-400 text-lg'>
              Join the growing community of productive users
            </p>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {features.map((feature, index) => (
              <div key={index} className='text-center'>
                <div className={`text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${feature.className} mb-2`}>
                  {feature.title}
                </div>
                <div className='text-slate-300 uppercase tracking-wider text-sm'>{feature.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse'></div>
      <div className='absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-30 animate-bounce'></div>
      {/* <div className='absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full opacity-25 animate-pulse'></div> */}
    </div>
  );
}

