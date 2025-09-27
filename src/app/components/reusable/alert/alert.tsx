'use client';

import React, { useEffect, useRef } from 'react';

type AlertProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  style?: React.CSSProperties;
  className?: string;
};

const alertStyles: Record<string, string> = {
  success: 'bg-green-100 text-green-800 border-green-300',
  error: 'bg-red-100 text-red-800 border-red-300',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  info: 'bg-blue-100 text-blue-800 border-blue-300',
};

const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  style = {},
  className = '',
}) => {
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div
      ref={alertRef}
      tabIndex={-1}
      className={`border px-4 py-3 rounded relative ${alertStyles[type]} ${className}`}
      role='alert'
      style={style}
      aria-live='assertive'
      aria-atomic='true'
    >
      <span className='block sm:inline'>{message}</span>
    </div>
  );
};

export default Alert;
