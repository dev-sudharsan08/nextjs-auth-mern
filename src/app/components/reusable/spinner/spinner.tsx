


'use client';

import React from 'react';
import { ClipLoader } from 'react-spinners';

type SpinnerProps = {
  loading: boolean;
  size?: number;
  color?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  loading,
  size = 100,
  color = '#ffffff',
}) => {
  if (!loading) return null;

  const loaderStyle: React.CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#6767cf',
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50'>
      <ClipLoader
        color={color}
        loading={loading}
        size={size}
        cssOverride={loaderStyle}
        aria-label='Loading Spinner'
        data-testid='loader'
        title='Loading...'
      />
    </div>
  );
};

export default Spinner;
