import React from 'react';

import initFirebase from './firebase';
import firebase from 'firebase/app';
import 'firebase/auth';

const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  initFirebase();
  const [user, setUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        setUser(null);
        setLoadingUser(false);
        return;
      }
      setUser(user);
      setLoadingUser(false);
    });
  }, []);

  return (<AuthContext.Provider value={{ user, loadingUser }}>{children}</AuthContext.Provider>)
};

export const useAuth = () => React.useContext(AuthContext);