import { useState, useEffect, createContext, useContext } from 'react';

const GlobalContext = createContext();

 export const useGlobalContext = () => {
  const { user, setUser, isSignedIn, setIsSignedIn} = useContext(GlobalContext);
  return [user, setUser, isSignedIn, setIsSignedIn];
};


const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false)

  return (
    <GlobalContext.Provider value={{ user, setUser, isSignedIn, setIsSignedIn }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
