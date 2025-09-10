import {
    createOrderFail,
    createOrderRequest,
    createOrderSuccess,
    userOrdersFail,
    userOrdersRequest,
    userOrdersSuccess,
    orderDetailFail,
    orderDetailRequest,
    orderDetailSuccess,
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess
} from '../slices/orderSlice';
import axios from 'axios';

// Utility function to create config
const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Authorization': token ? `Bearer ${token}` : ''
        }
    };
};

export const createOrder = order => async (dispatch) => {
    try {
        console.log('createOrder action called with:', order);
        dispatch(createOrderRequest());
        const config = getConfig();
        console.log('Making API call to /api/v1/order/new with config:', config);
        const { data } = await axios.post('/api/v1/order/new', order, config);
        console.log('Order creation successful, response:', data);
        dispatch(createOrderSuccess({ order: data.order, paymentInfo: data.paymentInfo }));
    } catch (error) {
        console.error('Order creation failed:', error);
        dispatch(createOrderFail(error.response?.data?.message || error.message || 'Order creation failed'));
    }
};

export const userOrders = () => async (dispatch) => {
    try {
        dispatch(userOrdersRequest());
        const config = getConfig();
        const { data } = await axios.get('/api/v1/myorders', config);
        dispatch(userOrdersSuccess(data));
    } catch (error) {
        dispatch(userOrdersFail(error.response?.data?.message || error.message || 'Failed to fetch orders'));
    }
};

export const orderDetail = id => async (dispatch) => {
    try {
        dispatch(orderDetailRequest());
        const config = getConfig();
        const { data } = await axios.get(`/api/v1/order/${id}`, config);
        dispatch(orderDetailSuccess(data));
    } catch (error) {
        dispatch(orderDetailFail(error.response?.data?.message || error.message || 'Failed to fetch order detail'));
    }
};

export const adminOrders = () => async (dispatch) => {
    try {
        dispatch(adminOrdersRequest());
        const config = getConfig();
        const { data } = await axios.get('/api/v1/admin/orders', config);
        dispatch(adminOrdersSuccess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.response?.data?.message || error.message || 'Failed to fetch admin orders'));
    }
};

export const deleteOrder = id => async (dispatch) => {
    try {
        dispatch(deleteOrderRequest());
        const config = getConfig();
        await axios.delete(`/api/v1/admin/order/${id}`, config);
        dispatch(deleteOrderSuccess());
    } catch (error) {
        dispatch(deleteOrderFail(error.response?.data?.message || error.message || 'Failed to delete order'));
    }
};

export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch(updateOrderRequest());
        const config = getConfig();
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);
        dispatch(updateOrderSuccess(data));
    } catch (error) {
        dispatch(updateOrderFail(error.response?.data?.message || error.message || 'Failed to update order'));
    }
};
