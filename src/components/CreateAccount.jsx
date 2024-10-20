import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

//IMPORTING DEPS
import axios from 'axios';

//IMPORTING RELEVANT COMPONENTS
import Logo from './Logo';
import logo from '../images/twitter.png';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const CreateAccount = () => {
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    username: '',
    firstName: '',
    lastName: '',
    otherNames: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  console.log(signUpData);

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

  /* LOGIC FOR PROFILE CREATION */
  const handleSubmit = async () => {
    try {
      const data = await axios.post(
        'https://twitter-backend-s1nc.onrender.com/api/v1/auth/register',
        signUpData
      );
      console.log(data);
      setIsSignedIn(true);
      localStorage.setItem('userToken', JSON.stringify(data.data.token));
      localStorage.setItem('username', JSON.stringify(data.data.username));
      navigate('/');
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.msg);
    }
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
          placeholder="Password..."
          name="password"
          value={signUpData.password}
          onChange={handleChange}
          className="border-2 border-slate-600 p-2 rounded-lg outline-none focus:border-blue-500 my-2 sm:w-80"
        />

        <h3 className="text-red-600 font-semibold w-full"> {errorMessage} </h3>

        <button
          onClick={handleSubmit}
          className="px-16 py-3 bg-blue-500 text-white rounded-3xl flex mx-auto mt-5 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 sm:w-96 "
        >
          Create account
        </button>
      </div>
    </div>
  );
};

export default CreateAccount;
