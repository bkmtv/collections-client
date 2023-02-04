import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URI } from '../constants/api';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: false, username: ""});

  useEffect(() => {
    const refreshUser = () => {
      axios.get(URI + "auth/user", {
        headers: {token: localStorage.getItem("token")},
      }).then(({data}) => {
        if (data.error) {
          setUser({isLoggedIn: false, username: "" })
        } else {
          setUser({isLoggedIn: true, username: data.username });
        }
      })
    }
    refreshUser();
  }, [setUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };