import { useState, useEffect, createContext, useContext } from 'react';

const GlobalContext = createContext();

const useGlobalContext = () => {
  const { user, setUser } = useContext(GlobalContext);
  return [user, setUser];
};

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
