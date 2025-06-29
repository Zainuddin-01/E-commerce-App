// src/redux/rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import productReducer from './ProductReducer'; // adjust path if needed

const rootReducer = combineReducers({
  auth: authReducer,
  productState: productReducer,
});

export default rootReducer;
