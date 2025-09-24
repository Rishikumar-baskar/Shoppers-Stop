import axios from 'axios';
import { getToken } from '../utils/tokenUtils';
import {
  productsFail,
  productsRequest,
  productsSuccess,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFail,
  clearError
} from '../slices/productsSlice';

export const getProducts = (keyword, price,category,rating, currentPage) => async (dispatch) => {
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000';

  try {
    dispatch(productsRequest());
    let link = `${baseURL}/api/v1/products?page=${currentPage}`;
    if(keyword) {
      link += `&keyword=${keyword}`
    }
    if(price){
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }
    if(category){
      link += `&category=${category}`;
    }
     if(rating){
      link += `&ratings=${rating}`;
    }

    const { data } = await axios.get(link);

    dispatch(productsSuccess({
      products: data.products,
      productsCount: data.productsCount,
      resPerPage: data.resPerPage
    }));

  } catch (error) {
    dispatch(productsFail(error.response?.data?.message || error.message));
  }

};

export const getAdminProducts = () => async (dispatch) => {
  const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000';
  try {
    dispatch(adminProductsRequest());
    const token = getToken();
    const config = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    };
    const { data } = await axios.get(`${baseURL}/api/v1/admin/products`, config);
    dispatch(adminProductsSuccess(data));
  } catch (error) {
    dispatch(adminProductsFail(error.response?.data?.message || error.message));
  }
};
