import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import axios from 'axios';

//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo';
import logo from '../images/twitter.png';
import LoaderComponent from './LoaderComponent';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  //UTILISING GLOBAL CONTEXT CUSTOM HOOK
  const { isSignedIn, setIsSignedIn, user, setUser } = useGlobalContext();

  //UTILISIING USENAVIGATE HOOK
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignInData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await axios.post(
        'https://twitter-backend-s1nc.onrender.com/api/v1/auth/login',
        signInData
      );
      setIsSignedIn(true);
      localStorage.setItem('userToken', JSON.stringify(data.data.token));
      localStorage.setItem('username', JSON.stringify(data.data.username));
      localStorage.setItem('userId', JSON.stringify(data.data.id));
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage(err.response.data.msg);
        return;
      }
      console.error(error);
    }
  };

  return (
    <section>
      {isLoading ? (
        <div className="mt-36">
          <LoaderComponent />
        </div>
      ) : (
        <div className="w-[90%] p-6 mx-auto my-9 rounded-lg sm:shadow-3xl sm:pt-2 sm:pb-4 lg:w-[80%] lg:py-9">
          <Logo logo={logo} />
          <div className=" flex flex-col w-10/12 mx-auto py-3 items-center">
            <h1 className="font-bold text-2xl mb-7">
              Sign in to your account with your email and password{' '}
            </h1>

            <input
              type="email"
              placeholder="Enter your email..."
              required
              name="email"
              value={signInData.email}
              onChange={handleChange}
              className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
            />

            <input
              type="text"
              placeholder="Password..."
              name="password"
              value={signInData.password}
              onChange={handleChange}
              className="border-2 border-slate-600 p-2 rounded-lg outline-none focus:border-blue-500 my-2 sm:w-80"
            />

            <p className="text-red-500 font-bold"> {errorMessage} </p>

            <button
              onClick={handleSubmit}
              className="outline-none px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-5 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 sm:w-96 "
            >
              Sign in
            </button>
          </div>

          <h2>
            Don't have an account?
            <Link to={'/sign-up'}>
              <span className="text-blue-500 font-bold hover:underline">
                Sign up.
              </span>
            </Link>
          </h2>
        </div>
      )}
    </section>
  );
};

export default SignIn;
