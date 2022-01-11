import _ from 'lodash';
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from '../actions/types';

export default (state = {}, action ) => {//action contains a payload property, that contains the fetched stream object
  switch (action.type) {
    case FETCH_STREAMS:
    /*
    The api will return an array of stream objects, when this request happens. That is not good, because it is easier to work
    with objects. More precicesly we want an object, that contains all the stream objects as values, while it has the stream
    objects id as a key. For this, we will use lodash _.mapKeyes.
     */
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case FETCH_STREAM:
      /*
      Now, state is a {}. So stream in this state object are stored under some keys. These keys are actually = to the
      stream id number.
      When we do a fetchStream() to get a stream object, usually we already have an old version of that stream in our redux
      state. So fetchStream does not creates another copy of the stream object beside the old, outdated stream object.
      Instead, it replaces the old stream object with the newly fetched stream object.
       */
      return { ...state, [action.payload.id]: action.payload };//add the fetched stream to our state, and its key should be = to the streams id
      //this line above may have been solved with lodash keyBy. Same purpose, different way.
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      return _.omit(state, action.payload);//in case of deleteStream, the response from the server is just the id of the deleted stream. We put this id directly into payload.
      //that is why here, and in this case only action.payload = the id of the deleted stream.
      //also, only in this case, we don't use ...state, instead we use the original state. That is because _.omit returns a new object.

    default:
      return state;
  }

}
