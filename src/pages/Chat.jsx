import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import SideBar from '../components/SideBar';
import CIcon from '@coreui/icons-react';
import { cilSend } from '@coreui/icons';
import {
  socket,
  selectedUsername,
  selectedRoom,
} from '../custom hooks/useSocket';
import { useGlobalContext } from '../context';

const Chat = () => {
  const { user } = useGlobalContext();
  const [message, setMessage] = useState('');
  const storedToken = localStorage.getItem('userToken');
  if (!storedToken) {
    throw new Error('You must sign in to make a post!');
  }

  const token = JSON.parse(storedToken);

  const params = useParams();

  useEffect(() => {
    const getAllMessages = async () => {
      const data = await axios.get(
        `http://localhost:5000/api/v1/messages/getMessages/${params.room}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allMessages = data.data.data.messages;
      console.log(allMessages);
    };

    getAllMessages();
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  //SEND MESSAGE FUNCTIONALITY
  const chatinputRef = useRef(null);
  const sendMessage = async (e) => {
    if (!message) {
      throw new Error('Message string cannot be empty');
    }

    /*  const messageObj = {
      room: selectedRoom,
      author: user,
      message: message,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    };

    await socket.emit('send_message', messageObj); */

    const data = await axios.post(
      `http://localhost:5000/api/v1/messages/send/${params.room}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    chatinputRef.current.value = '';
  };

  /*  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
    });
  }, [socket]); */

  return (
    <>
      <SideBar />
      <section className="ml-12 flex flex-col relative">
        <div className="shadow p-2 w-full">
          <h1 className="font-semibold text-2xl">
            {selectedUsername || 'Live Chat'}
          </h1>
        </div>
        <div className="w-full h-[85vh]">
          <h3 className="font-semibold text-3xl text-center my-[35vh]">
            All your chats will appear{' '}
            <span className="text-blue-500">here</span>
          </h3>
        </div>
        <div className="px-2 absolute w-full top-full flex gap-2">
          <input
            type="text"
            placeholder="Type in your message"
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
            id="chatInput"
            ref={chatinputRef}
            className="border-2 border-slate-200 py-2 px-4 outline-none rounded-lg w-full focus:border-blue-500"
          />
          <button
            type="submit"
            onClick={sendMessage}
            className="bg-blue-500 h-12 w-16 rounded-lg flex items-center justify-center"
          >
            {' '}
            <CIcon icon={cilSend} size="lg" className="text-white" />{' '}
          </button>
        </div>
      </section>
    </>
  );
};

export default Chat;
