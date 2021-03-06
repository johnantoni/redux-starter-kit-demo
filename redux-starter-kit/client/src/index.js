import React from "react";
import ReactDOM from 'react-dom'
import { combineReducers, configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { connect, Provider } from "react-redux";

import '../scss/style.scss';
import App from "./app";

import { actionCreators } from './reducers'
import store from './store';

const mapState = state => state;

const ConnectedApp = connect(
  mapState,
  actionCreators
)(App);

const rootElement = document.getElementById("root");

// ------

ReactDOM.render(
  <Provider store={store}>
      <ConnectedApp />
  </Provider>,
  rootElement
)
