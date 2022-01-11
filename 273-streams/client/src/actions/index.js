import streams from "../apis/streams";//this way we can use the axios instance with the baseURL created in streams.js
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";
//HERE WE HAVE OUR ACTION CREATORS

export const signIn = (userId) => {//this will be handled by the authReducer
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {//this will be handled by the authReducer
  return {
    type: SIGN_OUT,
  };
};

/*
stream creating will be done with the use of our redux form, which is possibly called formValues
notice that here we have two => =>. Remeber that always the inner function is activated first. Why do we have two function?
Because, if there is no data returned from the api, then instead of an object a function will be returned,
and thunk will notice this function, and thunk will make this function to wait...
Till the data arrives from the api. Then, instead a function an object will be returned, and thunk will let this object to enter to the world of reducers.
Because of thunk. thunk is always checking, if we are returning a simple action, or we are returning a function. If it is an action,
all is OK, thunk will allow to proceed. If it is a function, then... This second function is returned: => async dispatch => , and this is
the function that will make thunk to react.
here we are making an async action creator. For this to work, we need thunk. thunk handles async requests.
 */
/*
We want to do a primitive version of authorization, but without api. We want to display edit and delete button for the user,
for every stream that he owns. So all users should be able to see all streams, but only the owner will be able to edit and
delete a stream. To achieve all this, without a real api, we will insert the userId into the stream object, when the stream
is created. We will get the userId from google auth, more accuratelly from the authReducer part of the state.
 */
/*
Will will get the userId with the help of the getState. getState will be used as argument, and during this there will be
no (). But when we call getState, then we use (). Question: why are we using getState and why aren't we using mapStateToProps??
getState returns the entire state object.

 */
export const createStream = formValues => async (dispatch, getState) => {//formValues is possibly our redux form. async is here because this will be an async function. dispatch is possibly needed, because we will put into redux what we receive from the api.
  //console.log('getState from createStream action', getState());
  const { userId } = getState().auth;//getState returns the entire state object, from where we take the userId
  const response = await streams.post('/streams', { ...formValues, userId });//create a new stream. Make a post request to /streams, with the data from the formValues.
  //console.log('response.data', response.data);
  /*
  We are doing here two things together.
  1. We are creating a new object from the formValues and userId
  2. We are sending this new object with a post request to the api, to create a stream
  Now how will the userId get into the state? Simply. The userId is sent to the api with the post request. After a
  successful stream object recording by the api, the api sends back the stream as a json object. And the userId is in this
  json object.
   */
  /*
  1. Now whenever we send a create stream post request, the api will automatically answer by sending back a json object that contains the stream title and description.
  This will be the api response. This will show up in inspect/Network. We need to catch this response, handle it. We are catching it in the response const.
  2. Further more, we will have to dispatch this response to the redux. We need a reducer for this.
   */
  dispatch({
    type: CREATE_STREAM,
    payload: response.data,//from the response const above
  });
  /*
  below we trigger navigation back to /streams. For this, we will need the history object here. Getting the original history
  object is pain in the ass, so we will create our own history object. For this, we will need not the original BrowserRouter
  , but a ... some simple, custom, plain router, instead of the BrowserRouter (this basically means that in App.js
  instead of import { BrowserRouter, Route } from "react-router-dom"; we will use import { Router, Route } from "react-router-dom";
  This plain router will listen to history or changes in the url.
   */
  history.push('/');//when the create is successful, push the user to the '/' page
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  dispatch({
    type: FETCH_STREAMS,
    payload: response.data,
  });
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);
  dispatch({
    type: FETCH_STREAM,
    payload: response.data,
  });
};

export const editStream = (id, formValues ) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);
  dispatch({
    type: EDIT_STREAM,
    payload: response.data,
  });
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({
    type: DELETE_STREAM,
    payload: id,
  });
  history.push('/');//when the delete is successful, push the user to the '/' page
};







