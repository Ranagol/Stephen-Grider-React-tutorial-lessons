import React from 'react';
import { connect } from 'react-redux';

const SongDetail = (props) => {//because of the connect() this is now getting a props object, with the { song: state.selectSong } object
  const { song } = props;//above this line the component received a props. On this line we do this const song = props.song;
  if (!song) {
    return <div>Please select a song</div>;
  }

  return (
    <div>
      <h3>Details for:</h3>
      <p>Title: {song.title}</p>
      <p>Duration: {song.duration}</p>
    </div>
  );
};

const mapStateToProps = (state) => {//this will get the state.selectedSong into the component's props, under the key song.
  return { song: state.selectedSong }
};

export default connect(mapStateToProps)(SongDetail);//connect is used to connect our app with redux. This is a two way connection.
