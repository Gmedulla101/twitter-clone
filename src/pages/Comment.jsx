import { useState, useEffect } from 'react';
import axios from 'axios';

import { useGlobalContext } from '../context';
import SideBar from '../components/SideBar';
import toast from 'react-hot-toast';
import { useParams, Link } from 'react-router-dom';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//MAIN COMPONENT BODY
const Comment = () => {
  const [commentText, setCommentText] = useState('');
  const [fetchedComments, setFetchedComments] = useState([]);
  const [tweet, setTweet] = useState();
  const handleChange = (event) => {
    setCommentText(event.target.value);
  };
  const { id } = useParams();
  const { user } = useGlobalContext();
  const storedToken = localStorage.getItem('userToken');
  if (!storedToken) {
    throw new Error('You must sign in to make a post!');
  }
  const token = JSON.parse(storedToken);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/v1/posts/get-post/${id}`
        );

        setTweet(data.data.data);
        setFetchedComments(data.data.data.comments);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    getPost();
  }, []);

  const sendComment = async () => {
    try {
      const data = await axios.post(
        `http://localhost:5000/api/v1/posts/comment/${id}`,
        {
          comment: commentText,
          commenter: user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText('');
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const commentEl = fetchedComments?.map((comment, i) => {
    return (
      <article className="border-2 border-slate-200 p-3 my-3" key={i}>
        <h2 className="poster font-bold">{comment?.commenter}</h2>
        <p className="mb-4">{comment?.comment}</p>
      </article>
    );
  });

  return (
    <>
      <SideBar />
      <div className="ml-12 py-2 w-[65vw] bg-white md:ml-64">
        <div>
          <article className="border-2 border-slate-200 p-3">
            <Link to={`/user-profile/${tweet?.poster}`}>
              {' '}
              <h2 className="poster font-bold"> {tweet?.poster} </h2>{' '}
            </Link>

            <p className="mb-4">{tweet?.post}</p>
            {tweet?.postImg?.length > 0 ? (
              <div className="h-96 w-full rounded-xl overflow-hidden md:h-96 md:w-[60%] md:mx-auto">
                <img src={tweet?.postImg[0]} alt="" className="w-full h-full" />
              </div>
            ) : (
              ''
            )}
          </article>
        </div>
        {/* TEXT AREA FOR ADDING A NEW COMMENT */}
        <section className="mb-12">
          <textarea
            placeholder="Type in your comment here!"
            value={commentText}
            onChange={handleChange}
            className="h-36 text-lg p-2 my-2 outline-none w-full resize-none border-2 border-slate-200 rounded-lg"
          ></textarea>
          <button
            onClick={sendComment}
            className="bg-blue-500 px-6 py-2 rounded-lg text-lg block mx-auto text-white"
          >
            Reply
          </button>
        </section>

        {/* THE COMMENTS */}
        <section>
          <h2 className="text-center font-semibold text-xl border-b-2 pb-2">
            Replies
          </h2>

          <div>
            {fetchedComments.length < 1 ? (
              <h3 className="text-center text-2xl font-semibold mt-5">
                {' '}
                There are no comments yet on this post. Be the{' '}
                <span className="text-blue-500">first!</span>{' '}
              </h3>
            ) : (
              commentEl
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Comment;
