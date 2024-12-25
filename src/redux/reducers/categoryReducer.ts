import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { config } from "../../config";
import Category from "../../types/CategoryType";

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

export const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<string[]>(
        `${config.baseUrl}/products/categories`
      );
      const data = response.data;
      return data.map((name) => ({ name }));
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(getAllCategories.pending, (state, actions) => {
        (state.categories = []),
          (state.error = "pending"),
          (state.status = "idle");
      })
      .addCase(getAllCategories.rejected, (state, actions) => {
        (state.categories = []),
          (state.error = "rejected"),
          (state.status = "error");
      })
      .addCase(
        getAllCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.status = "success";
          state.categories = action.payload;
          state.error = "success";
        }
      );
  },
});

export const categoryReducer = categoriesSlice.reducer;
