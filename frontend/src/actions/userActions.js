import { clearError, loginFail, loginRequest, loginSuccess, registerRequest,registerSuccess,registerFail, loadUserRequest,loadUserSuccess,loadUserFail, logout } from "../slices/authSlice";
import axios from 'axios';
import { setToken, getToken, removeToken } from '../utils/tokenUtils';

export const login = (email, password) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL
        console.log('Login attempt - Base URL:', baseURL);
        console.log('Login attempt - Email:', email);

    try{
        dispatch(loginRequest())
        const {data} = await axios.post(`${baseURL}/api/v1/login`, {email,password},{ withCredentials: true }   );
        
        console.log('Login successful - Data:', data);
        
        // Store token in localStorage
        setToken(data.token);
        
        dispatch(loginSuccess(data))

    }catch(error){
        console.error('Login error details:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        dispatch(loginFail(errorMessage))
    }
}



export const clearAuthError = () => (dispatch) => {
    dispatch(clearError());
};

export const register = (userData) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL

    try{
        dispatch(registerRequest())
        const config = {
            headers:{
                'Content-type': 'multipart/form-data'
            }
        }
        const {data} = await axios.post(`${baseURL}/api/v1/register`, userData,config);
        console.info('register:',data)
        
        // Store token in localStorage
        setToken(data.token);
        
        dispatch(registerSuccess(data))

    }catch(error){
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        dispatch(registerFail(errorMessage))
    }
}

export const loadUser = () => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL

    try{
        dispatch(loadUserRequest());
        
        // Get token from localStorage
        const token = getToken();
        
        if (!token) {
            dispatch(loadUserFail('No token found'));
            return;
        }
        
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
       
        const {data} = await axios.get(`${baseURL}/api/v1/myprofile`, config);
        
        dispatch(loadUserSuccess(data));

    }catch(error){
        // If token is invalid, remove it from localStorage
        removeToken();
        const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
        dispatch(loadUserFail(errorMessage));
    }
}

export const logoutUser = () => async (dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    
    try {
        // Call backend logout endpoint
        await axios.get(`${baseURL}/api/v1/logout`, { withCredentials: true });
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        // Always clear local storage and state
        removeToken();
        dispatch(logout());
    }
};