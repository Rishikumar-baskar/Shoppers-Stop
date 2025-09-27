import { Link, useNavigate } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

export default function Sidebar () {

    const navigate = useNavigate();

    return (
        <div style={{
            backgroundColor: '#2c3e50',
            minHeight: '100vh',
            width: '100%',
            padding: window.innerWidth < 768 ? '1rem 0' : '2rem 0'
        }}>
            <nav style={{ padding: '0 1rem' }}>
                <ul style={{ 
                    listStyle: 'none', 
                    padding: 0, 
                    margin: 0 
                }}>
                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/dashboard"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: window.innerWidth < 768 ? '0.75rem' : '1rem',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <i className="fas fa-tachometer-alt"></i> 
                            <span style={{ display: window.innerWidth < 576 ? 'none' : 'inline' }}>Dashboard</span>
                        </Link>
                    </li>
        
                    <li style={{ marginBottom: '0.5rem' }}>
                        <NavDropdown 
                            title={
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: window.innerWidth < 768 ? '0.75rem' : '1rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
                                    cursor: 'pointer'
                                }}>
                                    <i className='fa fa-product-hunt'></i> 
                                    <span style={{ display: window.innerWidth < 576 ? 'none' : 'inline' }}>Product</span>
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
                                <i className='fa fa-shopping-basket'></i> All
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
                                <i className='fa fa-plus'></i> Create
                            </NavDropdown.Item>
                        </NavDropdown>
                    </li>

                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/orders"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: window.innerWidth < 768 ? '0.75rem' : '1rem',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <i className="fa fa-shopping-basket"></i> 
                            <span style={{ display: window.innerWidth < 576 ? 'none' : 'inline' }}>Orders</span>
                        </Link>
                    </li>

                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/users"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: window.innerWidth < 768 ? '0.75rem' : '1rem',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <i className="fa fa-users"></i> 
                            <span style={{ display: window.innerWidth < 576 ? 'none' : 'inline' }}>Users</span>
                        </Link>
                    </li>

                    <li style={{ marginBottom: '0.5rem' }}>
                        <Link 
                            to="/admin/reviews"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: window.innerWidth < 768 ? '0.75rem' : '1rem',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease',
                                fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            <i className="fa fa-star"></i> 
                            <span style={{ display: window.innerWidth < 576 ? 'none' : 'inline' }}>Reviews</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}