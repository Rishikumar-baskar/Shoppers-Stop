import { clearError, loginFail, loginRequest, loginSuccess, registerRequest,registerSuccess,registerFail, loadUserRequest,loadUserSuccess,loadUserFail, logout, updateProfileRequest, updateProfileSuccess, updateProfileFail,updatePasswordFail,updatePasswordSuccess,updatePasswordRequest, forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFail, resetPasswordRequest, resetPasswordSuccess, resetPasswordFail } from "../slices/authSlice";
import axios from 'axios';
import { setToken, getToken, removeToken } from '../utils/tokenUtils';

export const login = (email, password) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'
        console.log('Login attempt - Base URL:', baseURL);
        console.log('Login attempt - Email:', email);
        console.log('Environment variables:', process.env);

    try{
        dispatch(loginRequest())
        const url = `${baseURL}/api/v1/login`;
        console.log('Making request to:', url);
        const {data} = await axios.post(url, {email,password},{ withCredentials: true }   );
        
        console.log('Login successful - Data:', data);
        
        // Store token in localStorage
        setToken(data.token);
        
        dispatch(loginSuccess(data))

    }catch(error){
        console.error('Login error details:', error);
        console.error('Error response:', error.response);
        console.error('Error request:', error.request);
        const errorMessage = error.response?.data?.message || error.message || 'Login failed';
        dispatch(loginFail(errorMessage))
    }
}



export const clearAuthError = () => (dispatch) => {
    dispatch(clearError());
};

export const register = (userData) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

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
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

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
        console.error('LoadUser error:', error);
        // If token is invalid, remove it from localStorage
        removeToken();
        const errorMessage = error.response?.data?.message || error.message || 'Authentication failed';
        dispatch(loadUserFail(errorMessage));
    }
}

export const logoutUser = () => async (dispatch) => {
    const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000';
    
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
export const updateProfile = (userData) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

    try{
        dispatch(updateProfileRequest())
        
        // Get token from localStorage
        const token = getToken();
        
        if (!token) {
            dispatch(updateProfileFail('No token found'));
            return;
        }
        
        const config = {
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        const {data} = await axios.put(`${baseURL}/api/v1/update`, userData, config);
        
        console.log('Profile update successful:', data);
        dispatch(updateProfileSuccess(data))

    }catch(error){
        console.error('Profile update error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Profile update failed';
        dispatch(updateProfileFail(errorMessage))
    }
};
export const updatePassword = (formData) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

    try{
        console.log('updatePassword - Starting password update...');
        console.log('updatePassword - Form data:', formData);
        dispatch(updatePasswordRequest())
        
        // Get token from localStorage
        const token = getToken();
        console.log('updatePassword - Token found:', !!token);
        
        if (!token) {
            console.log('updatePassword - No token found');
            dispatch(updatePasswordFail('No token found'));
            return;
        }
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        
        console.log('updatePassword - Making request to:', `${baseURL}/api/v1/password/change`);
        console.log('updatePassword - Request config:', config);
        
        const response = await axios.put(`${baseURL}/api/v1/password/change`, formData, config);
        
        console.log('updatePassword - Response:', response.data);
        console.log('Password update successful');
        dispatch(updatePasswordSuccess())

    }catch(error){
        console.error('updatePassword - Error details:', error);
        console.error('updatePassword - Error response:', error.response?.data);
        console.error('updatePassword - Error status:', error.response?.status);
        console.error('updatePassword - Error message:', error.response?.data?.message);
        
        const errorMessage = error.response?.data?.message || error.message || 'Password update failed';
        console.error('updatePassword - Final error message:', errorMessage);
        
        dispatch(updatePasswordFail(errorMessage))
    }
};
export const forgotPassword = (formData) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000'

    try{
        console.log('forgotPassword - Starting password update...');
        console.log('forgotPassword - Form data:', formData);
        dispatch(forgotPasswordRequest())
        
        // Get token from localStorage
       // const token = getToken();
       // console.log('updatePassword - Token found:', !!token);
        
       // if (!token) {
       //     console.log('updatePassword - No token found');
        //    dispatch(updatePasswordFail('No token found'));
         //   return;
       // }
        
        const config = {
            headers: {
                'Content-type': 'application/json',
               // 'Authorization': `Bearer ${token}`
            }
        }
        
       // console.log('updatePassword - Making request to:', `${baseURL}/api/v1/password/change`);
       // console.log('updatePassword - Request config:', config);
        
        const {data} = await axios.post(`${baseURL}/api/v1/password/forgot`, formData, config);
        
      //  console.log('updatePassword - Response:', response.data);
       // console.log('Password update successful');
        dispatch(forgotPasswordSuccess(data));

    }catch(error){
       // console.error('updatePassword - Error details:', error);
       // console.error('updatePassword - Error response:', error.response?.data);
      //  console.error('updatePassword - Error status:', error.response?.status);
      //  console.error('updatePassword - Error message:', error.response?.data?.message);
        
        const errorMessage = error.response?.data?.message || error.message || 'Password update failed';
       // console.error('updatePassword - Final error message:', errorMessage);
        
        dispatch(forgotPasswordFail(errorMessage))
    }
};
export const resetPassword = (formData,token) => async (dispatch) =>{
        const baseURL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:3000'

    try{
        console.log('forgotPassword - Starting password update...');
        console.log('forgotPassword - Form data:', formData);
        dispatch(resetPasswordRequest())
        
        // Get token from localStorage
       // const token = getToken();
       // console.log('updatePassword - Token found:', !!token);
        
       // if (!token) {
       //     console.log('updatePassword - No token found');
        //    dispatch(updatePasswordFail('No token found'));
         //   return;
       // }
        
        const config = {
            headers: {
                'Content-type': 'application/json',
               // 'Authorization': `Bearer ${token}`
            }
        }
        
       // console.log('updatePassword - Making request to:', `${baseURL}/api/v1/password/change`);
       // console.log('updatePassword - Request config:', config);
        
        const {data} = await axios.post(`${baseURL}/password/reset/${token}`, formData, config);
        
      //  console.log('updatePassword - Response:', response.data);
       // console.log('Password update successful');
        dispatch(resetPasswordSuccess(data))

    }catch(error){
       // console.error('updatePassword - Error details:', error);
       // console.error('updatePassword - Error response:', error.response?.data);
      //  console.error('updatePassword - Error status:', error.response?.status);
      //  console.error('updatePassword - Error message:', error.response?.data?.message);
        
        const errorMessage = error.response?.data?.message || error.message || 'Password update failed';
       // console.error('updatePassword - Final error message:', errorMessage);
        
        dispatch(resetPasswordFail(errorMessage))
    }
};