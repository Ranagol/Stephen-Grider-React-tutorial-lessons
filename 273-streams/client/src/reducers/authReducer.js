import { SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {//this is an initial state, only for the beginning
  isSignedIn: null,//this is null, because when the app starts, we don't know if the user is signed in.
  userId: null,
};

export default (state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };//we are extracting the  userId from the sing_in action payload
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };//when the user signs out, we delete his userId from the state
    default:
      return state;
  }
};
