import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import thunk from "redux-thunk";
import rootReducer from './reducers'

function configureAppStore(preloadedState) {
  const store = configureStore({
    preloadedState: preloadedState,
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), thunk]
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}

let store = configureAppStore({
  counterA: 20,
  counterB: 10,
  todos: []
})

export default store
