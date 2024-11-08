import React, { useState, useEffect } from 'react';
import axios from 'axios';

//IMPORTING RELEVANT COMPONENTS
import SideBar from '../components/SideBar';
import LoaderComponent from '../components/LoaderComponent';
import Tweet from '../components/Tweet';

//IMPORTING ROUTING DEPENDENCIES
import { Link, useNavigate } from 'react-router-dom';

//IMPORTING GLOBAL CONTEXT
import { useGlobalContext } from '../context/context';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const Profile = () => {
  const { user, userToken } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [isEditingCoverPhoto, setIsEditingCoverPhoto] = useState(false);

  //GETTING USER DATA
  const [profileData, setProfileData] = useState();
  const [userTweets, setUserTweets] = useState();
  useEffect(() => {
    {
      const getUserData = async () => {
        try {
          setIsLoading(true);
          const userData = await axios.get(
            `https://twitter-backend-s1nc.onrender.com/api/v1/users/getUser/${user}`
          );

          const tweetsData = await axios.get(
            'https://twitter-backend-s1nc.onrender.com/api/v1/posts/get-user-posts',
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          setProfileData(userData.data.data[0]);
          setUserTweets(tweetsData?.data.data);

          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };

      getUserData();
    }
  }, []);

  const tweetsEl = userTweets?.map((tweet) => {
    return (
      <Tweet
        poster={tweet.poster}
        post={tweet.post}
        key={tweet._id}
        id={tweet._id}
        docId={tweet.docId}
        likes={tweet.likes}
        comments={tweet.comments}
        postImg={tweet.postImg}
      />
    );
  });

  console.log(profileData);
  console.log(userTweets);

  const logOut = async () => {
    setIsLoading(true);
    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    navigate('/');
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
    <section>
      {isLoading ? (
        <div className="my-24">
          <LoaderComponent />
        </div>
      ) : (
        <>
          {' '}
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
            <section className="ml-12 mb-12 bg-white md:ml-64">
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
                  <img
                    src={profileData?.coverImage}
                    alt=""
                    className="w-full h-full"
                  />
                </div>

                <div className="bg-white border-4 border-blue-400 w-20 h-20 p-1 rounded-full relative top-[-40px] ml-6 overflow-hidden">
                  <img
                    src={profileData?.profileImage}
                    alt=""
                    className="rounded-full"
                  />
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
                  {profileData?.firstName} {profileData?.lastName}{' '}
                  {profileData?.otherNames}
                </h4>
                <p className="text-slate-500"> @{profileData?.username} </p>
                <p className="mt-2"> {profileData?.bio} </p>
                <div className="flex gap-2">
                  <p className="font-semibold">
                    {profileData?.followers.length} followers
                  </p>
                  <p className="font-semibold">
                    {profileData?.following.length} following
                  </p>
                </div>
              </section>
              <Link to={'/edit-profile'}>
                <button
                  className="ml-3 mt-3  px-6 py-2 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white font-bold"
                  onClick={editProfile}
                >
                  Edit profile
                </button>
              </Link>

              <section className="mt-10">
                <h1 className="text-xl text-center font-bold mb-3 text-blue-500">
                  {' '}
                  Your Tweets{' '}
                </h1>
                <div>{tweetsEl}</div>
              </section>
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default Profile;
