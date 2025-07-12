import axios from 'axios';
import {
  productsFail,
  productsRequest,
  productsSuccess
} from '../slices/productsSlice';

export const getProducts = (keyword, price, currentPage) => async (dispatch) => {
  const baseURL = process.env.REACT_APP_BASE_URL;

  try {
    dispatch(productsRequest());
    let link = `${baseURL}/api/v1/products?page=${currentPage}`;
    if(keyword) {
      link += `&keyword=${keyword}`
    }
    if(price && price[0] !== undefined && price[1] !== undefined){
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
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
