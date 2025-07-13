import { clearError, loginFail, loginRequest, loginSuccess, registerRequest,registerSuccess,registerFail } from "../slices/authSlice";
import axios from 'axios';

export const login = (email, password) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL

    try{
        dispatch(loginRequest())
        const {data} = await axios.post(`${baseURL}/api/v1/login`, {email,password});
        dispatch(loginSuccess(data))

    }catch(error){
        dispatch(loginFail(error.response.data.message))

    }
}



export const clearAuthError = (dispatch) =>{
    dispatch(clearError());
}

export const register = (userData) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL

    try{
        dispatch(registerRequest())
        const config = {
            headers:{
                'Content-type': 'mutipart/form-data'
            }
        }
        const {data} = await axios.post(`${baseURL}/api/v1/register`, {userData,config});
        dispatch(registerSuccess(data))

    }catch(error){
        dispatch(registerFail(error.response.data.message))

    }
}