import React from 'react';

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
    <article className="border-2 border-slate-200 p-3">
      <h2 className="poster font-bold"> {poster} </h2>
      <p className="mb-4">{post}</p>
      {particularImage.length != 0 ? (
        <div className="h-56 w-full rounded-xl overflow-hidden">
          <img
            src={particularImage[0]?.imageUrl}
            alt=""
            className="w-full h-full"
          />
        </div>
      ) : (
        ''
      )}
    </article>
  );
};

export default Tweet;
