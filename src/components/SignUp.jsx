import Logo from './Logo';
import React from 'react';

//IMPORTING IMAGE ASSETS
import logo from '../images/twitter.png';
import googleLogo from '../images/google.png';
import appleLogo from '../images/apple-logo.png';

//IMPORTING AUTH PARAMETERS
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

//IMPORTING FIREBASE FIRESTORE DEPENDENCIES
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

//IMPORTING ROUTER DEPENDENCIES
import { Link, useNavigate } from 'react-router-dom';

//IMPORTING CUSTOM HOOKS
import { useGlobalContext } from '../context';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser, isSignedIn, setIsSignedIn } = useGlobalContext();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const { email, photoURL, displayName, uid } = auth.currentUser;

      const userCollectionRef = collection(db, 'users');

      //ADDING THE NEWLY CREATED USER TO THE USER LIST
      await addDoc(userCollectionRef, {
        email: email,
        username: displayName,
        userTweets: [],
      });
      setUser({
        email: email,
        username: displayName,
        userTweets: [],
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-10 lg:flex justify-between items-center xl:px-20 2xl:px-40">
        <img src={logo} alt="X logo" className="w-10 lg:w-72" />

        <div>
          <h2 className="font-bold text-6xl my-12">Happening now</h2>
          <h4 className="font-bold text-3xl">Join today.</h4>

          <Link to={'/create-account'}>
            <button className="px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-16 mb-5 w-ssm justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-10/12">
              Create an account{' '}
            </button>{' '}
          </Link>

          <p className="text-center"> or </p>

          <button className="flex items-center justify-center mx-auto px-12 py-2 w-ssm mb-5 mt-5 border-slate-300 border-2 rounded-3xl hover:bg-slate-200 active:bg-slate-300 gap-3 lg:w-10/12 opacity-50">
            Sign up with Google
            <img src={googleLogo} alt="google image" className="w-4" />
          </button>

          <button className="flex items-center justify-center mx-auto px-12 py-2 w-ssm mt-5 mb-5 bsorder-slate-300 border-2 rounded-3xl hover:bg-slate-200 active:bg-slate-300 gap-3 lg:w-10/12 opacity-50">
            <img src={appleLogo} alt="Apple logo" className="w-5" /> Sign up
            with Apple
          </button>

          <h4 className="my-10 font-bold"> Already have an account? </h4>
          <Link to={'/sign-in'}>
            <button className="flex justify-around mx-auto px-16 py-2 w-ssm mt-3 mb-5 border-slate-300 border-2 rounded-3xl text-blue-500 font-bold hover:bg-slate-200 active:bg-slate-300 lg:w-10/12">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
