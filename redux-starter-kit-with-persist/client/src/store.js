import { configureStore, getDefaultMiddleware } from "redux-starter-kit";

import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

function configureAppStore(preloadedState) {
  const store = configureStore({
    preloadedState: preloadedState,
    reducer: persistedReducer,
    middleware: [...getDefaultMiddleware(), thunk]
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  console.log("Initial state: ", store.getState());

  return store
}

const store = configureAppStore({
  counterA: 20,
  counterB: 10,
  todos: []
})

const persistor = persistStore(store)

export {
  store, persistor  
}
