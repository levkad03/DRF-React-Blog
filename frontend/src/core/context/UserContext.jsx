import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const props = useContext(UserContext);

  if (!props) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return props;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = userData => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const context = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
};
