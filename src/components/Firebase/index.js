import { createContext, useContext } from 'react';
import Firebase from './firebase';

export const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export default Firebase;
