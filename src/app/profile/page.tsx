'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [{ isError, message }, setIsError] = useState({
    isError: false,
    message: '',
  });

  async function handleGetUserDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsError({ isError: false, message: '' });
    setLoader(true);
    try {
      const response = await axios.get('/api/users/details');
      console.log(response);
      setData(response);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.error || 'Sorry Something went wrong';
        console.log(errorMessage);
        setIsError({ isError: true, message: errorMessage });
      } else if (error instanceof Error) {
        console.log(error);
        setIsError({ isError: true, message: error.message });
      } else {
        console.log('Unknown error', error);
        setIsError({ isError: true, message: 'Sorry Something went wrong' });
      }
    } finally {
      setLoader(false);
    }
  }

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     router.push('/login');
  //   } else {
  //     try {
  //       const decoded = jwtDecode(token);
  //       setUser(decoded);
  //     } catch (error) {
  //       console.error('Invalid token:', error);
  //       localStorage.removeItem('token');
  //       router.push('/login');
  //     }
  //   }
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      {data && !loader ? (
        <>
          <p>
            Welcome, user ID:
            {/* <strong>{user.userId}</strong> */}
          </p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
