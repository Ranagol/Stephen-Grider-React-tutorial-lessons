export default function(state = null, action) {/*
the state argument here is not the complete app state, only the state this reducer is responsible for. This reducer is
remembering which book is the selected one. Some other reducer remebers the list of all books.
Now if an action arrives, this reducer will check it's type. If it is a 'BOOK_SELECTED' type, it will return the
actions payload. If it is any other action, it will return the unchanged state - so no change will happen in the state.
*/
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
  }
  return state;
}
