export default (state = [], action) => {//this reducer will work with an array of user objects, so the default value for the state here will be an []
  switch (action.type) {
    case 'FETCH_USER':
      return [...state, action.payload];//the user is in the action.payload? So that is actually the user?
    default:
      return state;
  }

};
