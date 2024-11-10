import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

//IMPORTING RELEVANT COMPONENTS AND DEPS
import LoaderComponent from '../components/LoaderComponent';
import SideBar from '../components/SideBar';
import CIcon from '@coreui/icons-react';
import { cilSend } from '@coreui/icons';

//IMPORTING CONTEXTS
import { useGlobalContext } from '../context/context';
import { useSocketContext } from '../context/SocketContext';

const Chat = () => {
  const { user, userToken } = useGlobalContext();
  const { newMessage, setNewMessage } = useSocketContext();

  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  const lastMessageRef = useRef();

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        setIsLoading(true);
        const data = await axios.get(
          `https://twitter-backend-s1nc.onrender.com/api/v1/messages/getMessages/${params.chatPartner}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        const allMessages = data.data.data;

        setConversation(allMessages);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    setNewMessage([]);
    getAllMessages();
  }, []);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => {
      clearTimeout(timeOutId);
    };
  });

  const conversationEl = conversation.map((convo) => {
    if (convo.senderUsername === user) {
      return (
        <div
          ref={lastMessageRef}
          key={convo._id}
          className="user flex justify-end my-2"
        >
          <div className="user w-fit p-2 bg-blue-500 rounded-lg">
            <h1 className="text-white max-w-64">{convo.message}</h1>
            <p className="text-white text-xs text-right mt-2">
              {' '}
              {`${convo.createdAt.split('T')[1].split('.')[0].split(':')[0]}:${
                convo.createdAt.split('T')[1].split('.')[0].split(':')[1]
              }`}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          ref={lastMessageRef}
          key={convo._id}
          className="receiver flex justify-start my-2"
        >
          <div className="user w-fit p-2 bg-slate-500 rounded-lg">
            <h1 className="text-white max-w-64">{convo.message}</h1>
            <p className="text-white text-xs text-left mt-2">
              {' '}
              {`${convo.createdAt.split('T')[1].split('.')[0].split(':')[0]}:${
                convo.createdAt.split('T')[1].split('.')[0].split(':')[1]
              }`}
            </p>
          </div>
        </div>
      );
    }
  });

  const newMessageEl = newMessage.map((message) => {
    if (message.senderUsername === user) {
      return (
        <div
          ref={lastMessageRef}
          key={message._id}
          className="user flex justify-end my-2"
        >
          <div className="user w-fit p-2 bg-blue-500 rounded-lg">
            <h1 className="text-white max-w-64">{message.message}</h1>
            <p className="text-white text-xs text-right mt-2">
              {' '}
              {`${
                message.createdAt.split('T')[1].split('.')[0].split(':')[0]
              }:${message.createdAt.split('T')[1].split('.')[0].split(':')[1]}`}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          ref={lastMessageRef}
          key={message._id}
          className="receiver flex justify-start my-2"
        >
          <div className="user w-fit p-2 bg-slate-500 rounded-lg">
            <h1 className="text-white max-w-64">{message.message}</h1>
            <p className="text-white text-xs text-left mt-2">
              {' '}
              {`${
                message.createdAt.split('T')[1].split('.')[0].split(':')[0]
              }:${message.createdAt.split('T')[1].split('.')[0].split(':')[1]}`}
            </p>
          </div>
        </div>
      );
    }
  });

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  //SEND MESSAGE FUNCTIONALITY

  const sendMessage = async (e) => {
    if (!message) {
      toast.error('You cannot send an empty message na');
      return;
    }

    const data = await axios.post(
      `https://twitter-backend-s1nc.onrender.com/api/v1/messages/send/${params.chatPartner}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    setNewMessage((prevMsg) => {
      return [...prevMsg, data.data.msg];
    });
    setMessage('');
  };

  return (
    <>
      <SideBar />
      <section className="ml-12 flex flex-col relative md:ml-64">
        <div className="shadow p-2 w-full">
          <h1 className="font-semibold text-2xl">
            {params.chatPartner || 'Live Chat'}
          </h1>
        </div>

        {isLoading ? (
          <div className="h-[85vh]">
            <LoaderComponent />
          </div>
        ) : (
          <section>
            {conversation.length < 1 ? (
              <div className="w-full h-[85vh]">
                <h3 className="font-semibold text-3xl text-center my-[35vh]">
                  All your chats will appear{' '}
                  <span className="text-blue-500">here</span>
                </h3>
              </div>
            ) : (
              <div className="messageContainer h-[85vh] p-2 overflow-auto">
                {conversationEl}
                {newMessageEl}
              </div>
            )}
          </section>
        )}

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
            value={message}
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
