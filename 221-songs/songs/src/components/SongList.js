import React from "react";
import { connect } from 'react-redux';//importing connect. We need to get the list of songs from the store.
// For this, we need the connect().
import { selectSong } from '../actions';//1. selectSong action creator imported here.
// Basically, we imported here a regular JS function. This function is not magically connected to Redux.
//So when we call this function, it will return an action object, but Redux won't know about it. In order to Redux know about this
//we will have to use the dispatch function. The created action has to be dispatched to the store with dispatch().
//every action that has arrived into the connect(), will be automatically dispatch() behind the scenes.

class SongList extends React.Component {
  renderList(){//this will just map our songs, and return an array of jsx elements
    return this.props.songs.map((song) => {//.map means: for every song...
      return (//this return return jsx for every song
        <div className="item" key={song.title}>
          <div className="right floated content">
            {/*2. Below we use selectSong action creator, in combination with the onClick event handler.*/}
            <button className="ui button primary" onClick={() => this.props.selectSong(song)}>Select</button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  }

  render() {
    console.log('This is the this.props.songs from SongList component: ', this.props.songs);//this is how we can get the songs from redux into the props in this component.
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

//THIS GIVES DATA FROM REDUX
const mapStateToProps = (state) => {// this function will take the state, and extract from it the necesary songs, that
  //this component needs. It will put state.songs to the props, so we will be able to use props.songs.
  console.log('This is the central state: ', state);//this is our whole state displayed. Our state is an object.
  return { songs: state.songs };//the state.songs is being put into the props.songs right here.

}

export default connect(//connect is used to connect our app with redux. This is a two way connection.
  mapStateToProps,//this is used, to get the songs into this component, from the redux. FROM REDUX TO COMPONENT.
  { selectSong }//3. this connect() will take this selectSong action creator, and do the hidden dispatch() with it.
  // This is how our action object gets to the central store. FROM COMPONENT TO REDUX.
)(SongList);



