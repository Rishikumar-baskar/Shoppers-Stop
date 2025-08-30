import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[],
        loading: false
    },
    reducers: {
        addCartItemRequest(state, action){
            return{
                ...state,
                loading: true,
            }
        },
        addCartItemSuccess(state, action){
            const item = action.payload
            const isItemExist = state.items.find( i => i.product === item.product);

            if(isItemExist){
                // Item already exists, just update loading state
                return {
                    ...state,
                    loading: false,
                }
            } else {
                // Add new item to cart
                const newState = {
                    items: [...state.items, item],
                    loading: false,
                }
                // Update localStorage
                localStorage.setItem('cartItems', JSON.stringify(newState.items));
                return newState;
            }
        },
        addCartItemFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const{ actions, reducer } = cartSlice;

export const {addCartItemRequest, addCartItemSuccess, addCartItemFail} = actions;

export default reducer;