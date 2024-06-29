import React from 'react';

//IMPORTING REACT ROUTER DOM DEPENDENCIES
import { Link } from 'react-router-dom';

//IMPORTING IMAGE ASSETS
import commentBtn from '../images/chat.png';
import likeBtn from '../images/like.png';

const Tweet = ({ poster, post, tweetImages, id, comments, likes }) => {
  const tweetImagesId = tweetImages?.map((tweetImage, i) => {
    return {
      imageUrl: tweetImage,
      imageId: tweetImage.slice(
        tweetImage.lastIndexOf('_') + 1,
        tweetImage.lastIndexOf('?')
      ),
    };
  });
  const particularImage = tweetImagesId.filter((tweetImageId) => {
    return tweetImageId.imageId === id;
  });

  return (
    <article className="border-2 border-slate-200 p-3 shadow-lg">
      <h2 className="poster font-bold"> {poster} </h2>
      <p className="mb-4">{post}</p>
      {particularImage.length != 0 ? (
        <div className="h-72 w-full rounded-xl overflow-hidden">
          <img
            src={particularImage[0]?.imageUrl}
            alt=""
            className="w-full h-full"
          />
        </div>
      ) : (
        ''
      )}
      <div className=" w-full flex justify-around p-2">
        <Link
          to={'/comments'}
          className="w-1/3 flex justify-center items-center hover:bg-gray-200 active:bg-gray-300 rounded-full"
        >
          <button className="flex gap-1">
            <img src={commentBtn} alt="" className="w-10" />
            <p className="text-xl relative top-1">{comments.length}</p>
          </button>
        </Link>
        <Link
          to={'#'}
          className="w-1/3 flex justify-center items-center hover:bg-gray-200 active:bg-gray-300 rounded-full"
        >
          <button className="flex gap-1">
            <img src={likeBtn} alt="" className="w-8" />
            <p className="text-xl">{likes}</p>
          </button>
        </Link>
      </div>
    </article>
  );
};

export default Tweet;
