'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg className='w-6 h-6 text-indigo-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
        </svg>
      ),
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'support@taskflow.com'
    },
    {
      icon: (
        <svg className='w-6 h-6 text-purple-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
        </svg>
      ),
      title: 'Call Us',
      description: 'Speak with our team',
      value: '+1 (555) 123-4567'
    },
    {
      icon: (
        <svg className='w-6 h-6 text-green-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
        </svg>
      ),
      title: 'Visit Us',
      description: 'Come say hello',
      value: '123 Tech Street, San Francisco, CA'
    }
  ];

  if (isSubmitted) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md border border-white border-opacity-20 text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6'>
            <svg className='w-10 h-10 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Message Sent!
          </h1>
          <p className='text-slate-300 mb-6'>
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className='px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105'
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen px-4 sm:px-6 lg:px-8 py-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent'>
            Get in Touch
          </h1>
          <p className='text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <div className='bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20'>
            <h2 className='text-2xl font-bold text-white mb-6'>Send us a message</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>
                    Name *
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-white mb-2'>
                    Email *
                  </label>
                  <input
                    type='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                    placeholder='your@email.com'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-white mb-2'>
                  Subject *
                </label>
                <input
                  type='text'
                  name='subject'
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white'
                  placeholder='What is this about?'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-white mb-2'>
                  Message *
                </label>
                <textarea
                  name='message'
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-white border-opacity-20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white bg-opacity-10 backdrop-blur-sm placeholder-slate-300 text-white resize-none'
                  placeholder='Tell us more about your inquiry...'
                />
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
              >
                {isSubmitting ? (
                  <span className='flex items-center justify-center space-x-2'>
                    <svg className='w-5 h-5 animate-spin' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
                    </svg>
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span className='flex items-center justify-center space-x-2'>
                    <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
                    </svg>
                    <span>Send Message</span>
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className='space-y-8'>
            <div>
              <h2 className='text-2xl font-bold text-white mb-6'>Contact Information</h2>
              <p className='text-slate-300 mb-8 leading-relaxed'>
                We're here to help! Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
              </p>
            </div>

            <div className='space-y-6'>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className='bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10 hover:bg-opacity-10 transition-all duration-300 group'
                >
                  <div className='flex items-start space-x-4'>
                    <div className='w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform'>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-white mb-2'>{info.title}</h3>
                      <p className='text-slate-300 mb-2'>{info.description}</p>
                      <p className='text-indigo-400 font-medium'>{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className='bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-10'>
              <h3 className='text-lg font-semibold text-white mb-4'>Frequently Asked Questions</h3>
              <div className='space-y-4'>
                <div>
                  <h4 className='text-white font-medium mb-1'>How quickly do you respond?</h4>
                  <p className='text-slate-300 text-sm'>We typically respond within 24 hours during business days.</p>
                </div>
                <div>
                  <h4 className='text-white font-medium mb-1'>Do you offer phone support?</h4>
                  <p className='text-slate-300 text-sm'>Yes, we offer phone support for premium users.</p>
                </div>
                <div>
                  <h4 className='text-white font-medium mb-1'>Can I schedule a demo?</h4>
                  <p className='text-slate-300 text-sm'>Absolutely! Contact us to schedule a personalized demo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
