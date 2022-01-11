import React, { Component } from 'react';

import BookList from "../containers/book-list";
import BookDetail from "../containers/book-detail";

export default class App extends Component {
  render() {
    return (
      <div>
        <h3>Books</h3>
        <BookList />
        <BookDetail />
      </div>
    );
  }
}
