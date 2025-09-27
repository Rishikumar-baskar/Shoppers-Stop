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
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#f8f9fa', 
            padding: '2rem 0' 
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: window.innerWidth < 768 ? '1.5rem' : '2.5rem',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h2 style={{ 
                                fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                                fontWeight: '600',
                                color: '#2c3e50',
                                textAlign: 'center',
                                marginBottom: '2rem'
                            }}>
                                My Profile
                            </h2>
                            
                            <div className="row">
                                <div className="col-12 col-md-4 text-center" style={{ marginBottom: window.innerWidth < 768 ? '2rem' : '0' }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1.5rem'
                                    }}>
                                        <img 
                                            className="rounded-circle img-fluid" 
                                            src={user?.avatar ?? './images/default_avatar.png'} 
                                            alt={`${user?.name || 'User'} avatar`}
                                            style={{
                                                width: window.innerWidth < 576 ? '120px' : '150px',
                                                height: window.innerWidth < 576 ? '120px' : '150px',
                                                objectFit: 'cover',
                                                border: '4px solid #e1e5e9'
                                            }}
                                        />
                                        <Link 
                                            to="/myprofile/update" 
                                            id="edit_profile" 
                                            style={{
                                                backgroundColor: '#007bff',
                                                color: 'white',
                                                padding: '0.75rem 1.5rem',
                                                borderRadius: '8px',
                                                textDecoration: 'none',
                                                fontWeight: '500',
                                                transition: 'all 0.3s ease',
                                                width: window.innerWidth < 576 ? '100%' : 'auto',
                                                textAlign: 'center'
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                                            onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                                        >
                                            Edit Profile
                                        </Link>
                                    </div>
                                </div>
                
                                <div className="col-12 col-md-8">
                                    <div style={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        gap: '1.5rem' 
                                    }}>
                                        <div style={{
                                            padding: '1rem',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px',
                                            border: '1px solid #e1e5e9'
                                        }}>
                                            <h4 style={{ 
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#2c3e50',
                                                marginBottom: '0.5rem'
                                            }}>
                                                Full Name
                                            </h4>
                                            <p style={{ 
                                                fontSize: '1rem',
                                                color: '#6c757d',
                                                margin: 0
                                            }}>
                                                {user?.name || 'Not provided'}
                                            </p>
                                        </div>
                
                                        <div style={{
                                            padding: '1rem',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px',
                                            border: '1px solid #e1e5e9'
                                        }}>
                                            <h4 style={{ 
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#2c3e50',
                                                marginBottom: '0.5rem'
                                            }}>
                                                Email Address
                                            </h4>
                                            <p style={{ 
                                                fontSize: '1rem',
                                                color: '#6c757d',
                                                margin: 0
                                            }}>
                                                {user?.email || 'Not provided'}
                                            </p>
                                        </div>

                                        <div style={{
                                            padding: '1rem',
                                            backgroundColor: '#f8f9fa',
                                            borderRadius: '8px',
                                            border: '1px solid #e1e5e9'
                                        }}>
                                            <h4 style={{ 
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#2c3e50',
                                                marginBottom: '0.5rem'
                                            }}>
                                                Member Since
                                            </h4>
                                            <p style={{ 
                                                fontSize: '1rem',
                                                color: '#6c757d',
                                                margin: 0
                                            }}>
                                                {user?.createdAt ? String(user.createdAt).substring(0, 10) : 'Not available'}
                                            </p>
                                        </div>

                                        <div style={{ 
                                            display: 'flex', 
                                            flexDirection: 'column', 
                                            gap: '1rem',
                                            marginTop: '1rem'
                                        }}>
                                            <Link 
                                                to="/orders" 
                                                style={{
                                                    backgroundColor: '#dc3545',
                                                    color: 'white',
                                                    padding: '0.75rem 1.5rem',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'all 0.3s ease',
                                                    textAlign: 'center'
                                                }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                                            >
                                                My Orders
                                            </Link>

                                            <Link 
                                                to="/myprofile/update/password" 
                                                style={{
                                                    backgroundColor: '#ff6b35',
                                                    color: 'white',
                                                    padding: '0.75rem 1.5rem',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    fontWeight: '500',
                                                    transition: 'all 0.3s ease',
                                                    textAlign: 'center'
                                                }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
                                                onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
                                            >
                                                Change Password
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}