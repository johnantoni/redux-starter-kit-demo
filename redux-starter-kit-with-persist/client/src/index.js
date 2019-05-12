import React from "react";
import ReactDOM from 'react-dom'
import { combineReducers, configureStore, getDefaultMiddleware } from "redux-starter-kit";
import { connect, Provider } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import '../scss/style.scss';
import App from "./app";

import { actionCreators } from './reducers'
import { store, persistor } from './store';

const mapState = state => state;

const ConnectedApp = connect(
  mapState,
  actionCreators
)(App);

const rootElement = document.getElementById("root");

// ------

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedApp />
    </PersistGate>
  </Provider>,
  rootElement
)
