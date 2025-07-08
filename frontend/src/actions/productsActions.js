import axios from 'axios';
import { productsFail, productsRequest, productsSuccess } from '../slices/productsSlice';

export const getProducts = async (dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL

    try{
        dispatch(productsRequest())
        const{ data } = await axios.get(`${baseURL}/api/v1/products`);
        dispatch(productsSuccess(data))
    
    }catch(error){
        //handle error
        dispatch(productsFail(error.response.data.mesage))
    }
}