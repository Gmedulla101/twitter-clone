import { useState, useEffect } from 'react';
import axios from 'axios';

/* import { joinRoom } from '../custom hooks/useSocket'; */

import { Link, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

//IMPORTING NEEDED DEPS
import SideBar from '../components/SideBar';
import LoaderComponent from '../components/LoaderComponent';

//IMPORTING CONTEXT HOOK
import { useGlobalContext } from '../context/context';

const Messaging = () => {
  const { user, userToken } = useGlobalContext();
  const [userSearch, setUserSearch] = useState('');
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  //STATES FOR THE CHAT FUNCTIONALITY
  const [room, setRoom] = useState('');

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUserSearch(event.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userSearch) {
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const data = await axios.get(
          `http://localhost:5000/api/v1/users/getUsers?user=${userSearch}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        setUserSearchResults(data.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userSearch]);

  return (
    <>
      <SideBar />
      {!user ? (
        <h1 className="ml-12 text-center font-bold text-2xl pt-24">
          No user is Logged in. You can
          <Link to={'/sign-in'} className="text-blue-500 hover:underline">
            Sign in
          </Link>
          or
          <Link to={'/sign-up'} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </h1>
      ) : (
        <section className="ml-12 py-2 md:ml-64">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search for a username or full name"
              onChange={handleChange}
              value={userSearch}
              className="border-2 border-gray-400 block mx-auto w-full h-10 rounded-full px-3 pb-1 outline-none focus:border-blue-500"
            />
          </div>
          {isLoading ? (
            <div className="mt-3">
              <LoaderComponent />
            </div>
          ) : (
            ''
          )}
          <div className="p-2 flex flex-col gap-3">
            {userSearchResults.map((result) => {
              return (
                <div
                  onClick={() => {
                    setRoom(user.toLowerCase() + result.username.toLowerCase());
                    /* joinRoom(room, result.username); */
                    navigate(`/messaging/${result.username}`);
                  }}
                  key={result._id}
                  className="border-2 border-gray-200 flex items-center gap-2 p-2 rounded-lg shadow cursor-pointer"
                >
                  <span className="h-16 w-16 border-2 border-gray-400 p-2 rounded-full flex justify-center items-center">
                    Image
                  </span>
                  <h3 className="font-semibold ">{result.username}</h3>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div
        onClick={() => {
          setRoom(user.toLowerCase() + 'Kitana'.toLowerCase());
          /* joinRoom(room, 'Kitana'); */
          navigate(`/messaging/Kitana`);
        }}
        key="6728cd8cf9d1e9969bb88de1"
        className="ml-12 md:ml-64 border-2 border-gray-200 flex items-center gap-2 p-2 rounded-lg shadow cursor-pointer"
      >
        <span className="h-16 w-16 border-2 border-gray-400 p-2 rounded-full flex justify-center items-center">
          Image
        </span>
        <h3 className="font-semibold ">Kitana</h3>
      </div>
    </>
  );
};

export default Messaging;
