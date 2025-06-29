// src/redux/action/authAction.js
import { auth } from '../../firebase/firebaseConfig';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './Type';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig';

// Register
export const register = ({ username, email, password, phone, city, country }) => async dispatch => {
  try {
    console.log('Registering user with:', { username, email, phone, city, country });

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User created in Firebase Auth:', user);

    // Save additional data to Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      username,
      email,
      phone,
      city,
      country,
      uid: user.uid,
      createdAt: new Date().toISOString()
    });

    console.log('User data saved to Firestore');

    dispatch({ type: REGISTER_SUCCESS, payload: user });
  } catch (error) {
    console.error('Registration Error:', error.message);
    dispatch({ type: REGISTER_FAIL, payload: error.message });
  }
};

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    console.log('Logging in user with:', { email }, {password});

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('User logged in successfully:', user);

    dispatch({ type: LOGIN_SUCCESS, payload: user });
  } catch (error) {
    console.error('Login Error:', error.message);
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => {
  return { type: LOGOUT };
};