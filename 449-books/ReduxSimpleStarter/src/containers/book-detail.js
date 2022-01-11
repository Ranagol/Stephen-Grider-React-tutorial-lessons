import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
  render() {
    console.log('BookDetail container', this.props);

    //example for conditional rendering below
    if(!this.props.book) {//if there is no book...
      return <div>Select a book to get started.</div>//...then show this...
    }

    return (//... but if there is a book object, then show this below
      <div>
        <h3>Details for:</h3>
        <div>Title: {this.props.book.title}</div>
        <div>Pages: {this.props.book.pages}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    book: state.activeBook,
  }
}

export default connect(mapStateToProps)(BookDetail);
