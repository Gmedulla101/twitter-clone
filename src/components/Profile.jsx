import React from 'react';

//IMPORTING RELEVANT COMPONENTS
import SideBar from './SideBar';
import cover from '../images/cover.jpg';
import userPhoto from '../images/user1.jpg';

//IMPORTING FIREBASE DEPENDENCIES
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

//IMPORTING ROUTING DEPENDENCIES
import { Link, useNavigate } from 'react-router-dom';

//IMPORTING GLOBAL CONTEXT
import { useGlobalContext } from '../context';

const Profile = () => {
  const [isSignedIn, setIsSignedIn, user, setUser] = useGlobalContext();
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsSignedIn(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SideBar />
      {!auth.currentUser ? (
        <h1 className="ml-12 text-center font-bold text-2xl pt-24">
          {' '}
          No user is Logged in. You can{' '}
          <Link to={'/sign-in'} className="text-blue-500 hover:underline">
            {' '}
            Sign in{' '}
          </Link>{' '}
          or{' '}
          <Link to={'/sign-up'} className="text-blue-500 hover:underline">
            {' '}
            Sign up{' '}
          </Link>{' '}
        </h1>
      ) : (
        <section className="ml-12">
          <section className=" h-full">
            <span className="flex justify-between p-2">
              <h1 className="text-2xl font-bold px-2 py-2"> Profile </h1>
              <button
                onClick={logOut}
                className="bg-blue-500 px-8 py-2 rounded-full text-white text-lg font-bold hover:bg-blue-600 active:bg-blue-900"
              >
                Log out
              </button>
            </span>
            <div className="h-60">
              <img src={cover} alt="" className="w-full h-full" />
            </div>
            <div className="border-4 border-blue-400 w-20 h-20 p-1 rounded-full relative top-[-40px] ml-6 overflow-hidden">
              <img src={userPhoto} alt="" className="rounded-full" />
            </div>
          </section>

          <section className="ml-3">
            <h4 className="font-bold text-2xl ">
              {setUser.firstName} {user.lastName} {user.otherNames}
            </h4>
            <p className="text-slate-500"> @{user.username} </p>
            <p className="mt-2"> {user.bio} </p>
          </section>
        </section>
      )}
    </>
  );
};

export default Profile;
