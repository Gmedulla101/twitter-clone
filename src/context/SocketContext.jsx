import { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useGlobalContext } from './context';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useGlobalContext();
  const [socketConnection, setSocketConnection] = useState();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to chat');
      return;
    }

    const socket = io('http://localhost:5000');
    setSocketConnection(socket);
    return () => socket.close();
  }, []);

  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};
