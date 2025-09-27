



import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4'>
      <h1 className='text-3xl font-bold text-white mb-4 text-center'>
        Welcome to the Basic User Authentication App
      </h1>
      <p className='text-lg text-gray-400 mb-8 text-center'>
        Built with the MERN stack using Next.js
      </p>
      <div className='flex gap-4'>
        <Link
          href='/login'
          className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
        >
          Login
        </Link>
        <Link
          href='/signup'
          className='px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
        >
          Register
        </Link>
      </div>
    </div>
  );
}

