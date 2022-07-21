import { createContext, useContext } from 'react';
import Firebase from './firebase';

export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider>
      { children }
    </FirebaseContext.Provider>
  );
}

export default Firebase;
