export default (state = [], action) => {//with state = [] we made state to be = to an empty [], if the state is empty.
  //Which always happens the first time when the reducers runs.
  switch (action.type) {
    case 'FETCH_POSTS':
      //console.log('postsReducer action and state', action, state);
      return action.payload;
    default:
      return state;//when the reducer runs first time, at that time there is no data in the state. So, the default
      //state = [] kicks in (see the argument for this). And since we are returning the state, we will return a [].
  }
};
