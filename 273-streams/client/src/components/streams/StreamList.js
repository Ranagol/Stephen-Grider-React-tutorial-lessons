import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";


class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();//2. here we use the fetchStreams from the props
  }

  renderEditDeleteButtons(stream) {
    //we only want to display these buttons, if the logged in users id === stream's user id
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }

  renderStreamList(){//we just want to render out all streams on the screen
    return this.props.streams.map(stream => {
      return (//for each stream return a multiline jsx
        <div className="item" key={stream.id}>
          <div>{this.renderEditDeleteButtons(stream)}</div>
          <i className="large middle aligned icon camera"></i>
          <div className="content">Title:
            <Link
              to={`/streams/${stream.id}`}
              className="header"
            >
              {stream.title}
            </Link>
          </div>
          <div className="description">Description: {stream.description}</div>
          {/*A nice example how a complicated part of rendering (renderEditDeleteButtons) is being separated from this function*/}

        </div>
      );
    });
  }

  renderCreateButton() {
    //we only want to show the create stream button, if the user is signed in. For this, we can use the isSigneIn property from the authReducer
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link
            to="/streams/new"
            className="ui button primary"
          >
            Create stream
          </Link>
        </div>
      );
    }
  }

  //THE MAIN RENDER
  render() {
    //console.log('Streams from StreamList', this.props.streams);
    return (<div>
      <h3>StreamList</h3>
      <div className="ui celled list">
        {/*A nice example how to render. Put all the complicated shit into another function like the renderList()*/}
        {this.renderStreamList()}
      </div>
      <div>
        {this.renderCreateButton()}
      </div>
    </div>);
  }
}

const mapStateToProps = (state) => {
  /*
  Fuck. The api returns an array of stream objects. In the reducer, we transform this to an object that contains streams
  objects. Because it is easier to work with objects, than with array. Now it seems to me that when we want to render out
  a stream list, we have to transform back it into an array. Also, it is possible to iterate through an object with lodash,
  but this time this won't be done.
  Fuuuck. VueJS, I miss you so much.
   */
  return {
    streams: Object.values(state.streams),//state streams is an object, that contains stream objects. For rendering/displaying purposes, we are transforming this into an array of stream objects, with the Object.value().
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  }
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);//1. here we got the fetchStreams into this components props
