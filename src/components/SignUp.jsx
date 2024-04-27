import React from 'react';
import logo from '../images/twitter.png';
import googleLogo from '../images/google.png';
import appleLogo from '../images/apple-logo.png';
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

const SignUp = () => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-10">
        <img src={logo} alt="X logo" className="w-16" />
        <h2 className="font-bold text-7xl my-12"> Happening now </h2>
        <h4 className="font-bold text-3xl"> Join today. </h4>

        <button
          onClick={signInWithGoogle}
          className="flex justify-around mx-auto px-16 py-2 w-10/12 mt-16 mb-5 border-slate-300 border-2 rounded-3xl hover:bg-slate-200 active:bg-slate-300"
        >
          Sign up with Google
          <img src={googleLogo} alt="google image" className="w-7" />
        </button>

        <button className="flex justify-around mx-auto px-16 py-2 w-10/12 mt-5 mb-5 border-slate-300 border-2 rounded-3xl hover:bg-slate-200 active:bg-slate-300">
          <img src={appleLogo} alt="Apple logo" className="w-7" /> Sign up with
          Apple
        </button>
        <p className="text-center"> or </p>

        <button className="px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-5 w-10/12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700">
          Create an account{' '}
        </button>

        <h4 className="my-10 font-bold"> Already have an account? </h4>
        <button className="flex justify-around mx-auto px-16 py-2 w-10/12 mt-3 mb-5 border-slate-300 border-2 rounded-3xl text-blue-500 font-bold hover:bg-slate-200 active:bg-slate-300">
          {' '}
          Sign in{' '}
        </button>
      </div>
    </>
  );
};

export default SignUp;
