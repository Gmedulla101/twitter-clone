//IMPORTING REQUIRED FIREBASE DEPENDENCIES
import { getDocs, collection } from 'firebase/firestore';
import { listAll, getDownloadURL } from 'firebase/storage';

//IMPORTING REDUCER ACTIONS
import {
  GET_TWEETS,
  SET_ERROR_TRUE,
  GET_TWEET_IMAGES,
  STOP_LOADING,
  GET_USER_TWEETS,
} from '../modules/actions';

//IMPORTING REDUCER
import reducer from './reducer';

//FUNCTIONALTY FOR GETTING THE DEFAULT TWEETS FROM THE BACKEND
const getTweets = async () => {
  const tweetCollectionRef = collection(db, 'tweets');
  try {
    const tweetsData = await getDocs(tweetCollectionRef);

    const cleanData = tweetsData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc._document.data.value.mapValue.fields.id.stringValue,
      };
    });
    dispatch({ type: GET_TWEETS, payload: { cleanData } });

    dispatch({ type: STOP_LOADING });
  } catch (error) {
    dispatch({ type: SET_ERROR_TRUE });
    console.error(error);
  }
};

//FUNCTIONALTY FOR GETTING THE USER TWEETS FROM THE BACKEND
const getUserTweets = async () => {
  const userTweetCollectionRef = collection(db, 'users');

  try {
    const userTweetsData = await getDocs(userTweetCollectionRef);
    const cleanData = userTweetsData.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const userInfo = cleanData.filter((data) => {
      return data.username === user?.username;
    });
    dispatch({ type: GET_USER_TWEETS, payload: { userInfo } });
  } catch (error) {
    console.error(error);
  }
};

//FUNCTIONALITY TO GET TWEET IMAGES
const getTweetImages = async () => {
  const tweetImageRef = ref(storage, 'tweetImages/');

  listAll(tweetImageRef).then((response) => {
    response.items.forEach((item) => {
      getDownloadURL(item).then((url) => {
        dispatch({ type: GET_TWEET_IMAGES, payload: { url } });
      });
    });
  });
};
