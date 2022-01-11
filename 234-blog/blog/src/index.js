import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";//applyMiddleware is needed to connect thunk with redux
import thunk from 'redux-thunk';//importing thunk

import App from './components/App';
import reducers from './reducers';

//We will create a blog post site. We will fetch some data from this api: https://jsonplaceholder.typicode.com/

const store = createStore(reducers, applyMiddleware(thunk));//creating store and using applyMiddleware - connecting the store with thunk middleware

ReactDOM.render(
  //here below we pass the store as a prop to the app
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
