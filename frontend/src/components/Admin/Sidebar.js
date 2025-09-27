import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Sidebar () {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsCollapsed(true);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const getLinkStyle = (path) => ({
        display: 'flex',
        alignItems: 'center',
        gap: isCollapsed ? '0' : '0.75rem',
        padding: isMobile ? '0.75rem' : '1rem',
        color: isActive(path) ? '#fff' : 'rgba(255, 255, 255, 0.8)',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        fontSize: isMobile ? '0.9rem' : '1rem',
        backgroundColor: isActive(path) ? '#34495e' : 'transparent',
        fontWeight: isActive(path) ? '600' : '400',
        position: 'relative'
    });

    return (
        <div style={{
            backgroundColor: '#2c3e50',
            minHeight: '100vh',
            width: isCollapsed ? '80px' : '250px',
            padding: isMobile ? '1rem 0' : '2rem 0',
            transition: 'all 0.3s ease',
            position: 'relative',
            boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
            flexShrink: 0
        }}>
            {/* Toggle Button */}
            <div style={{
                position: 'absolute',
                top: '1rem',
                right: isCollapsed ? '0.5rem' : '1rem',
                zIndex: 10
            }}>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                    <i className={`fa fa-${isCollapsed ? 'angle-right' : 'angle-left'}`}></i>
                </button>
            </div>

            {/* Logo/Brand */}
            <div style={{
                padding: '0 1rem',
                marginBottom: '2rem',
                textAlign: isCollapsed ? 'center' : 'left'
            }}>
                {!isCollapsed && (
                    <h3 style={{
                        color: 'white',
                        margin: 0,
                        fontSize: '1.2rem',
                        fontWeight: '600'
                    }}>
                        Admin Panel
                    </h3>
                )}
                {isCollapsed && (
                    <div style={{
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                    }}>
                        AP
                    </div>
                )}
            </div>

            <nav style={{ padding: '0 1rem' }}>
                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0 
                }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/dashboard"
                            style={getLinkStyle('/admin/dashboard')}
                            onMouseOver={(e) => !isActive('/admin/dashboard') && (e.target.style.backgroundColor = '#34495e')}
                            onMouseOut={(e) => !isActive('/admin/dashboard') && (e.target.style.backgroundColor = 'transparent')}
                            title={isCollapsed ? 'Dashboard' : ''}
                        >
                            <i className="fas fa-tachometer-alt" style={{ minWidth: '20px' }}></i> 
                            {!isCollapsed && <span>Dashboard</span>}
                        </Link>
                    </li>
        
                    <li style={{ marginBottom: '0.5rem' }}>
                        <NavDropdown 
                            title={
                                <span style={{
                                    ...getLinkStyle('/admin/products'),
                                    cursor: 'pointer',
                                    width: '100%'
                                }}>
                                    <i className='fa fa-product-hunt' style={{ minWidth: '20px' }}></i> 
                                    {!isCollapsed && <span>Products</span>}
                                </span>
                            }
                            style={{ width: '100%' }}
                        >
                            <NavDropdown.Item 
                                onClick={() => navigate('/admin/products')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem'
                                }}
                            > 
                                <i className='fa fa-shopping-basket'></i> All Products
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                                onClick={() => navigate('/admin/products/create')}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem'
                                }}
                            > 
                                <i className='fa fa-plus'></i> Create Product
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>

                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/orders"
                            style={getLinkStyle('/admin/orders')}
                            onMouseOver={(e) => !isActive('/admin/orders') && (e.target.style.backgroundColor = '#34495e')}
                            onMouseOut={(e) => !isActive('/admin/orders') && (e.target.style.backgroundColor = 'transparent')}
                            title={isCollapsed ? 'Orders' : ''}
                        >
                            <i className="fa fa-shopping-basket" style={{ minWidth: '20px' }}></i> 
                            {!isCollapsed && <span>Orders</span>}
                        </Link>
                    </li>

                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/users"
                            style={getLinkStyle('/admin/users')}
                            onMouseOver={(e) => !isActive('/admin/users') && (e.target.style.backgroundColor = '#34495e')}
                            onMouseOut={(e) => !isActive('/admin/users') && (e.target.style.backgroundColor = 'transparent')}
                            title={isCollapsed ? 'Users' : ''}
                        >
                            <i className="fa fa-users" style={{ minWidth: '20px' }}></i> 
                            {!isCollapsed && <span>Users</span>}
                        </Link>
                    </li>

                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/reviews"
                            style={getLinkStyle('/admin/reviews')}
                            onMouseOver={(e) => !isActive('/admin/reviews') && (e.target.style.backgroundColor = '#34495e')}
                            onMouseOut={(e) => !isActive('/admin/reviews') && (e.target.style.backgroundColor = 'transparent')}
                            title={isCollapsed ? 'Reviews' : ''}
                        >
                            <i className="fa fa-star" style={{ minWidth: '20px' }}></i> 
                            {!isCollapsed && <span>Reviews</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Footer */}
            <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                textAlign: isCollapsed ? 'center' : 'left'
            }}>
                {!isCollapsed && (
                    <div style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.8rem'
                    }}>
                        <p style={{ margin: 0 }}>Shoppers Stop</p>
                        <p style={{ margin: '0.25rem 0 0 0' }}>Admin Dashboard</p>
                    </div>
                )}
                {isCollapsed && (
                    <div style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.7rem'
                    }}>
                        SS
                    </div>
                )}
            </div>
        </div>
    )
}