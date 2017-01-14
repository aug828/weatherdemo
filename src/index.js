import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import App from './App';
import {fetchForecastDataReducer} from './reducer';
import initialState from './constants/initialState';
import './style/index.css';

// use Redux DevTools Extension to debug redux store
// need to install the extension in the browser
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// promise middleware will turn Promise into FSA
const middleware = [promiseMiddleware, createLogger()];

// create store
const store = createStore(
   fetchForecastDataReducer,
   initialState,
   composeEnhancers(
      applyMiddleware(...middleware)
   )
);

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>,
  document.getElementById('root')
);
