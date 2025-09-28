'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaBolt, FaEnvelope, FaSignInAlt, FaSignOutAlt, FaCheckCircle, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const { isAuthenticated, logout, loading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
        <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
              <FaCheckCircle className='w-6 h-6 text-white' />
            </div>
            <h1 className='text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
              TaskFlow
            </h1>
          </div>
          <div className='animate-pulse bg-white bg-opacity-20 h-8 w-24 rounded'></div>
        </div>
      </header>
    );
  }

  return (
    <header className='bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center'>
        <div className='flex items-center space-x-3'>
          <div className='w-8 h-8 sm:w-10 sm:h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
            <FaCheckCircle className='w-4 h-4 sm:w-6 sm:h-6 text-white' />
          </div>
          <h1 className='text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
            TaskFlow
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden lg:flex items-center space-x-6'>
          <Link href='/' className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group'>
            <FaHome className='w-4 h-4 group-hover:scale-110 transition-transform' />
            <span className='text-sm font-medium'>Home</span>
          </Link>
          <Link href='/features' className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group'>
            <FaBolt className='w-4 h-4 group-hover:scale-110 transition-transform' />
            <span className='text-sm font-medium'>Features</span>
          </Link>
          <Link href='/contact' className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 group'>
            <FaEnvelope className='w-4 h-4 group-hover:scale-110 transition-transform' />
            <span className='text-sm font-medium'>Contact</span>
          </Link>

          {isAuthenticated ? (
            <button
              className='flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
              onClick={logout}
            >
              <FaSignOutAlt className='w-4 h-4 group-hover:rotate-12 transition-transform' />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              href='/login'
              className='flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
            >
              <FaSignInAlt className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              <span>Login</span>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className='lg:hidden flex items-center space-x-2'>
          {isAuthenticated ? (
            <button
              className='flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
              onClick={logout}
            >
              <FaSignOutAlt className='w-4 h-4 group-hover:rotate-12 transition-transform' />
              <span className='hidden sm:inline'>Logout</span>
            </button>
          ) : (
            <Link
              href='/login'
              className='flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 group'
            >
              <FaSignInAlt className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
              <span className='hidden sm:inline'>Login</span>
            </Link>
          )}

          <button
            className='p-2 text-white hover:text-blue-200 transition-colors duration-200'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes className='w-5 h-5' /> : <FaBars className='w-5 h-5' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='lg:hidden bg-white bg-opacity-10 backdrop-blur-lg border-t border-white border-opacity-20'>
          <div className='px-4 py-4 space-y-3'>
            <Link
              href='/'
              className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 py-2'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaHome className='w-4 h-4' />
              <span className='font-medium'>Home</span>
            </Link>
            <Link
              href='/features'
              className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 py-2'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaBolt className='w-4 h-4' />
              <span className='font-medium'>Features</span>
            </Link>
            <Link
              href='/contact'
              className='flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200 py-2'
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaEnvelope className='w-4 h-4' />
              <span className='font-medium'>Contact</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
