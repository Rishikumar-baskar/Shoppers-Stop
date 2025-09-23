import axios from 'axios';
import { createReviewFail, createReviewRequest, createReviewSuccess, productFail, productRequest, productSuccess } from '../slices/productSlice';
import { getToken } from '../utils/tokenUtils';

export const getProduct = id=> async (dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

    try{
        dispatch(productRequest());
        const{ data } = await axios.get(`${baseURL}/api/v1/product/${id}`);
        dispatch(productSuccess(data));
    
    }catch(error){
        //handle error
        dispatch(productFail(error.response.data.mesage))
    }
}
export const createReview = reviewData=> async (dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

    try{
        const token = getToken();
        const config = {
            headers : {
                'Content-type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            }
        }
        dispatch(createReviewRequest());
        const{ data } = await axios.put(`${baseURL}/api/v1/review/`,reviewData, config);
        dispatch(createReviewSuccess(data));
    
    }catch(error){
        //handle error
        dispatch(createReviewFail(error.response.data.mesage))
    }
}