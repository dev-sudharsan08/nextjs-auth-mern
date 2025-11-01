'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserLock } from 'react-icons/fa';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import Spinner from '../components/reusable/spinner/spinner';

interface LogoutClientProps {
  isExpired: boolean;
}

const LogoutClient = ({ isExpired }: LogoutClientProps) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  const icon = isExpired
    ? <FaUserLock className="text-red-500 w-16 h-16" />
    : <IoCheckmarkCircleOutline className="text-green-400 w-16 h-16" />;

  const headline = isExpired
    ? "Your Session Has Expired"
    : "You've Been Successfully Logged Out!";
  const bodyText = isExpired
    ? "For your security, you were automatically logged out. This may be due to inactivity or a security token mismatch."
    : "Thanks for using our application. Your session has ended securely.";

  useEffect(() => {
    handleLogout();
  }, []);

  async function handleLogout() {
    try {
      setLoader(true);
      const response = await axios.get('/api/users/logout', {});
      localStorage.removeItem('isUserloggedIn');
      console.log(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error.message);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    } finally {
      setLoader(false);
    }
  }

  return (
    <div className={`flex items-center justify-center text-white`}>
      {loader && <Spinner loading={loader} />}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-2xl max-w-sm w-full text-center">
        <div className="flex justify-center mb-6">
          {icon}
        </div>
        <h1 className="text-2xl font-extrabold mb-2 text-white">
          {headline}
        </h1>
        <p className="text-indigo-100 mb-8 font-light">
          {bodyText}
        </p>
        <button
          onClick={() => router.push('/login')}
          className='w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group'
        >
          Sign In Again
        </button>
      </div>
    </div>
  );
};

export default LogoutClient;