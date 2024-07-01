import React from 'react';

//IMPORTING HELPER COMPONENTS

const Comment = ({ comments, setCommentOpen }) => {
  console.log(comments);

  return (
    <div className="p-2 bg-white fixed w-full h-full top-0">
      <div>
        <button
          onClick={() => {
            setCommentOpen(false);
          }}
          className="px-16 py-3 bg-blue-500 text-white text-lg rounded-3xl flex w-12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-12"
        >
          Back
        </button>
      </div>
      {/* TEXT AREA FOR ADDING A NEW COMMENT */}
      <section className="mb-12">
        <textarea className=" h-36 text-lg p-2 outline-none w-full resize-none"></textarea>
        <button className="px-16 py-3 bg-blue-500 text-white text-lg rounded-3xl flex w-12 justify-center font-bold hover:bg-blue-600 active:bg-blue-700 lg:w-12 mx-auto">
          Reply
        </button>
      </section>

      {/* THE COMMENTS */}
      <section>
        <article className="border-2 border-slate-200 p-3 shadow-lg">
          <h2 className="poster font-bold">MothersMilk</h2>
          <p className="mb-4">Nor go commit anything o</p>
        </article>
      </section>
    </div>
  );
};

export default Comment;
