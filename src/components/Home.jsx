import React, { useState, useEffect } from 'react';
//IMPORTING RELEVANT COMPONENTS
import Tweet from './Tweet';

//IMPORTING ASSETS
import Logo from './Logo';
import logo from '../images/twitter.png';
import homeBtn from '../images/home.png';
import searchBtn from '../images/search.png';
import notiBtn from '../images/bell.png';
import profileBtn from '../images/user.png';
import newTweetBtn from '../images/feather.png';

//IMPORTING CUSTOM HOOKS
import { useGlobalContext } from '../context';

//IMPORTING ROUTING DEPENDENCIES
import { Link } from 'react-router-dom';

//IMPORTING FIREBASE DEPENDENCIES
import { getDocs, addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

/* COMPONENT START */
const Home = () => {
  const [isSignedIn, setIsSignedIn] = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tweets, setTweets] = useState(null);

  const tweetCollectionRef = collection(db, 'tweets');

  const getTweets = async () => {
    try {
      const tweetsData = await getDocs(tweetCollectionRef);
      const cleanData = tweetsData.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setTweets(cleanData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getTweets();
  }, []);

  const tweetsEl = tweets?.map((tweet) => {
    return <Tweet poster={tweet.poster} post={tweet.post} key={tweet.id} />;
  });

  //ONCHANGE HANDLER FOR POST TEXT AREA
  const [textareaContent, setTextAreaContent] = useState('');
  const textChange = (e) => {
    setTextAreaContent(e.target.value);
  };

  const createPost = async () => {
    try {
      await addDoc(tweetCollectionRef, {
        post: textareaContent,
        poster: 'Still the man',
      });
      getTweets();
      setTextAreaContent('');
    } catch (error) {
      console.error(error);
    }
  };

  /* COMPONENT BODY */
  return (
    <>
      {/* SIDE BAR */}
      <aside className="border-2 border-slate-200 w-20 h-full fixed flex flex-col items-center">
        <Logo logo={logo} />
        <div className="flex flex-col gap-12 items-center">
          <img
            src={homeBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
          <img
            src={searchBtn}
            alt=""
            className="w-12 cursor-pointer p-1 rounded-full hover:bg-blue-500"
          />
          <img
            src={notiBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
          <img
            src={profileBtn}
            alt=""
            className="w-12 cursor-pointer p-2 rounded-full hover:bg-blue-500"
          />
          <img
            src={newTweetBtn}
            alt=""
            className="w-14 cursor-pointer p-2 rounded-full bg-blue-500 "
          />
        </div>
      </aside>

      <div className="main-scroll ml-20 border-2 border-slate-200">
        <h1 className="text-2xl font-bold px-2 py-2"> Home </h1>

        <div className="py-3 border-2 border-slate-200">
          <textarea
            placeholder="What's happenning..."
            name="post"
            value={textareaContent}
            onChange={textChange}
            className="main-content-textarea text-lg p-2 outline-none w-full resize-none"
          ></textarea>
          <button
            onClick={createPost}
            className="px-16 py-3 bg-blue-500 text-white text-lg rounded-3xl flex mx-auto mt-5 w-12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-12"
          >
            Post
          </button>
        </div>

        <section className="tweets mt-7">
          {isLoading ? (
            <h2 className="text-center font-bold text-xl my-10">
              {' '}
              Loading...{' '}
            </h2>
          ) : (
            tweetsEl
          )}
        </section>
      </div>

      {/* CONDITIONAL SIGN IN BAR */}
      {isSignedIn || (
        <div className="signInBar h-18 bg-blue-500 fixed w-full top-[90%] text-white flex justify-between items-center px-6">
          <div className="ssm: hidden sm:block">
            <h3 className="font-bold"> Don't miss what's happening </h3>
            <p> The people on X are the first to know </p>
          </div>

          <div className="flex justify-around p-4 ssm: w-full sm:w-1/3 sm:gap-2 xl:w-1/4">
            <Link to={'/sign-in'}>
              {' '}
              <button className="border-[1px] border-white rounded-3xl font-bold px-4 py-2 w-32 hover:bg-white hover:text-blue-500">
                {' '}
                Sign In{' '}
              </button>{' '}
            </Link>
            <Link to={'/sign-up'}>
              {' '}
              <button className="bg-white text-black rounded-3xl px-4 py-2 font-bold hover:text-blue-500 w-32">
                {' '}
                Sign Up{' '}
              </button>{' '}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
