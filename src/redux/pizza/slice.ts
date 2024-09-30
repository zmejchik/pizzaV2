import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState, Status } from "./types";
import { fetchPizzas } from "./asyncActions";

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading | success | error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(
        fetchPizzas.fulfilled,
        (state, action: PayloadAction<Pizza[]>) => {
          state.items = action.payload;
          state.status = Status.SUCCSESS;
        }
      )
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
