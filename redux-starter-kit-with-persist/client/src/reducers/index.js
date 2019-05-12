import { combineReducers } from "redux-starter-kit";

import counterAReducer, { increment as incrementA, addFive } from "./counterA";
import counterBReducer, { increment as incrementB, addTwo } from "./counterB";
import todosReducer, { loadTodos, fetchTodos, fetchNewTodo } from "./todosReducer"

const rootReducer = combineReducers({
  counterA: counterAReducer,
  counterB: counterBReducer,
  todos: todosReducer
})

export default rootReducer

export const actionCreators = {
  incrementA,
  incrementB,
  addTwo,
  addFive,
  fetchTodos,
  fetchNewTodo
};
