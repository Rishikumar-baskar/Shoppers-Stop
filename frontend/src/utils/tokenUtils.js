// Token utility functions
export const getToken = () => {
    return localStorage.getItem('token');
};

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const isTokenValid = () => {
    const token = getToken();
    if (!token) return false;
    
    try {
        // Basic token validation - check if it's a valid JWT format
        const parts = token.split('.');
        if (parts.length !== 3) return false;
        
        // Decode the payload to check expiration
        const payload = JSON.parse(atob(parts[1]));
        const currentTime = Date.now() / 1000;
        
        return payload.exp > currentTime;
    } catch (error) {
        return false;
    }
};
