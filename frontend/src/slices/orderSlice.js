import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetail: {},
        userOrders: [],
        adminOrders: [],
        paymentInfo: {},      // Added paymentInfo to state
        loading: false,
        isOrderDeleted: false,
        isOrderUpdated: false,
        error: null
    },
    reducers: {
        createOrderRequest(state, action) {
            state.loading = true;
        },
        createOrderSuccess(state, action) {
            console.log('Redux slice: createOrderSuccess called with action:', action);
            console.log('Redux slice: action.payload:', action.payload);
            state.loading = false;
            state.orderDetail = action.payload.order;
            state.paymentInfo = action.payload.paymentInfo || {};  // Set paymentInfo
        },
        createOrderFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        clearError(state, action) {
            state.error = null;
        },

        userOrdersRequest(state, action) {
            state.loading = true;
        },
        userOrdersSuccess(state, action) {
            state.loading = false;
            state.userOrders = action.payload.orders;
        },
        userOrdersFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        orderDetailRequest(state, action) {
            state.loading = true;
        },
        orderDetailSuccess(state, action) {
            state.loading = false;
            state.orderDetail = action.payload.order;
        },
        orderDetailFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        adminOrdersRequest(state, action) {
            state.loading = true;
        },
        adminOrdersSuccess(state, action) {
            state.loading = false;
            state.adminOrders = action.payload.orders;
        },
        adminOrdersFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        deleteOrderRequest(state, action) {
            state.loading = true;
        },
        deleteOrderSuccess(state, action) {
            state.loading = false;
            state.isOrderDeleted = true;
        },
        deleteOrderFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        updateOrderRequest(state, action) {
            state.loading = true;
        },
        updateOrderSuccess(state, action) {
            state.loading = false;
            state.isOrderUpdated = true;
        },
        updateOrderFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        clearOrderDeleted(state, action) {
            state.isOrderDeleted = false;
        },
        clearOrderUpdated(state, action) {
            state.isOrderUpdated = false;
        },

        setPaymentInfo(state, action) {
            state.paymentInfo = action.payload;
        },
        clearPaymentInfo(state, action) {
            state.paymentInfo = {};
        }
    }
});

const { actions, reducer } = orderSlice;

export const {
    createOrderFail,
    createOrderSuccess,
    createOrderRequest,
    clearError,
    userOrdersFail,
    userOrdersSuccess,
    userOrdersRequest,
    orderDetailFail,
    orderDetailSuccess,
    orderDetailRequest,
    adminOrdersFail,
    adminOrdersRequest,
    adminOrdersSuccess,
    deleteOrderFail,
    deleteOrderRequest,
    deleteOrderSuccess,
    updateOrderFail,
    updateOrderRequest,
    updateOrderSuccess,
    clearOrderDeleted,
    clearOrderUpdated,
    setPaymentInfo,    // Exported action
    clearPaymentInfo   // Exported action
} = actions;

export default reducer;
