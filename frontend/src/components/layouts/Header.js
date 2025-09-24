import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { Dropdown, Image } from 'react-bootstrap'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';

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
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => { setKeyword(e.target.value) }}
                    value={keyword}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
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
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid px-3">
                <div className="navbar-brand p-0">
                    <Link to="/" className="d-flex align-items-center text-decoration-none">
                        <img width="70px" height="70px" src="/images/logo.svg" alt="Shoppers Stop Logo" className="me-2" />
                    </Link>
                </div>

                <div className="d-flex d-lg-none align-items-center ms-auto">
                    <Link to="/cart" className="text-decoration-none me-3">
                        <span id="cart" className="text-white">Cart</span>
                        <span className="ms-1" id="cart_count">{cartItems.length}</span>
                    </Link>
                    {isAuthenticated ? (
                        <Dropdown className='d-inline'>
                            <DropdownToggle variant='default text-white border-0 p-0' id='dropdown-mobile'>
                                <figure className='avatar avatar-nav'>
                                    <Image width="35px" height="35px" src={user.avatar ?? './images/default_avatar.png'} className="rounded-circle" />
                                </figure>
                            </DropdownToggle>
                            <Dropdown.Menu align="end">
                                <div className="px-3 py-2 border-bottom d-lg-none">
                                    <span className="text-dark fw-bold">Hi, {user?.name}</span>
                                </div>
                                {user.role === 'admin' && <Dropdown.Item className='text-dark' onClick={() => { navigate('/admin/dashboard') }}>Dashboard</Dropdown.Item>}
                                <Dropdown.Item className='text-dark' onClick={() => { navigate('/myprofile') }}>Profile</Dropdown.Item>
                                <Dropdown.Item className='text-dark' onClick={() => { navigate('/orders') }}>Orders</Dropdown.Item>
                                <Dropdown.Item className='text-danger' onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <div className="btn btn-sm" id="login_btn" onClick={() => navigate('/login')}>
                            Login
                        </div>
                    )}
                </div>

                <div className="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
                    <div className="d-flex justify-content-center flex-grow-1">
                        <Search />
                    </div>

                    <div className="d-flex align-items-center">
                        <Link to="/cart" className="text-decoration-none me-5">
                            <span id="cart" className="text-white">Cart</span>
                            <span className="ms-1" id="cart_count">{cartItems.length}</span>
                        </Link>

                        {isAuthenticated ? (
                            <Dropdown className='d-inline'>
                                <DropdownToggle variant='default text-white border-0 p-0' id='dropdown-basic'>
                                    <figure className='avatar avatar-nav me-3'>
                                        <Image width="35px" height="35px" src={user.avatar ?? './images/default_avatar.png'} className="rounded-circle" />
                                    </figure>
                                    <span className="ms-2">Hi, {user?.name}</span>
                                </DropdownToggle>
                                <Dropdown.Menu align="end">
                                    {user.role === 'admin' && <Dropdown.Item className='text-dark' onClick={() => { navigate('/admin/dashboard') }}>Dashboard</Dropdown.Item>}
                                    <Dropdown.Item className='text-dark' onClick={() => { navigate('/myprofile') }}>Profile</Dropdown.Item>
                                    <Dropdown.Item className='text-dark' onClick={() => { navigate('/orders') }}>Orders</Dropdown.Item>
                                    <Dropdown.Item className='text-danger' onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div className="btn" id="login_btn" onClick={() => navigate('/login')}>
                                Login
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}