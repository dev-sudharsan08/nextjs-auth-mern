'use client';

import { useState } from 'react';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineArrowPath,
  HiCheckCircle,
} from 'react-icons/hi2';

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

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <HiOutlineEnvelope className='w-6 h-6 text-white' />,
      title: 'Email Us',
      description: 'Get in touch via email for support or inquiries.',
      value: 'support@taskflow.com',
      color: 'from-indigo-500 to-blue-500',
    },
    {
      icon: <HiOutlinePhone className='w-6 h-6 text-white' />,
      title: 'Call Us',
      description: 'Speak directly with our sales or support team.',
      value: '+1 (555) 123-4567',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <HiOutlineMapPin className='w-6 h-6 text-white' />,
      title: 'Visit Us',
      description: 'Our office location for meetings and mail.',
      value: '123 Tech Street, San Francisco, CA',
      color: 'from-green-500 to-emerald-500',
    }
  ];

  if (isSubmitted) {
    return (
      <div className='min-h-screen flex items-center justify-center px-4'>
        <div className='bg-indigo-900/15 backdrop-blur-md shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md border border-indigo-700/50 text-center'>
          <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
            <HiCheckCircle className='w-10 h-10 text-white' />
          </div>
          <h1 className='text-3xl font-bold text-white mb-4'>
            Message Sent! 🎉
          </h1>
          <p className='text-slate-400 mb-6'>
            Thank you for reaching out. Your inquiry has been successfully received. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className='px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-100 mt-4'
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent'>
            Get in Touch
          </h1>
          <p className='text-xl sm:text-2xl text-slate-400 mb-8 max-w-3xl mx-auto'>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          <div className='bg-indigo-900/15 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-indigo-700/50 shadow-2xl shadow-indigo-900/20'>
            <h2 className='text-3xl font-bold text-white mb-8'>Send us a message</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-slate-300 mb-2'>Name *</label>
                  <input
                    type='text'
                    name='name'
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-indigo-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200'
                    placeholder='Your full name'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-300 mb-2'>Email *</label>
                  <input
                    type='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-4 py-3 border border-indigo-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200'
                    placeholder='your@email.com'
                  />
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>Subject *</label>
                <input
                  type='text'
                  name='subject'
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-indigo-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200'
                  placeholder='What is this about?'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>Message *</label>
                <textarea
                  name='message'
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className='w-full px-4 py-3 border border-indigo-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white resize-none transition-colors duration-200'
                  placeholder='Tell us more about your inquiry...'
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
              >
                {isSubmitting ? (
                  <span className='flex items-center justify-center space-x-3'>
                    <HiOutlineArrowPath className='w-5 h-5 animate-spin' />
                    <span>Sending...</span>
                  </span>
                ) : (
                  <span className='flex items-center justify-center space-x-3'>
                    <HiOutlinePaperAirplane className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                    <span>Send Message</span>
                  </span>
                )}
              </button>
            </form>
          </div>
          <div className='space-y-8'>
            <div>
              <h2 className='text-3xl font-bold text-white mb-6'>Contact Information</h2>
              <p className='text-slate-400 mb-8 leading-relaxed text-lg'>
                We're here to help! Reach out to us through any of the channels below, and we'll get back to you as soon as possible.
              </p>
            </div>
            <div className='space-y-6'>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className='bg-violet-900 rounded-2xl p-6 border border-indigo-700/30 shadow-lg group hover:border-indigo-500 transition-all duration-300'
                >
                  <div className='flex items-start space-x-6'>
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg shadow-gray-900/50 group-hover:scale-[1.05] transition-transform`}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-white mb-1'>{info.title}</h3>
                      <p className='text-slate-400 mb-2 text-sm'>{info.description}</p>
                      <a
                        href={info.title === 'Email Us' ? `mailto:${info.value}` : info.title === 'Call Us' ? `tel:${info.value}` : '#'}
                        className='text-indigo-400 font-medium hover:text-indigo-300 transition-colors'
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='bg-purple-900 rounded-2xl p-6 border border-indigo-700/30 mt-9'>
          <h3 className='text-xl font-bold text-white mb-4'>Frequently Asked Questions</h3>
          <div className='space-y-4'>
            <div>
              <h4 className='text-white font-semibold mb-1'>How quickly do you respond?</h4>
              <p className='text-slate-400 text-sm'>We typically respond within **24 hours** during business days (Monday-Friday).</p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-1'>Do you offer phone support?</h4>
              <p className='text-slate-400 text-sm'>Yes, dedicated phone support is available for **Premium** and **Enterprise** plan users.</p>
            </div>
            <div>
              <h4 className='text-white font-semibold mb-1'>Can I schedule a demo?</h4>
              <p className='text-slate-400 text-sm'>Absolutely! Fill out the contact form, and we'll reach out to schedule a personalized demo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}