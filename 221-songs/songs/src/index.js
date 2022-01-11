//import from third party dependencies
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'; //importing provider
import { createStore } from 'redux';

//imports from my code
import App from './components/App';
import reducers from './reducers';//data in the store is stored in the reducers.

ReactDOM.render(

  //Provider provides all the data from the central store to our app.
  <Provider store = { createStore(reducers)}>{/*here we pass the central store to the provider. As a props. The store
  is created with the createStore() and from the reducers. The Provider provides the app the connect() function
  which will be needed to get and pass data from the store.*/}
    <App/>
  </Provider>,

  document.querySelector('#root')
);

/*
This app has stores 4 songs in redux. It displays a list of 4 songs. If we click on any of the listed songs, the app will show
the song details (title, duration), in a separate component.
 */
