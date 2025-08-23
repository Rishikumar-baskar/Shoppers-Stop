import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Profile() {
    const { user, isAuthenticated, loading } = useSelector(state => state.authState);
    
    // Debug logging
    console.log('Profile component - user:', user);
    console.log('Profile component - isAuthenticated:', isAuthenticated);
    console.log('Profile component - loading:', loading);
    
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
        return (
            <div className="text-center mt-5">
                <h3>Please login to view your profile</h3>
                <Link to="/login" className="btn btn-primary">Go to Login</Link>
            </div>
        );
    }
    
    if (!user) {
        return (
            <div className="text-center mt-5">
                <h3>User data not available</h3>
                <p>This might be a loading issue. Please refresh the page.</p>
            </div>
        );
    }
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12">
                    <h2 className="text-center mb-4">My Profile</h2>
                </div>
            </div>
            <div className="row justify-content-around user-info">
                <div className="col-12 col-md-3 text-center">
                    <figure className='avatar avatar-profile'>
                        <img 
                            className="rounded-circle img-fluid" 
                            src={user?.avatar ?? './images/default_avatar.png'} 
                            alt={`${user?.name || 'User'} avatar`} 
                        />
                    </figure>
                    <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </Link>
                </div>
        
                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user?.name || 'Not provided'}</p>
        
                    <h4>Email Address</h4>
                    <p>{user?.email || 'Not provided'}</p>

                    <h4>Joined</h4>
                    <p>{user?.createdAt ? String(user.createdAt).substring(0, 10) : 'Not available'}</p>

                    <Link to="/orders" className="btn btn-danger btn-block mt-5">
                        My Orders
                    </Link>

                    <Link to="/myprofile/update/password" className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    )
}