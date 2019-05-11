import { createSlice, createReducer } from "redux-starter-kit";

const {actions, reducer : todosReducer} = createSlice({
  slice: "todos",
  initialState: {},
  reducers: {
    loadTodos(state, action) {
      const items = action.payload
      return items
    },
    newTodo(state, action) {
      const item = action.payload
      state.push(item)
    }
  }
});

export default todosReducer

export const { loadTodos, newTodo } = actions

export const fetchTodos = () => async (dispatch) => {
  try {
    const records = await fetch("/p1/todos").then(res => res.json())
    dispatch(loadTodos(records))
  } catch(error) {
    console.log(error)
  }
}

export const fetchNewTodo = () => async (dispatch) => {
  try {
    const record = await fetch("/p1/todos/new").then(res => res.json())
    dispatch(newTodo(record))
  } catch(error) {
    console.log(error)
  }
}
