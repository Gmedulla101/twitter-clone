import React, { useState, useEffect, useReducer } from 'react';
import toast from 'react-hot-toast';

//IMPORTING RELEVANT COMPONENTS
import Tweet from '../components/Tweet';
import SideBar from '../components/SideBar';
import cameraImg from '../images/camera.png';
import cancel from '../images/reject.png';
import SignInbar from '../components/SignInbar';
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING CUSTOM HOOKS
import { useGlobalContext } from '../context/context';

//IMPORTING FIREBASE DEPENDENCIES
import { storage } from '../config/firebase';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

//IMPORTING REDUCER ACTIONS
import {
  GET_TWEETS,
  SET_ERROR_TRUE,
  GET_TWEET_IMAGES,
  SET_POST_ERROR_TRUE,
  SET_POST_ERROR_FALSE,
  STOP_LOADING,
  GET_USER_TWEETS,
  START_LOADING,
} from '../modules/actions';

//IMPORTING REDUCER FUNCTION
import reducer from '../modules/reducer';

//REDUCER DEFAULT STATE OBJECT
const defaultState = {
  isLoading: true,
  isError: false,
  postError: false,
  tweets: null,
  userTweets: null,
  tweetImages: [],
};

import axios from 'axios';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const Home = () => {
  //ENSURING THAT THE LOG IN STATUS IS REGISTERED BY THE APP.
  useEffect(() => {
    getTweets();
    getUserTweets();
  }, []);

  //GLOBAL CONTEXT VARIABLES
  const { user, userToken } = useGlobalContext();

  //USEREDUCER HOOK UTILISATION
  const [reducerState, dispatch] = useReducer(reducer, defaultState);
  const { isLoading, isError, postError, tweets, userTweets, tweetImages } =
    reducerState;

  //FUNCTIONALTY FOR GETTING THE DEFAULT TWEETS FROM THE BACKEND
  const getTweets = async () => {
    try {
      const data = await axios.get(
        'https://twitter-backend-s1nc.onrender.com/api/v1/posts/get-posts'
      );

      dispatch({ type: GET_TWEETS, payload: { cleanData: data.data.data } });

      dispatch({ type: STOP_LOADING });
    } catch (error) {
      dispatch({ type: SET_ERROR_TRUE });
      console.error(error);
    }
  };

  //FUNCTIONALTY FOR GETTING THE USER TWEETS FROM THE BACKEND
  const getUserTweets = async () => {
    try {
      const data = await axios.get(
        'https://twitter-backend-s1nc.onrender.com/api/v1/posts/get-user-posts',
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      dispatch({
        type: GET_USER_TWEETS,
        payload: { userTweets: data.data.data },
      });
    } catch (error) {
      console.error(error);
    }
  };

  //SETTING THE TWEETS (USER AND DEFAULT) TO BE DISPLAYED
  const tweetsEl = tweets?.map((tweet) => {
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

  const userTweetsEl = userTweets?.map((userTweet) => {
    return (
      <Tweet
        poster={userTweet?.poster}
        post={userTweet?.post}
        key={userTweet?._id}
        id={userTweet._id}
        likes={userTweet.likes}
        comments={userTweet.comments}
        postImg={userTweet.postImg}
      />
    );
  });

  //ONCHANGE HANDLER FOR POST TEXT AREA
  const [textareaContent, setTextAreaContent] = useState('');

  const textChange = (e) => {
    setTextAreaContent(e.target.value);
  };

  //UNIQUE IDENTIFIER FOR EACH TWEET INSTANCE
  const tweetId = v4();

  //CREATE POST FUNCTIONALITY

  const createPost = async () => {
    //TACKLING EDGE CASES AND PROGRAMMATIC INCONSISTENCIES
    if (!user) {
      toast.error('Post cannot be made without signing in');

      return;
    } else {
      dispatch({ type: SET_POST_ERROR_FALSE });
    }
    if (textareaContent === '' && file === null) {
      toast.error('Post field is empty, please type in a post');
      return;
    }

    //MAIN FUNCTIONALITY
    if (file) {
      try {
        dispatch({ type: START_LOADING });
        const imageUrl = await uploadImage();

        const postObject = {
          post: textareaContent,
          poster: user,
          postImg: imageUrl,
          likes: 0,
          comments: [],
        };

        await axios.post(
          'https://twitter-backend-s1nc.onrender.com/api/v1/posts/create-post',
          postObject,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        setFile(null);
        setImageDislay(null);
        dispatch({ type: STOP_LOADING });
        toast.success('Post sent successfully!');
      } catch (error) {
        dispatch({ type: STOP_LOADING });
        toast.error("Couldn't send post");
        console.log(error);
      }
    } else {
      try {
        dispatch({ type: START_LOADING });
        const postObject = {
          post: textareaContent,
          poster: user,
          likes: 0,
          comments: [],
        };

        await axios.post(
          'https://twitter-backend-s1nc.onrender.com/api/v1/posts/create-post',
          postObject,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        dispatch({ type: STOP_LOADING });
        window.location.reload();
      } catch (error) {
        dispatch({ type: STOP_LOADING });
        console.log(error);
      }
    }

    setImage([]);
    setTextAreaContent('');
  };

  //ONCHANGE FOR IMAGE POST
  //STATE FOR THE IMAGE POST PREVIEW
  const [file, setFile] = useState(null);
  const [imageDisplay, setImageDislay] = useState(null);

  const imageChange = (event) => {
    /* REQUIRED VARIABLES */
    const MAX_RANDOM_NUMBER = 723947211;
    const POWER_INDEX = 8056;
    const file = event.target.files[0];

    /* FUNCTIONALITY */
    const displayImage = (fileImage) => {
      const imageUrl = URL.createObjectURL(fileImage);
      setImageDislay(imageUrl);
    };

    const generateRandomImageName = (imageName) => {
      const randomNumber = Math.floor(
        (Math.random() * MAX_RANDOM_NUMBER) ^ POWER_INDEX
      );
      const fileExtension = imageName.slice(imageName.lastIndexOf('.'));
      return `${randomNumber}${fileExtension}`;
    };

    const createNewFileWithNewName = (originalFile, newName) => {
      return new File([originalFile], newName, { type: originalFile.type });
    };

    /* APPLICATION OF FUNCTIONALITY */
    displayImage(file);
    const newFileName = generateRandomImageName(file.name);
    const newFile = createNewFileWithNewName(file, newFileName);
    setFile(newFile);
  };

  const removeImage = () => {
    setImageDislay(null);
  };

  //FUNCTIONALITY FOR IMAGE UPLOAD
  const uploadImage = async () => {
    if (file === null) {
      return;
    }

    const tweetImgRef = ref(
      storage,
      `tweetImages/${file.name + `___${tweetId}`}`
    );
    const snapShot = uploadBytes(tweetImgRef, file);
    const imageUrl = await getDownloadURL((await snapShot).ref);
    return imageUrl;
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
      <div
        id="home"
        className="main-scroll ml-12 border-2 border-slate-200 md:ml-64 bg-white"
      >
        <h1 className="text-2xl font-bold px-2 py-2 relative"> Home </h1>

        <div className="py-3 border-2 border-slate-200">
          <textarea
            placeholder={
              user ? `Whats happening ${user}!!!` : "What's happening people!!!"
            }
            name="post"
            value={textareaContent}
            onChange={textChange}
            className="main-content-textarea text-lg p-2 outline-none w-full resize-none"
          ></textarea>
          <span
            className="flex items-center justify-center gap-24
          "
          >
            <label htmlFor="postPic" className="cursor-pointer">
              <input
                type="file"
                id="postPic"
                name="postPic"
                onChange={imageChange}
                className="hidden"
              />
              <img src={cameraImg} alt="" className="w-12" />
            </label>
            {/* BUTTON TO CREATE POSTS */}
            <button
              onClick={createPost}
              className="px-16 py-3 bg-blue-500 text-white text-lg rounded-3xl flex w-12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-12"
            >
              Post
            </button>
          </span>

          {/* IMAGE DISPLAY */}
          {imageDisplay && (
            <div className="mt-6 flex items-center justify-center relative">
              <img src={imageDisplay} alt="" className="w-[87%] h-[20em]" />
              <button
                onClick={removeImage}
                className="absolute top-[80%] left-[78%] bg-slate-200 p-2 opacity-75 rounded-full text-xl h-12 w-12 grayscale"
              >
                <img src={cancel} alt="" />
              </button>
            </div>
          )}
        </div>

        <div>
          <p className="p-2 font-bold text-center text-red-500">
            {' '}
            {postError ? 'Post cannot be made without signing in' : ''}{' '}
          </p>
        </div>

        <div className="home-page-toggle flex  mb-4 justify-around">
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
            My tweets
          </button>
        </div>
        {homeState ? (
          <section className="tweets relative">
            {/* CONDITIONAL SIGN IN BAR */}
            {user ? '' : <SignInbar />}
            {isLoading ? (
              <div className="mt-12">
                <LoaderComponent />{' '}
              </div>
            ) : (
              tweetsEl
            )}
          </section>
        ) : (
          <section className="tweets">
            {/* CONDITIONAL SIGN IN BAR */}
            {user ? '' : <SignInbar />}
            {isLoading ? (
              <LoaderComponent />
            ) : userTweets.length !== 0 ? (
              userTweetsEl
            ) : (
              <p className="font-bold text-2xl text-center mt-20">
                No tweets to show right now
              </p>
            )}
          </section>
        )}
      </div>
    </>
  );
};

export default Home;
