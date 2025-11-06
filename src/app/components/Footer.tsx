'use client';

import Link from 'next/link';
import { FaTwitter, FaPinterest, FaLinkedin } from 'react-icons/fa';
import { HiBadgeCheck } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className='bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-10 sm:py-16 border-t border-slate-700/70'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-10 sm:mb-12'>
          <div className='col-span-2 space-y-4 sm:space-y-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                <HiBadgeCheck className='text-indigo-400 w-6 h-6 drop-shadow-lg' />
              </div>
              <h3 className='text-xl sm:text-2xl font-extrabold text-white tracking-wider'>TaskRebel</h3>
            </div>
            <p className='text-slate-400 text-sm leading-normal max-w-sm'>
              Your ultimate task management solution. Organize, prioritize, and achieve your goals with ease.
            </p>
            <div className='flex space-x-3 sm:space-x-4 pt-2'>
              <Link href='/' className='w-8 h-8 bg-slate-700/50 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 group'>
                <FaTwitter className='w-4 h-4 text-slate-300 group-hover:text-white' />
              </Link>
              <Link href='/' className='w-8 h-8 bg-slate-700/50 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 group'>
                <FaPinterest className='w-4 h-4 text-slate-300 group-hover:text-white' />
              </Link>
              <Link href='/' className='w-8 h-8 bg-slate-700/50 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-all duration-300 group'>
                <FaLinkedin className='w-4 h-4 text-slate-300 group-hover:text-white' />
              </Link>
            </div>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Product</h4>
            <ul className='space-y-2 text-sm'>
              <li><Link href='/features' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Features</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Pricing</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>API</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Integrations</Link></li>
            </ul>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Company</h4>
            <ul className='space-y-2 text-sm'>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>About</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Blog</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Careers</Link></li>
              <li><Link href='/contact' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Contact</Link></li>
            </ul>
          </div>

          <div className='space-y-3 sm:space-y-4'>
            <h4 className='text-lg font-semibold text-white'>Support</h4>
            <ul className='space-y-2 text-sm'>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Help Center</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Documentation</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Status</Link></li>
              <li><Link href='/' className='text-slate-400 hover:text-indigo-400 transition-colors duration-200'>Community</Link></li>
            </ul>
          </div>
        </div>

        <div className='border-t border-slate-700/70 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
          <p className='text-slate-500 text-sm text-center sm:text-left'>
            &copy; 2025 TaskRebel. All rights reserved. Built with <span className='text-red-500'>&hearts;</span> using Next.js
          </p>
          <div className='flex flex-wrap justify-center sm:justify-end space-x-6 text-sm font-medium'>
            <Link href='/' className='text-slate-400 hover:text-white transition-colors duration-200'>Privacy Policy</Link>
            <Link href='/' className='text-slate-400 hover:text-white transition-colors duration-200'>Terms of Service</Link>
            <Link href='/' className='text-slate-400 hover:text-white transition-colors duration-200'>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}