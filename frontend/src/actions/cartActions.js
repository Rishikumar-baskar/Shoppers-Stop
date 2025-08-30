import {addCartItemRequest, addCartItemSuccess, addCartItemFail} from '../slices/cartSlice';
import axios from 'axios';





export const addCartItem = (id, quantity) => async(dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

    try{
        dispatch(addCartItemRequest())
        const {data} = await axios.get(`${baseURL}/api/v1/product/${id}`)
        dispatch(addCartItemSuccess({
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].image,
            stock: data.product.stock,
            quantity
        }))
    }catch (error) {
        console.error('Add to cart error:', error);
        dispatch(addCartItemFail(error.response?.data?.message || error.message || 'Failed to add item to cart'));
    }
}