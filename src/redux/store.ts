import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./reducers/productsReducer";
import { categoryReducer } from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    categoryReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
