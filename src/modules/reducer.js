//IMPORTING REDUCER ACTIONS
import {
  GET_TWEETS,
  SET_ERROR_TRUE,
  GET_TWEET_IMAGES,
  SET_POST_ERROR_TRUE,
  SET_POST_ERROR_FALSE,
  STOP_LOADING,
  START_LOADING,
  GET_USER_TWEETS,
} from '../modules/actions';

//MAIN FUNCTION BODY
const reducer = (state, action) => {
  if (action.type === GET_TWEETS) {
    return { ...state, tweets: action.payload.cleanData };
  }
  if (action.type === STOP_LOADING) {
    return { ...state, isLoading: false };
  }
  if (action.type === START_LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_USER_TWEETS) {
    return { ...state, userTweets: action.payload.userInfo };
  }
  if (action.type === SET_ERROR_TRUE) {
    return { ...state, isError: true };
  }
  if (action.type === GET_TWEET_IMAGES) {
    return {
      ...state,
      tweetImages: [...state.tweetImages, action.payload.url],
    };
  }
  if (action.type === SET_POST_ERROR_TRUE) {
    return { ...state, postError: true };
  }
  if (action.type === SET_POST_ERROR_FALSE) {
    return { ...state, postError: false };
  }
};

export default reducer;
