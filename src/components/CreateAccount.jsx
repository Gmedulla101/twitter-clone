import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

//IMPORTING AUTHENTICATION DEPENDENCIES
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../config/firebase';

//IMPORTING FIREBASE FIRESTORE DEPENDENCIES
import { collection, getDocs, addDoc } from 'firebase/firestore';

//IMPORTING FIREBASE STORAGE DEPENDENCIES
import { storage } from '../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo';
import logo from '../images/twitter.png';
import defaultAvatar from '../images/user.png';

const CreateAccount = () => {
  const userRef = v4();

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    otherNames: '',
    bio: '',
    userRef: userRef,
  });

  //UTILISING GLOBAL CONTEXT CUSTOM HOOK
  const { isSignedIn, setIsSignedIn, user, setUser } = useGlobalContext();

  //UTILISIING USENAVIGATE HOOK
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, type, value, files } = event.target;
    setSignUpData((prevData) => {
      return {
        ...prevData,
        [name]: type == 'file' ? files[0] : value,
      };
    });
  };

  const [errorMessage, setErrorMessage] = useState('');

  /* LOGIC FOR PROFILE CREATION */
  const handleSubmit = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        signUpData.email,
        signUpData.password
      );
      setIsSignedIn(true);

      const userCollectionRef = collection(db, 'users');

      await addDoc(userCollectionRef, {
        bio: signUpData.bio,
        email: signUpData.email,
        username: signUpData.username,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        otherNames: signUpData.otherNames,
        userTweets: [],
      });

      setUser({
        bio: signUpData.bio,
        email: signUpData.email,
        username: signUpData.username,
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        otherNames: signUpData.otherNames,
        userTweets: [],
      });
      console.log('Submitted!');
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
          value={signUpData.email}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="First name"
          required
          name="firstName"
          value={signUpData.firstName}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="Lastname"
          required
          name="lastName"
          value={signUpData.lastName}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="other names"
          name="otherNames"
          value={signUpData.otherNames}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="Username..."
          required
          name="username"
          value={signUpData.username}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="Enter your desired bio"
          required
          name="bio"
          value={signUpData.bio}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none my-2 focus:border-blue-500 sm:w-80"
        />

        <input
          type="text"
          placeholder="Password..."
          name="password"
          value={signUpData.password}
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
