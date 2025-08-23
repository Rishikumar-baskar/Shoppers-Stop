import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.authState);
    
    // Debug logging
    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
    console.log('ProtectedRoute - loading:', loading);
    console.log('ProtectedRoute - user:', user);
    
    if (loading) {
        return (
            <div className="text-center mt-5">
                <h3>Loading...</h3>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    
    if (!isAuthenticated) {
        console.log('ProtectedRoute - Redirecting to login');
        return <Navigate to="/login" replace />;
    }
    
    console.log('ProtectedRoute - Rendering children');
    return children;
}