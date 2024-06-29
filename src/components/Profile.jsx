import React, { useState, useEffect } from 'react';

//IMPORTING RELEVANT COMPONENTS
import SideBar from './SideBar';
import cover from '../images/cover.jpg';
import userPhoto from '../images/user.png';

//IMPORTING FIREBASE DEPENDENCIES
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

//IMPORTING ROUTING DEPENDENCIES
import { Link, useNavigate } from 'react-router-dom';

//IMPORTING GLOBAL CONTEXT
import { useGlobalContext } from '../context';

const Profile = () => {
  const { isSignedIn, setIsSignedIn, user, setUser } = useGlobalContext();

  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  const navigate = useNavigate();

  const [isEditingCoverPhoto, setIsEditingCoverPhoto] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      setIsSignedIn(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const editCoverPhoto = () => {
    setIsEditingCoverPhoto(true);
  };

  const saveCoverPhoto = () => {
    setIsEditingCoverPhoto(false);
  };

  const editProfile = () => {
    console.log('Editing profile');
  };

  return (
    <>
      <SideBar />
      {!user ? (
        <h1 className="ml-12 text-center font-bold text-2xl pt-24">
          No user is Logged in. You can
          <Link to={'/sign-in'} className="text-blue-500 hover:underline">
            Sign in
          </Link>
          or
          <Link to={'/sign-up'} className="text-blue-500 hover:underline">
            Sign up
          </Link>
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

            {/* MAIN PROFILE BODY */}
            <div
              className="h-60 bg-slate-200 flex justify-center items-center gap-4 text-2xl font-bold relative"
              onClick={editCoverPhoto}
            >
              <img src={cover} alt="" className="w-full h-full" />
            </div>

            <div className="bg-white border-4 border-blue-400 w-20 h-20 p-1 rounded-full relative top-[-40px] ml-6 overflow-hidden">
              <img src={userPhoto} alt="" className="rounded-full" />
            </div>
            {isEditingCoverPhoto ? (
              <span
                className="absolute top-[32.7%] right-10 text-base px-6 py-2 bg-blue-500 rounded-3xl text-white cursor-pointer"
                onClick={saveCoverPhoto}
              >
                Save
              </span>
            ) : (
              ''
            )}
          </section>

          <section className="ml-3">
            <h4 className="font-bold text-2xl ">
              {user?.firstName} {user?.lastName} {user?.otherNames}
            </h4>
            <p className="text-slate-500"> @{user?.username} </p>
            <p className="mt-2"> {user?.bio} </p>
          </section>
          <Link to={'/edit-profile'}>
            <button
              className="ml-3 mt-3  px-6 py-2 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white font-bold"
              onClick={editProfile}
            >
              Edit profile
            </button>
          </Link>
        </section>
      )}
    </>
  );
};

export default Profile;
