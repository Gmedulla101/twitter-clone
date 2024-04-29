import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

//IMPORTING AUTHENTICATION DEPENDENCIES
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';

//IMPORTING FIREBASE FIRESTORE DEPENDENCIES
import { collection, getDocs, addDoc } from 'firebase/firestore';

const userCollectionRef = collection(db, 'users');

//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo';
import logo from '../images/twitter.png';

const CreateAccount = () => {
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    username: '',
    bio: '',
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
      await createUserWithEmailAndPassword(
        auth,
        signInData.email,
        signInData.password
      );
      setIsSignedIn(true);

      await addDoc(userCollectionRef, {
        bio: signInData.bio,
        email: signInData.email,
        username: signInData.username,
        userTweets: [],
      });
      setUser({
        bio: signInData.bio,
        email: signInData.email,
        username: signInData.username,
        userTweets: [],
      });
      console.log('Submitted!');
      console.log(user);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('Email already exists');
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
          Create your account with your email and password{' '}
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
          placeholder="Username..."
          required
          name="username"
          value={signInData.username}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="Enter your desired bio"
          required
          name="bio"
          value={signInData.bio}
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

        <h3> {errorMessage} </h3>

        <button
          onClick={handleSubmit}
          className="px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-5 w-ssm justify-center font-bold hover:bg-blue-600 active:bg-blue-700 sm:w-96 "
        >
          Create account
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
