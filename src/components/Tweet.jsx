import React from 'react';

const Tweet = ({ poster, post, tweetImages, id }) => {
  const tweetImagesId = tweetImages?.map((tweetImage, i) => {
    return {
      imageUrl: tweetImage,
      imageId: tweetImage.slice(tweetImage.lastIndexOf('_') + 1),
    };
  });
  const particularImage = tweetImagesId.filter((tweetImageId) => {
    return tweetImageId.imageId == id;
  });

  console.log(particularImage);
  console.log(id);

  return (
    <article className="border-2 border-slate-200 p-3">
      <h2 className="poster font-bold"> {poster} </h2>
      <p>{post}</p>
      {
        (particularImage.length = 0 ? (
          <div className="h-56 w-full border-2 border-red-400">
            <img
              src={particularImage[0]?.imageUrl}
              alt=""
              className="w-full h-full"
            />
          </div>
        ) : (
          ''
        ))
      }
    </article>
  );
};

export default Tweet;
