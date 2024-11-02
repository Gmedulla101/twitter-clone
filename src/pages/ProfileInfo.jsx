import { useState, useEffect } from 'react';

//IMPORTING HELPER COMPONENTS
import SideBar from '../components/SideBar';
import Tweet from '../components/Tweet';

//IMPORTING DEPS
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfileInfo = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState();
  const [userTweets, setUserTweets] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/v1/users/getUser/${username}`
        );
        const userTweetData = await axios.get(
          `http://localhost:5000/api/v1/posts/get-posts?poster=${username}`
        );

        setUserTweets(userTweetData.data.data);

        setUserData(data.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  const tweetsEl = userTweets?.map((tweet) => {
    return (
      <Tweet
        poster={tweet.poster}
        post={tweet.post}
        key={tweet._id}
        id={tweet._id}
        docId={tweet.docId}
        likes={tweet.likes}
        comments={tweet.comments}
        postImg={tweet.postImg}
      />
    );
  });

  const followUser = async () => {
    try {
      const storedToken = localStorage.getItem('userToken');
      if (!storedToken) {
        throw new Error('You must sign in to make a post!');
      }

      const token = JSON.parse(storedToken);
      await axios.patch(
        `http://localhost:5000/api/v1/users/followUser/${username}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Followed');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SideBar />
      <section className="ml-12 mb-12 bg-white md:ml-64">
        <section className=" h-full">
          {/* MAIN PROFILE BODY */}
          <div className="h-60 bg-slate-200 flex justify-center gap-4 text-2xl font-bold relative">
            <img src={userData?.coverImage} alt="" className="w-full h-full" />
          </div>

          <div className="bg-white border-4 border-blue-400 w-20 h-20 p-1 rounded-full relative top-[-40px] ml-6 overflow-hidden">
            <img src={userData?.profileImage} alt="" className="rounded-full" />
          </div>
        </section>

        <section className="ml-3 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-2xl ">
              {userData?.firstName} {userData?.lastName} {userData?.otherNames}
            </h4>
            <p className="text-slate-500"> @{userData?.username} </p>
            <p className="mt-2"> {userData?.bio} </p>
            <div className="flex gap-2">
              <p className="font-semibold">
                {userData?.followers.length} followers
              </p>
              <p className="font-semibold">
                {userData?.following.length} following
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={followUser}
              className="py-2 px-10 bg-blue-500 rounded-full text-white font-semibold "
            >
              Follow
            </button>
          </div>
        </section>

        <section className="mt-10">
          <h1 className="text-xl text-center font-bold mb-3 text-blue-500">
            {' '}
            Your Tweets{' '}
          </h1>
          <div>{tweetsEl}</div>
        </section>
      </section>
    </>
  );
};

export default ProfileInfo;
