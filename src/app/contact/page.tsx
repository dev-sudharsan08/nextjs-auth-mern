'use client';

import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineArrowPath,
  HiCheckCircle,
} from 'react-icons/hi2';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required.';
        if (value.trim().length < 2) return 'Please enter at least 2 characters.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address.';
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subject is required.';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (data: FormData) => {
    const newErrors: FormErrors = {};
    (Object.keys(data) as Array<keyof FormData>).forEach((key) => {
      const err = validateField(key, data[key]);
      if (err) newErrors[key] = err;
    });
    return newErrors;
  };

  const isFormValid = (errs: FormErrors) => Object.keys(errs).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, email: true, subject: true, message: true });

    const formErrors = validateForm(formData);
    setErrors(formErrors);

    if (!isFormValid(formErrors)) {
      return;
    }

    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setTouched({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof FormData]) {
      const fieldError = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
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
      <div className='flex items-center justify-center px-4 sm:px-6'>
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
            <form onSubmit={handleSubmit} className='space-y-6' noValidate>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-slate-300 mb-2'>
                    Name <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type='text'
                    name='name'
                    required
                    aria-required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${errors.name ? 'border-red-400' : 'border-indigo-700/50'}`}
                    placeholder='Your full name'
                  />
                  {errors.name && touched.name && (

                    <div className='flex items-center mt-1 '>
                      <HiOutlineExclamationCircle
                        className='w-4 h-4 text-red-500 me-2 mb-0'
                        aria-label="Error"
                      />
                      <span className='text-sm text-red-400'>{errors.name}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className='block text-sm font-medium text-slate-300 mb-2'>
                    Email <span className='text-red-400'>*</span>
                  </label>
                  <input
                    type='email'
                    name='email'
                    required
                    aria-required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${errors.email ? 'border-red-400' : 'border-indigo-700/50'}`}
                    placeholder='your@email.com'
                  />
                  {errors.email && touched.email && (
                    <div className='flex items-center mt-1 '>
                      <HiOutlineExclamationCircle
                        className='w-4 h-4 text-red-500 me-2 mb-0'
                        aria-label="Error"
                      />
                      <span className='text-sm text-red-400'>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Subject <span className='text-red-400'>*</span>
                </label>
                <input
                  type='text'
                  name='subject'
                  required
                  aria-required
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white transition-colors duration-200 ${errors.subject ? 'border-red-400' : 'border-indigo-700/50'}`}
                  placeholder='What is this about?'
                />
                {errors.subject && touched.subject && (
                  <div className='flex items-center mt-1 '>
                    <HiOutlineExclamationCircle
                      className='w-4 h-4 text-red-500 me-2 mb-0'
                      aria-label="Error"
                    />
                    <span className='text-sm text-red-400'>{errors.subject}</span>
                  </div>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-300 mb-2'>
                  Message <span className='text-red-400'>*</span>
                </label>
                <textarea
                  name='message'
                  required
                  aria-required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-900/50 placeholder-slate-500 text-white resize-none transition-colors duration-200 ${errors.message ? 'border-red-400' : 'border-indigo-700/50'}`}
                  placeholder='Tell us more about your inquiry...'
                />
                {errors.message && touched.message && (
                  <div className='flex items-center mt-1 '>
                    <HiOutlineExclamationCircle
                      className='w-4 h-4 text-red-500 me-2 mb-0'
                      aria-label="Error"
                    />
                    <span className='text-sm text-red-400'>{errors.message}</span>
                  </div>
                )}
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
