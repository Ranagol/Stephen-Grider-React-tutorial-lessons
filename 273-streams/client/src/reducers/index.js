import { combineReducers } from "redux";
import authReducer from "./authReducer";
import { reducer as formReducer } from 'redux-form';//we installed this reducer with npm install --save redux-form, now we just pull this in
import streamReducer from "./streamReducer";


export default combineReducers({
  auth: authReducer,//this remembers if the user is logged in, or logged out
  streams: streamReducer,//this works with all the stream related data
  form: formReducer,//this is how we connect the redux form to redux
});
