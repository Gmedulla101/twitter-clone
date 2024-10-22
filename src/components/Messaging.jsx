import axios from 'axios';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

//IMPORTING NEEDED DEPS
import SideBar from './SideBar';

//IMPORTING CONTEXT HOOK
import { useGlobalContext } from '../context';

//INSTANTIATIING SOCKET CONNECTION
const socket = io.connect('http://localhost:5000');

const Messaging = () => {
  const { user } = useGlobalContext();

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
              className="border-2 border-gray-400 block mx-auto w-full h-10 rounded-full px-3 pb-1 outline-none focus:border-blue-500"
            />
          </div>

          <div className="p-2">
            <div className="border-2 border-gray-400 flex items-center gap-2 p-2">
              <span className="h-16 w-16 border-2 border-gray-400 p-2 rounded-full flex justify-center items-center">
                Image
              </span>
              <h3 className="font-semibold ">Username</h3>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Messaging;
