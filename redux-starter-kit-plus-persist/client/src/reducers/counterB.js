import { createSlice } from "redux-starter-kit";
import { addFive } from "./counterA";

const counterSliceB = createSlice({
  slice: "sliceB",
  initialState: 0,
  reducers: {
    increment(state, action) {
      return state + 1;
    },
    addTwo(state, action) {
      return state + 2;
    }
  },
  extraReducers: {
    [addFive](state, action) {
      return state + 5;
    }
  }
});

console.log(counterSliceB);
console.log("addFive, imported from A to B: ", addFive);

const { actions, reducer } = counterSliceB;

export const { increment, addTwo } = actions;

export default reducer;
