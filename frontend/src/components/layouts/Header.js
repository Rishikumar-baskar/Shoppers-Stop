import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { Dropdown, Image } from 'react-bootstrap';

// Search Component
function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("")

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`)
    }

    const clearKeyword = () => {
        setKeyword("");
    }

    useEffect(() => {
        if (location.pathname === '/')
            clearKeyword();
    }, [location.pathname])

    return (
        <form onSubmit={searchHandler} style={{ width: '100%' }}>
            <div style={{ 
                display: 'flex',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => { setKeyword(e.target.value) }}
                    value={keyword}
                    style={{
                        border: '1px solid #e1e5e9',
                        borderRadius: '8px 0 0 8px',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        flex: '1',
                        outline: 'none',
                        boxShadow: 'none'
                    }}
                />
                <button 
                    id="search_btn" 
                    type="submit"
                    style={{
                        backgroundColor: '#ff6b35',
                        border: '1px solid #ff6b35',
                        borderRadius: '0 8px 8px 0',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '60px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </form>
    )
}

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const { items: cartItems } = useSelector(state => state.cartState);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <nav style={{
            backgroundColor: '#2c3e50',
            padding: '1rem 0',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            minHeight: '80px'
        }}>
            <div className="container-fluid" style={{ padding: '0 2rem' }}>
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: '2rem',
                    flexWrap: window.innerWidth < 768 ? 'wrap' : 'nowrap'
                }}>
                    {/* Logo */}
                    <div style={{ 
                        flex: '0 0 auto',
                        minWidth: '200px'
                    }}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <img 
                                width="150px" 
                                height="auto" 
                                src="/images/logo.svg" 
                                alt="Shoppers Stop Logo"
                                style={{ maxWidth: '100%' }}
                            />
                        </Link>
                    </div>

                    {/* Search */}
                    <div style={{ 
                        flex: '1 1 auto',
                        minWidth: '300px',
                        maxWidth: '600px',
                        margin: window.innerWidth < 768 ? '1rem 0' : '0'
                    }}>
                        <Search />
                    </div>

                    {/* Right Side */}
                    <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        flex: '0 0 auto',
                        margin: window.innerWidth < 768 ? '1rem 0' : '0'
                    }}>
                        {isAuthenticated ? (
                            <Dropdown className="d-inline">
                                <Dropdown.Toggle 
                                    variant="default" 
                                    id="dropdown-basic"
                                    style={{
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '8px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#34495e'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <Image
                                        width="40px"
                                        height="40px"
                                        src={user.avatar ?? './images/default_avatar.png'}
                                        className="rounded-circle"
                                        style={{ border: '2px solid #e1e5e9' }}
                                    />
                                    <span style={{ 
                                        fontSize: '0.9rem',
                                        display: window.innerWidth < 576 ? 'none' : 'inline'
                                    }}>
                                        {user?.name}
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{
                                    borderRadius: '8px',
                                    border: '1px solid #e1e5e9',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                }}>
                                    {user.role === 'admin' && (
                                        <Dropdown.Item 
                                            className="text-dark" 
                                            onClick={() => { navigate('/admin/dashboard') }}
                                            style={{ padding: '0.75rem 1rem' }}
                                        >
                                            <i className="fa fa-tachometer-alt mr-2"></i>
                                            Dashboard
                                        </Dropdown.Item>
                                    )}
                                    <Dropdown.Item 
                                        className="text-dark" 
                                        onClick={() => { navigate('/myprofile') }}
                                        style={{ padding: '0.75rem 1rem' }}
                                    >
                                        <i className="fa fa-user mr-2"></i>
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item 
                                        className="text-dark" 
                                        onClick={() => { navigate('/orders') }}
                                        style={{ padding: '0.75rem 1rem' }}
                                    >
                                        <i className="fa fa-shopping-bag mr-2"></i>
                                        Orders
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item 
                                        className="text-danger" 
                                        onClick={handleLogout}
                                        style={{ padding: '0.75rem 1rem' }}
                                    >
                                        <i className="fa fa-sign-out-alt mr-2"></i>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Link 
                                to="/login" 
                                style={{
                                    backgroundColor: '#ff6b35',
                                    color: 'white',
                                    padding: '0.5rem 1.5rem',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    fontSize: '0.9rem'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
                            >
                                Login
                            </Link>
                        )}

                        {isAuthenticated && (
                            <Link
                                to="/cart"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            >
                                <i className="fa fa-shopping-cart"></i>
                                <span style={{ fontSize: '0.9rem' }}>Cart</span>
                                <span style={{
                                    backgroundColor: '#ff6b35',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: '600'
                                }}>
                                    {cartItems.length}
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
