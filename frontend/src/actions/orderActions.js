import {adminOrdersFail, adminOrdersRequest, adminOrdersSuccess, createOrderFail, createOrderRequest, createOrderSuccess, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, orderDetailFail, orderDetailRequest, orderDetailSuccess, updateOrderFail, updateOrderRequest, updateOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess } from '../slices/orderSlice';
import axios from 'axios';

export const createOrder = order => async(dispatch) => {
    try {
       console.log('createOrder action called with:', order);
       dispatch(createOrderRequest())
       const token = localStorage.getItem('token');
       console.log('Token from localStorage:', token);
       const config = {
           headers: {
               'Authorization': token ? `Bearer ${token}` : ''
           }
       };
       console.log('Making API call to /api/v1/order/new with config:', config);
       const {data} = await axios.post(`/api/v1/order/new`, order, config)
       console.log('Order creation successful, response:', data);
       console.log('Dispatching createOrderSuccess with payload:', { order: data.order });
       dispatch(createOrderSuccess({ order: data.order }))
       console.log('createOrderSuccess action dispatched');
    } catch (error) {
        console.error('Order creation failed:', error);
        console.error('Error response:', error.response);
        dispatch(createOrderFail(error.response?.data?.message || 'Order creation failed'))
    }
}
export const userOrders = async(dispatch) => {
    try {
       dispatch(userOrdersRequest())
       const token = localStorage.getItem('token');
       const config = {
           headers: {
               'Authorization': token ? `Bearer ${token}` : ''
           }
       };
       const {data} = await axios.get(`/api/v1/myorders`, config)
       dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}
export const orderDetail = id => async(dispatch) => {
    try {
       dispatch(orderDetailRequest())
       const token = localStorage.getItem('token');
       const config = {
           headers: {
               'Authorization': token ? `Bearer ${token}` : ''
           }
       };
       const {data} = await axios.get(`/api/v1/order/${id}`, config)
       dispatch(orderDetailSuccess(data))
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message))
    }
}

export const adminOrders = async(dispatch) => {
    try {
       dispatch(adminOrdersRequest())
       const token = localStorage.getItem('token');
       const config = {
           headers: {
               'Authorization': token ? `Bearer ${token}` : ''
           }
       };
       const {data} = await axios.get(`/api/v1/admin/orders`, config)
       dispatch(adminOrdersSuccess(data))
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message))
    }
}

export const deleteOrder = id => async(dispatch) => {
    try {
       dispatch(deleteOrderRequest())
       const token = localStorage.getItem('token');
       const config = {
           headers: {
               'Authorization': token ? `Bearer ${token}` : ''
           }
       };
       await axios.delete(`/api/v1/admin/order/${id}`, config)
       dispatch(deleteOrderSuccess())
    } catch (error) {
       dispatch(deleteOrderFail(error.response.data.message))
    }
}

export const updateOrder = (id, orderData)  => async(dispatch) => {
    try {
       dispatch(updateOrderRequest())
       const token = localStorage.getItem('token');
       const config = {
           headers: {
               'Authorization': token ? `Bearer ${token}` : ''
           }
       };
       const { data} = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)
       dispatch(updateOrderSuccess(data))
    } catch (error) {
       dispatch(updateOrderFail(error.response.data.message))
    }
}