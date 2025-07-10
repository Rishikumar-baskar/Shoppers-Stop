import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  error: null,
  resPerPage: 2,
};

const productsSlice = createSlice({
  name: 'productsState',
  initialState,
  reducers: {
    productsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resPerPage = action.payload.resPerPage;
    },
    productsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFail,
} = productsSlice.actions;

export default productsSlice.reducer;
