import { combineReducers} from "redux";
/*
We will have two reducers in this app.
1. Song list reducer: returns a static list of songs.
2. Selected song reducer: will allow the user to select a specific song with a click, and the central store will
always know which song is selected.
Andor explanation: all the data in the store is stored in reducers. Reducers manage state in application.
 */

//1. Stores the list of songs
const songsReducer = () => {//this songReducer has static song and it is an overkill. Don't use it as a learning template.
  return [//here we have an array of 4 song objects
    { title: 'No scrubs', duration: '4:05'},
    { title: 'Macarena', duration: '2:30'},
    { title: 'All star', duration: '3:15'},
    { title: 'I want it that way', duration: '1:45'},
  ];
};

//2. Stores the selected song.
const selectedSongReducer = (selectedSong = null, action) => {//when the app starts,
  // at that moment there will be no selected songs, so we just put here that selectedSong = null. At the beginning.

  //There are two possible case here.
  //When the user clicks on a song, an action is created. There is only one action, and it will be a type of type === 'SONG_SELECTED'.
  if (action.type === 'SONG_SELECTED') {//for SONG_SELECTED type, t
    return action.payload;
  }
  //In the beginning, there is not song selected. Null. In this case, there is not .type at all. In this case, null will be returned.
  return selectedSong;//but, if there is no SONG_SELECTED type in the action, than the reducer will return the currently selected song

};

export default combineReducers({
  songs: songsReducer,//these keys of the reducers will be the keys in the central store object
  selectedSong: selectedSongReducer,//so this selectedSong will be available in state.selectedSong
});
