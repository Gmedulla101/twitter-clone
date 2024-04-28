import React from 'react';

const Tweet = ({ poster, post }) => {
  return (
    <article className="border-2 border-slate-200 p-3">
      <h2 className="poster font-bold"> {poster} </h2>
      <p>{post}</p>
    </article>
  );
};

export default Tweet;
