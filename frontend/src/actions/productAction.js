import axios from 'axios';
import { productFail, productRequest, productSuccess } from '../slices/productSlice';

export const getProduct = id=> async (dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL

    try{
        dispatch(productRequest());
        const{ data } = await axios.get(`${baseURL}/api/v1/product/${id}`);
        dispatch(productSuccess(data));
    
    }catch(error){
        //handle error
        dispatch(productFail(error.response.data.mesage))
    }
}