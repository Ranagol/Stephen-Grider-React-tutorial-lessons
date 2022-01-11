//action creators
export default function selectBook(book) {
  console.log('A book has been selected', book.title);
  return {
    type: 'BOOK_SELECTED',
    payload: book,//this is the same book from the book argument, since we don't have an api?
  };
}

/*
We have to make sure, that whatever action is returned by this action creator, it -
the action - has to go through ALL reducers. So, we have to connect the action creators
with redux. We will do this with the bindActionCreator. bindActionCreator will make sure
that the created action go to ALL reducers.
 */
