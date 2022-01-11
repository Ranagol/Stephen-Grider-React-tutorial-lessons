import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {//getState can be used to get ... state. :) We want to use getState in our function, so we put it into the argumenst.
  console.log('About to fetch posts');
  await dispatch(fetchPosts());//we are dispatching a function to the reducer, not an action. This is where thunk jumps in.
  console.log('Posts are fetched');//so by now we got all the posts
  console.log('This is the FULL getState()', getState());
  console.log('This is the getState() in action', getState().posts);
}

/*
I STOPPED HERE WITH THIS LESSON, BECAUSE IT SEEMED TO ME THAT IS NOT THAT RELEVANT FOR THE THIGNS THAT I DO IN DEVIOONE.
SO I STOPPED AT LESSON 267 ACTION CREATORS IN ACTION CREATORS.
 */


export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = id => async dispatch => {

  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);
//
//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });






/*
Issue with async/await action creators: this is a no-no in action creators. If we use async/await to create an action
object, that will be no more a simple JS object (which it should have been). Action must be a plain JS object.

Possible solution: well, remove the async/await part.
If there is no async/await... than we are working with a promise. A promise is promising to our app, that the requested
data will arrive to our frontend, from the backend. Not immediatelly, there will be a time delay ..."but I promise, that
the data will come". The promise object will give us access to our requested data, at some point, when the data arrives
from the api.
So, this could work with the promise. But, it won't. The action will arrive to the reducer almost immediatelly, but
it won't have the needed data from the api. Because this needed data needs some tome to arrive from the api to our
frontend app. So, there we have our action in the reducer, but without data...

And now the real solution. There are two types of action creators.
1. sync action creator: instantly returns an action with data ready to go.
2. async action creator: takes some amount of time for it to get its data ready to go. Every network request action
creator must be async. To use these async action creators we need a middleware. And this is thunk.
These middlewares (from now on: thunk) have the ability to stop or modify, or mess around with actions.
What thunk does: it allows to the action creator to either return a plain JS object OR to return a function.
If the action is an object (has all the data), then thunk just allows him to go to the reducer.
If the action is a function (it is still waiting for the data from the api), then thunk delays this action, till the data
is arrived from the api.
Because of all this, with thunk we can use async/await.
 */
