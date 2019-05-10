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
   const todos = await fetch("/p1/todos")
   .then(resp => resp.json())
   .then(resp => {
     dispatch(loadTodos(resp))
   })
   .catch(error => {
     console.log(error)
   })
}

export const fetchNewTodo = () => async (dispatch) => {
   const todos = await fetch("/p1/todos/new")
   .then(resp => resp.json())
   .then(resp => {
     dispatch(newTodo(resp))
   })
   .catch(error => {
     console.log(error)
   })
}

// export const fetchTodos = () => async (dispatch) => {
//   try {
//     const todos = await fetch("/p1/todos")
//     dispatch(loadTodos(todos))
//   } catch(error) {
//     console.log(error)
//   }
// }
