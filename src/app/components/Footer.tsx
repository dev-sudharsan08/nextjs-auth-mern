'use client';

import { FaCheckCircle, FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12 border-t border-slate-700'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center'>
                <FaCheckCircle className='w-5 h-5 text-white' />
              </div>
              <h3 className='text-xl font-bold text-white'>TaskFlow</h3>
            </div>
            <p className='text-slate-400 text-sm leading-relaxed'>
              Your ultimate task management solution. Organize, prioritize, and achieve your goals with ease.
            </p>
            <div className='flex space-x-4'>
              <a className='w-8 h-8 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200 group'>
                <FaTwitter className='w-4 h-4 text-slate-300 group-hover:text-white' />
              </a>
              <a className='w-8 h-8 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200 group'>
                <FaPinterest className='w-4 h-4 text-slate-300 group-hover:text-white' />
              </a>
              <a className='w-8 h-8 bg-slate-700 hover:bg-indigo-500 rounded-lg flex items-center justify-center transition-colors duration-200 group'>
                <FaLinkedin className='w-4 h-4 text-slate-300 group-hover:text-white' />
              </a>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Product</h4>
            <ul className='space-y-2 text-sm'>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Features</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Pricing</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>API</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Integrations</a></li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Company</h4>
            <ul className='space-y-2 text-sm'>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>About</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Blog</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Careers</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Contact</a></li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Support</h4>
            <ul className='space-y-2 text-sm'>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Help Center</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Documentation</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Status</a></li>
              <li><a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Community</a></li>
            </ul>
          </div>
        </div>

        <div className='border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-slate-400 text-sm mb-4 md:mb-0'>
            &copy; 2025 TaskFlow. All rights reserved. Built with ❤️ using Next.js
          </p>
          <div className='flex space-x-6 text-sm'>
            <a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Privacy Policy</a>
            <a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Terms of Service</a>
            <a className='text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer'>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
