import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/ProductType";
import axios, { AxiosError } from "axios";
import { config } from "../../config";

interface ProductsState {
  products: Product[];
  allProducts: Product[];
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
  isSuccess: boolean;
  singleProduct: Product | null;
}

const initialState: ProductsState = {
  allProducts: [] as Product[],
  products: [] as Product[],
  status: "idle",
  error: null,
  isSuccess: false,
  singleProduct: null,
};

export const getAllProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/getAllProducts", async (_, { rejectWithValue }) => {
  try {
    const response = axios.get(`${config.baseUrl}/products`);
    const data = (await response).data;
    return data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});

export const getSingleProduct = createAsyncThunk<Product, { id: number }>(
  "getSingleProduct",
  async ({ id }) => {
    try {
      const response = axios.get(`${config.baseUrl}/products/${id}`);
      const data = (await response).data;
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return err.response;
    }
  }
);

const productsSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    filterByCategory: (state, actions: PayloadAction<string>) => {
      state.products = state.allProducts.filter(
        (product) => product.category === actions.payload
      );
    },
    clearFilter: (state) => {
      state.products = state.allProducts;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(getAllProducts.pending, (state, actions) => {
        (state.products = []),
          (state.isSuccess = false),
          (state.error = "pending"),
          (state.status = "loading"),
          (state.allProducts = []);
      })
      .addCase(getAllProducts.rejected, (state, actions) => {
        (state.products = []),
          (state.isSuccess = false),
          (state.error = "rejected"),
          (state.status = "failed"),
          (state.allProducts = []);
      })
      .addCase(
        getAllProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "success";
          state.products = action.payload;
          state.isSuccess = true;
          state.allProducts = action.payload;
        }
      )

      //get one product
      .addCase(getSingleProduct.pending, (state, actions) => {
        (state.isSuccess = false),
          (state.error = "pending"),
          (state.status = "loading"),
          (state.singleProduct = null);
      })
      .addCase(getSingleProduct.rejected, (state, actions) => {
        (state.isSuccess = false),
          (state.error = "rejected"),
          (state.status = "failed"),
          (state.singleProduct = null);
      })
      .addCase(
        getSingleProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.status = "success";
          state.singleProduct = action.payload;
          state.isSuccess = true;
        }
      );
  },
});

export const productsReducer = productsSlice.reducer;
export const { filterByCategory } = productsSlice.actions;
