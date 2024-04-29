import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

//IMPORTING AUTHENTICATION DEPENDENCIES
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';

//IMPORTING FIREBASE FIRESTORE DEPENDENCIES
import { doc, getDocs, collection } from 'firebase/firestore';
const userCollectionRef = collection(db, 'users');

//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo';
import logo from '../images/twitter.png';

const CreateAccount = () => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  //UTILISING GLOBAL CONTEXT CUSTOM HOOK
  const [isSignedIn, setIsSignedIn, user, setUser] = useGlobalContext();

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
      await signInWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );

      const data = await getDocs(userCollectionRef);
      const cleanData = data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const userData = cleanData.filter((data) => {
        return data.email === signInData.email;
      });
      setUser(userData);
      setIsSignedIn(true);
      console.log(userData);
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Invalid log in credentials');
        return;
      }
      console.error(error);
    }
    navigate('/');
  };

  return (
    <div className="w-[90%] mx-auto my-9 rounded-lg sm:shadow-3xl sm:pt-2 sm:pb-4 lg:w-[80%] lg:py-9">
      <Logo logo={logo} />
      <div className=" flex flex-col w-10/12 mx-auto py-3 items-center">
        <h1 className="font-bold text-2xl mb-7">
          {' '}
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
          className="px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-5 w-ssm justify-center font-bold hover:bg-blue-600 active:bg-blue-700 sm:w-96 "
        >
          Sign in
        </button>
      </div>

      <h2>
        {' '}
        Don't have an account?{' '}
        <Link to={'/sign-up'}>
          {' '}
          <span className="text-blue-500 font-bold hover:underline">
            {' '}
            Sign up.{' '}
          </span>{' '}
        </Link>{' '}
      </h2>
    </div>
  );
};

export default CreateAccount;
