import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";//1. applyMiddleware, compose will be needed for the redux debug tool
import reduxThunk from 'redux-thunk';//thunk is a middleware, used for async axios requests in react. 1-step for thunk

import App from './components/App';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//2. step for the redux debug
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk)),// 3 step for redux debuggging. Also, 2 step for thunk (notice that thunk is in the ().
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
