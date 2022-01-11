import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
import ActiveBook from './reducer_active_book';

const rootReducer = combineReducers({//combining reducer into a one central reducer
  books: BooksReducer,//our app state will have a key books, that will contain whatever the BooksReducer returns (a list of books)
  activeBook: ActiveBook,//this is the one selected book

});

export default rootReducer;
