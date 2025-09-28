'use client';

import { FaCheckCircle, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-8 sm:py-12 border-t border-slate-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8'>
          <div className='space-y-3 sm:space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center'>
                <FaCheckCircle className='w-3 h-3 sm:w-5 sm:h-5 text-white' />
              </div>
              <h3 className='text-lg sm:text-xl font-bold text-white'>TaskFlow</h3>
            </div>
            <p className='text-slate-400 text-xs sm:text-sm leading-relaxed'>
              Your ultimate task management solution. Organize, prioritize, and achieve your goals with ease.
            </p>
            <div className='flex space-x-3 sm:space-x-4'>
              <a className='w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200 group'>
                <FaTwitter className='w-3 h-3 sm:w-4 sm:h-4 text-slate-300 group-hover:text-white' />
              </a>
              <a className='w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200 group'>
                <FaPinterest className='w-3 h-3 sm:w-4 sm:h-4 text-slate-300 group-hover:text-white' />
              </a>
              <a className='w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200 group'>
                <FaLinkedin className='w-3 h-3 sm:w-4 sm:h-4 text-slate-300 group-hover:text-white' />
              </a>
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <h4 className='text-base sm:text-lg font-semibold text-white'>Product</h4>
            <ul className='space-y-2 text-xs sm:text-sm'>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Features</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Pricing</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>API</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Integrations</a></li>
            </ul>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <h4 className='text-base sm:text-lg font-semibold text-white'>Company</h4>
            <ul className='space-y-2 text-xs sm:text-sm'>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>About</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Blog</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Careers</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Contact</a></li>
            </ul>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <h4 className='text-base sm:text-lg font-semibold text-white'>Support</h4>
            <ul className='space-y-2 text-xs sm:text-sm'>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Help Center</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Documentation</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Status</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Community</a></li>
            </ul>
          </div>
        </div>

        <div className='border-t border-slate-700 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
          <p className='text-slate-400 text-xs sm:text-sm text-center sm:text-left'>
            &copy; 2025 TaskFlow. All rights reserved. Built with ❤️ using Next.js
          </p>
          <div className='flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-xs sm:text-sm'>
            <a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Privacy Policy</a>
            <a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Terms of Service</a>
            <a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
