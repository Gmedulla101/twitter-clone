import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useGlobalContext } from '../context';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY
const Comment = ({ comments, setCommentOpen, tweetId, id }) => {
  const { user } = useGlobalContext();

  const [commentText, setCommentText] = useState('');
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };

  const navigate = useNavigate();
  const sendComment = async () => {
    try {
      const newCommentArray = [
        ...comments,
        {
          post: commentText,
          poster: user.username,
        },
      ];

      const commentDoc = doc(db, 'tweets', tweetId);
      await updateDoc(commentDoc, { comments: newCommentArray });

      const userCommentDoc = doc(db, 'users', user.id);
      const { userTweets, userName } = user;

      const newUserTweets = userTweets.map((userTweet) => {
        if (userTweet.id === id) {
          return {
            ...userTweet,
            comments: [
              ...userTweet.comments,
              {
                post: commentText,
                poster: userName,
              },
            ],
          };
        } else {
          return userTweet;
        }
      });

      await updateDoc(userCommentDoc, { userTweets: newUserTweets });
      setCommentText('');
      setCommentOpen(false);
      console.log('Comment submitted!!');
      navigate(0);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const commentEl = comments?.map((comment, i) => {
    return (
      <article className="border-2 border-slate-200 p-3" key={i}>
        <h2 className="poster font-bold">{comment?.poster}</h2>
        <p className="mb-4">{comment?.post}</p>
      </article>
    );
  });

  return (
    <div className="py-2 bg-white fixed w-full h-full top-0">
      <div>
        <button
          onClick={() => {
            setCommentOpen(false);
          }}
          className="px-16 py-3 ml-2 bg-blue-500 text-white text-lg rounded-3xl flex w-12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-12"
        >
          Back
        </button>
      </div>
      {/* TEXT AREA FOR ADDING A NEW COMMENT */}
      <section className="mb-12 shadow">
        <textarea
          value={commentText}
          onChange={handleChange}
          className=" h-36 text-lg p-2 outline-none w-full resize-none"
        ></textarea>
        <button
          onClick={sendComment}
          className="px-16 py-3 bg-blue-500 text-white text-lg rounded-3xl flex w-12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-12"
        >
          Reply
        </button>
      </section>

      {/* THE COMMENTS */}
      <section>{commentEl}</section>
    </div>
  );
};

export default Comment;
