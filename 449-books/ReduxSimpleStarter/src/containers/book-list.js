import React, { Component } from 'react';
import { connect } from 'react-redux';//1 STEP connecting a container to redux
import selectBook from '../actions/index';
import { bindActionCreators } from "redux";//bindActionCreator will make sure that the created action go to ALL reducers.

//purpose of this component is to render a list of books

class BookList extends Component {
  renderList(){
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item"
        >
          {book.title}
        </li>
      );
    });
  }

  render() {
    //console.log('props', this.props);
    return (
      <div>
        <h5>BookList component</h5>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {//2 STEP connecting a container to redux
  //whatever is returned here, will show up in this containers props
  //console.log('state', state);
  return {
    books: state.books,
  };
}

function mapDispatchToProps(dispatch){//anything returned by mapDispatchToProps will be in the BookList props. This way, the selectBook action creator will be in the props, and will be callable with this.props.selectBook()
  //console.log('MDTP activated, this is the dispatch', dispatch);
  return bindActionCreators({ selectBook }, dispatch);//whenever selectBook() action creator is called, the resulted action should go to ALL reducers. This is done with the help of the dispatch.
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);//3 STEP connecting a container to redux
