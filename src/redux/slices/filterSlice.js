import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.categoryId += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = filterSlice.actions;

export default filterSlice.reducer;
