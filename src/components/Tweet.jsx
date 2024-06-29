import React from 'react';
import commentBtn from '../images/chat.png';
import likeBtn from '../images/like.png';

const Tweet = ({ poster, post, tweetImages, id }) => {
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
        <button className="w-1/3 flex justify-center items-center hover:bg-gray-200 active:bg-gray-300 rounded-full">
          <img src={commentBtn} alt="" className="w-10" />{' '}
        </button>
        <button className="w-1/3 flex justify-center items-center hover:bg-gray-200 active:bg-gray-300 rounded-full">
          <img src={likeBtn} alt="" className="w-8" />
        </button>
      </div>
    </article>
  );
};

export default Tweet;
