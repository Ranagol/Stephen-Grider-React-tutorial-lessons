
//this is an action creator FUNCTION that returns a json object, this is not an action!!!
//song is a js object, that contains title and duration
export const selectSong = song => {//this is an example for named export
  return {
    type: 'SONG_SELECTED',
    payload: song,
  };
};
/*
export default selectSong - this exports all from selectSong action creator. But, we could have here multiple action
creators. And we want them to export too. For this, instead of default export, we will use named exports. The named export
allows us to export many different functions from a single file.
Importing a named export: in the given file, just do this: import { selectSong } from '../actions';
*/


