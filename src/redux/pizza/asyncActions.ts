import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchPizzasArgs, Pizza } from "./types";
import axios from "axios";

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
