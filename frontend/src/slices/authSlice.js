import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
        isUpdated: false
    },
    reducers: {
        loginRequest(state, action){
            console.log('loginRequest called, setting loading to true');
            return{
                ...state,
                loading: true,
                
            }

        },
        loginSuccess(state, action){
            console.log('loginSuccess called, setting user and isAuthenticated');
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            }
        },
        loginFail(state, action){
            console.log('loginFail called, setting loading to false and error:', action.payload);
            return{
                ...state,
            loading: false,
            error: action.payload
            }
            
        },
        clearError(state,action){
            console.log('clearError called, clearing error');
            return{
                ...state,
                error: null
            }
        },
         registerRequest(state, action){
            console.log('registerRequest called, setting loading to true');
            return{
                ...state,
                loading: true,
                
            }

        },
        registerSuccess(state, action){
            console.log('registerSuccess called, setting user and isAuthenticated');
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            }
        },
        registerFail(state, action){
            console.log('registerFail called, setting loading to false and error:', action.payload);
            return{
                ...state,
            loading: false,
            error: action.payload
            }
            
        },
        loadUserRequest(state, action){
            console.log('loadUserRequest called, setting loading to true');
            return{
                ...state,
                loading: true,
                
            }
        },
        loadUserSuccess(state, action){
            console.log('loadUserSuccess called, setting user and isAuthenticated');
            return{
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user,
                error: null
            }
        },
        loadUserFail(state, action){
            console.log('loadUserFail called, setting loading to false and error:', action.payload);
            return{
                ...state,
            loading: false,
            error: action.payload
            }
            
        },
        logout(state, action) {
            console.log('logout called, resetting all state');
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: null,
                isUpdated: false
            }
        },
         updateProfileRequest(state, action){
            console.log('updateProfileRequest called, setting loading to true and isUpdated to false');
            return{
                ...state,
                loading: true,
                isUpdated: false,
                
            }

        },
        updateProfileSuccess(state, action){
            console.log('updateProfileSuccess called, setting isUpdated to true');
            return{
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true,
            }
        },
        updateProfileFail(state, action){
            console.log('updateProfileFail called, setting loading to false and error:', action.payload);
            return{
                ...state,
            loading: false,
            error: action.payload
            }
            
        },
        UPDATE_PROFILE_RESET(state, action) {
            console.log('UPDATE_PROFILE_RESET called, resetting isUpdated to false');
            return {
                ...state,
                isUpdated: false
            }
        }
    }
});

const{ actions, reducer } = authSlice;

export const {loginRequest, loginSuccess, loginFail,clearError,registerRequest,registerSuccess,registerFail,loadUserRequest,loadUserSuccess,loadUserFail, logout,updateProfileRequest,updateProfileSuccess,updateProfileFail, UPDATE_PROFILE_RESET} = actions;

export default reducer;