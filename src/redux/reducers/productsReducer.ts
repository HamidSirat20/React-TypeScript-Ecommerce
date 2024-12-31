import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateProductType, Product } from "../../types/ProductType";
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
  { sortBy: string; limit: number },
  { rejectValue: string }
>("products/getAllProducts", async ({ sortBy, limit }, { rejectWithValue }) => {
  try {
    const response = axios.get(
      `${config.baseUrl}/products?sort=${sortBy}&limit=${limit}`
    );
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

export const createProduct = createAsyncThunk<Product, CreateProductType>(
  "createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config.baseUrl}/products`, product);
      const data = await response.data;
      console.log("Product created successfully:", data);
      return data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.message);
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
      .addCase(getAllProducts.pending, (state) => {
        (state.products = []),
          (state.isSuccess = false),
          (state.error = "pending"),
          (state.status = "loading"),
          (state.allProducts = []);
      })
      .addCase(getAllProducts.rejected, (state) => {
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
      .addCase(getSingleProduct.pending, (state) => {
        (state.isSuccess = false),
          (state.error = "pending"),
          (state.status = "loading"),
          (state.singleProduct = null);
      })
      .addCase(getSingleProduct.rejected, (state) => {
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
      )
      //create product
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = "idle";
      })
      .addCase(createProduct.rejected, (state) => {
        state.status = "failed";
        state.error = "rejected";
      })
      .addCase(createProduct.fulfilled, (state, actions) => {
        state.products.push(actions.payload);
        state.allProducts.push(actions.payload);
        state.isSuccess = true;
        state.status = "success";
      });
  },
});

export const productsReducer = productsSlice.reducer;
export const { filterByCategory } = productsSlice.actions;
