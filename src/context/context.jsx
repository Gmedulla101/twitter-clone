import { useState, createContext, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const { user, setUser, isSignedIn, setIsSignedIn, userId, userToken } =
    useContext(GlobalContext);
  return { user, setUser, isSignedIn, setIsSignedIn, userToken, userId };
};

const AppContext = ({ children }) => {
  const storedToken = localStorage.getItem('userToken');
  const storedUser = localStorage.getItem('username');
  const storedId = localStorage.getItem('userId');

  if (!storedToken || !storedUser || !storedId) {
    console.error('No user is logged in');
  }
  const userToken = JSON.parse(storedToken);
  const username = JSON.parse(storedUser);
  const userId = JSON.parse(storedId);

  const [isSignedIn, setIsSignedIn] = useState(userToken ? true : false);
  const [user, setUser] = useState(username || null);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, isSignedIn, setIsSignedIn, userToken, userId }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
