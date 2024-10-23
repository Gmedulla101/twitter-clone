import React, { useState } from 'react';
import { createPortal } from 'react-dom';

//IMPORTING HELPER COMPONENTS
import Comment from './Comment';
import SignIn from './SignIn';

//IMPORTING IMAGE ASSETS
import commentBtn from '../images/chat.png';
import likeBtn from '../images/like.png';

//IMPORTING HELPER MODULES
import { useGlobalContext } from '../context';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY

const Tweet = ({ poster, post, postImg, id, comments, likes, docId }) => {
  const { user } = useGlobalContext();

  const [commentOpen, setCommentOpen] = useState(false);

  //TWEET COMMENT LOGIC
  const createComment = () => {
    //ADDING EDGE CASES
    if (!user) {
      alert('Please login or sign up to use core functionality');
      return;
    }
    setCommentOpen(true);
  };

  return (
    <article className="border-2 border-slate-200 p-3">
      <h2 className="poster font-bold"> {poster} </h2>
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

        <button className="w-1/3 flex justify-center items-center gap-1 hover:bg-gray-200 active:bg-gray-300 rounded-full">
          <img src={likeBtn} alt="" className="w-8" />
          <p className="text-xl relative -top-[2px]">{likes}</p>
        </button>
      </div>

      <div>
        {commentOpen &&
          createPortal(
            <Comment
              comments={comments}
              setCommentOpen={setCommentOpen}
              tweetId={docId}
              id={id}
            />,
            document.querySelector('#home')
          )}
      </div>
    </article>
  );
};

export default Tweet;
