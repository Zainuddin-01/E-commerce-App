// src/firebase/initAuthListener.js
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { LOGIN_SUCCESS, LOGOUT } from '../redux/action/Type';

export const initAuthListener = (store) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          email: user.email,
          username: user.displayName || user.email.split('@')[0],
        },
      });
    } else {
      store.dispatch({ type: LOGOUT });
    }
  });
};
