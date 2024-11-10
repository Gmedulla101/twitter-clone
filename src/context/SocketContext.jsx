import { createContext, useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useGlobalContext } from './context';
import toast from 'react-hot-toast';

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const [socketConnection, setSocketConnection] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to chat');
      return;
    }

    const socket = io('https://twitter-backend-s1nc.onrender.com', {
      query: {
        user,
      },
    });
    setSocketConnection(socket);

    socket.on('getOnlineUsers', (users) => {
      setOnlineUsers(users);
    });

    socket.on('newMessage', (newMessage) => {
      setNewMessage((prevMessages) => {
        return [...prevMessages, newMessage];
      });
    });

    return () => {
      socket.close();
    };
  }, [user, newMessage]);

  return (
    <SocketContext.Provider
      value={{ onlineUsers, socketConnection, newMessage, setNewMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};
