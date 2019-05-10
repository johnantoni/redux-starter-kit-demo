import { configureStore, getDefaultMiddleware } from "redux-starter-kit";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'

// const persistConfig = {
//   key: 'root',
//   storage: storage,
// }
//
// const persistedReducer = persistReducer(persistConfig, rootReducer)

function configureAppStore(preloadedState) {
  const store = configureStore({
    preloadedState: preloadedState,
    // reducer: persistedReducer,
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunk]
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  // console.log("Initial state: ", store.getState());

  return store
}

let store = configureAppStore({
  counterA: 20,
  counterB: 10,
  todos: []
})

export default store

// export default store;

// how to setup persist
// https://github.com/reduxjs/redux-starter-kit/issues/121
// https://stackoverflow.com/questions/46673204/react-redux-state-lost-after-refresh?rq=1
// https://github.com/rt2zz/redux-persist#basic-usage

// rootReducer
// https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8

// configureStore
// https://redux-starter-kit.js.org/api/configurestore
