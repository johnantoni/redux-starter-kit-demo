import { createSlice, createReducer } from "redux-starter-kit";

import { addTwo } from "./counterB";

// const reducers = createReducer({}, {
//   increment(state, action) {
//     return state + 1;
//   },
//   addFive(state, action) {
//     return state + 5;
//   }
// })

const counterSliceA = createSlice({
  slice: "sliceA",
  initialState: 0,
  reducers: {
    increment(state, action) {
      return state + 1;
    },
    addFive(state, action) {
      return state + 5;
    }
  },
  extraReducers: {
    [addTwo](state, action) {
      return state + 2;
    }
  }
});

console.log(counterSliceA);
console.log("addTwo, imported from B to A: ", addTwo);

const { actions, reducer } = counterSliceA;

export const { increment, addFive } = actions;

export default reducer;
