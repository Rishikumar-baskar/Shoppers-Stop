import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  error: null,
  resPerPage: 4,
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
    adminProductsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    adminProductsSuccess(state, action){
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = Array.isArray(action.payload.products) ? action.payload.products.length : 0;
      state.resPerPage = Array.isArray(action.payload.products) ? action.payload.products.length : 0;
    },
    adminProductsFail(state, action){
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state){
      state.error = null;
    }
  }
});

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  clearError

} = productsSlice.actions;

export default productsSlice.reducer;
