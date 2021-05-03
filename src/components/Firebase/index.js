import { createContext } from 'react';
import Firebase from './firebase';

const FirebaseContext = createContext(null);

export default Firebase;
export { FirebaseContext };