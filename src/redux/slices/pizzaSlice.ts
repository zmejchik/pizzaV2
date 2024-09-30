import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { CartItem } from "./cartSlice";

export type FetchPizzasArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
  "pizza/fetchPizzasStatus",
  async (params: FetchPizzasArgs) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://66eaf37e55ad32cda47b1447.mockapi.io/items?${category}&page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCSESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

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

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
