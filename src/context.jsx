import { useState, useEffect, createContext, useContext } from 'react';
import { json } from 'react-router-dom';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const { user, setUser, isSignedIn, setIsSignedIn } =
    useContext(GlobalContext);
  return { user, setUser, isSignedIn, setIsSignedIn };
};

const AppContext = ({ children }) => {
  const storedToken = localStorage.getItem('userToken');
  const storedUser = localStorage.getItem('username');

  if (!storedToken || !storedUser) {
    console.error('No user is logged in');
  }
  const userToken = JSON.parse(storedToken);
  const username = JSON.parse(storedUser);

  const [user, setUser] = useState(username || null);
  const [isSignedIn, setIsSignedIn] = useState(userToken ? true : false);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, isSignedIn, setIsSignedIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
