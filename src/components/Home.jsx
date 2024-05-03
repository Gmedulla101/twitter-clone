import React, { useState, useEffect } from 'react';

//IMPORTING ROUTING DEPENDENCIES
import { useNavigate, Link } from 'react-router-dom';
//IMPORTING RELEVANT COMPONENTS
import Tweet from './Tweet';
import SideBar from './SideBar';

//IMPORTING CUSTOM HOOKS
import { useGlobalContext } from '../context';

//IMPORTING FIREBASE DEPENDENCIES
import {
  getDocs,
  addDoc,
  collection,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { data } from 'autoprefixer';

/* COMPONENT START */
const Home = () => {
  const [isSignedIn, setIsSignedIn, user] = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [tweets, setTweets] = useState(null);
  const [userTweets, setUserTweets] = useState(null);
  const [postError, setPostError] = useState(isSignedIn);

  const tweetCollectionRef = collection(db, 'tweets');
  const userTweetCollectionRef = collection(db, 'users');
  const navigate = useNavigate();

  //FUNCTIONALTY FOR GETTING THE DEFAULT TWEETS FROM THE BACKEND
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

  const getUserTweets = async () => {
    try {
      const userTweetsData = await getDocs(userTweetCollectionRef);
      const cleanData = userTweetsData.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      const userInfo = cleanData.filter((data) => {
        return data.username === user?.username;
      });
      setUserTweets(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTweets();
    getUserTweets();
  }, []);

  //SETTING THE TWEETS TO BE DISPLAYED
  const tweetsEl = tweets?.map((tweet) => {
    return <Tweet poster={tweet.poster} post={tweet.post} key={tweet.id} />;
  });
  const userTweetsEl = userTweets?.[0]?.userTweets?.map((userTweet, i) => {
    return (
      <Tweet
        poster={userTweet?.poster}
        post={userTweet?.post}
        key={userTweet[i]}
      />
    );
  });

  //ONCHANGE HANDLER FOR POST TEXT AREA
  const [textareaContent, setTextAreaContent] = useState('');
  const textChange = (e) => {
    setTextAreaContent(e.target.value);
  };

  //CREATE POST FUNCTIONALITY
  const createPost = async () => {
    if (!user) {
      setPostError(true);
      return;
    } else {
      setPostError(false);
    }
    if (textareaContent === '') {
      alert('Post field is empty, please type in a post');
      return;
    }
    if (!auth.currentUser) {
      setPostError(true);
      return;
    }
    try {
      await addDoc(tweetCollectionRef, {
        post: textareaContent,
        poster: user?.username ? user?.username : 'Anonymous',
      });
      getTweets();
      setTextAreaContent('');

      if (user) {
        const newUserTweetArray = [
          ...user.userTweets,
          { post: textareaContent, poster: user.username },
        ];
        const userTweetDoc = doc(db, 'users', user.id);
        await updateDoc(userTweetDoc, { userTweets: newUserTweetArray });
        getUserTweets();
      }

      console.log('Submitted');
    } catch (error) {
      /*  if (error.code === 'permission-denied') {
        setPostError(true);
       setTimeout(navigate('/sign-up'), 10000);
      } */
      console.error(error);
    }
  };

  //FUNCTIONALITY FOR HOME PAGE STATE
  const [homeState, setHomeState] = useState(true);

  const toggleToTweets = () => {
    setHomeState(true);
  };
  const toggleToMyTweets = () => {
    setHomeState(false);
  };

  /* COMPONENT BODY */
  return (
    <>
      {/* SIDE BAR */}
      <SideBar />

      {/* MAIN BODY SECTION */}
      <div className="main-scroll ml-20 border-2 border-slate-200">
        <h1 className="text-2xl font-bold px-2 py-2"> Home </h1>

        <div className="py-3 border-2 border-slate-200">
          <textarea
            placeholder={
              user?.username
                ? `Whats happening ${user?.username}!!!`
                : "What's happening people!!!"
            }
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

        <div>
          <p className="p-2 font-bold text-center text-red-500">
            {' '}
            {postError ? 'Post cannot be made without signing in' : ''}{' '}
          </p>
        </div>

        <div className="home-page-toggle flex justify-around">
          <button
            onClick={toggleToTweets}
            className="text-blue-500 font-bold text-lg hover:underline"
            style={
              homeState
                ? { textDecoration: 'underline' }
                : { textDecoration: 'none' }
            }
          >
            Tweets
          </button>

          <button
            onClick={toggleToMyTweets}
            className="text-blue-500 font-bold text-lg hover:underline"
            style={
              !homeState
                ? { textDecoration: 'underline' }
                : { textDecoration: 'none' }
            }
          >
            {' '}
            My tweets{' '}
          </button>
        </div>
        {homeState ? (
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
        ) : (
          <section>
            {isLoading ? (
              <h2 className="text-center font-bold text-xl my-10">
                {' '}
                Loading...{' '}
              </h2>
            ) : userTweetsEl ? (
              userTweetsEl
            ) : (
              <p className="font-bold text-2xl text-center mt-20">
                {' '}
                No tweets to show right now{' '}
              </p>
            )}
          </section>
        )}
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
