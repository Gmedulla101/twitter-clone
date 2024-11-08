import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//IMPORTING IMAGE ASSETS
import commentBtn from '../images/chat.png';
import likeBtn from '../images/like.png';

//IMPORTING HELPER MODULES
import { useGlobalContext } from '../context/context';
import toast from 'react-hot-toast';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const Tweet = ({ poster, post, postImg, id, comments, likes }) => {
  const { user, isSignedIn } = useGlobalContext();
  const userId = JSON.parse(localStorage.getItem('userId'));
  const navigate = useNavigate();

  //TWEET COMMENT LOGIC
  const createComment = () => {
    //ADDING EDGE CASES
    if (!user) {
      alert('Please login or sign up to use our core functionality');
      return;
    }
    navigate(`/comment/${id}`);
  };

  const like = async () => {
    try {
      if (!isSignedIn) {
        toast.error('You must be logged in to use core functionality');
      }
      const res = await axios.patch(
        `http://localhost:5000/api/v1/posts/like/${id}?likedUser=${userId}`
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <article className="border-2 border-slate-200 p-3">
      <Link to={`/user-profile/${poster}`}>
        {' '}
        <h2 className="poster font-bold"> {poster} </h2>{' '}
      </Link>

      <p className="mb-4">{post}</p>
      {postImg?.length > 0 ? (
        <div className="h-96 w-full rounded-xl overflow-hidden md:h-96 md:w-[60%] md:mx-auto">
          <img src={postImg[0]} alt="" className="w-full h-full" />
        </div>
      ) : (
        ''
      )}
      <div className=" w-full flex justify-around p-2">
        <button
          onClick={createComment}
          className="w-1/3 flex justify-center gap-1 hover:bg-gray-200 active:bg-gray-300 rounded-full"
        >
          <img src={commentBtn} alt="" className="w-10" />
          <p className="text-xl relative top-1">{comments?.length}</p>
        </button>

        <button
          onClick={like}
          className="w-1/3 flex justify-center items-center gap-1 hover:bg-gray-200 active:bg-gray-300 rounded-full"
        >
          <img src={likeBtn} alt="" className="w-8" />
          <p className="text-xl relative -top-[2px]">{likes}</p>
        </button>
      </div>
    </article>
  );
};

export default Tweet;
