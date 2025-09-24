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
        <nav className="navbar row">
            {/* Logo */}
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img width="150px" height="auto" src="/images/logo.svg" alt="Shoppers Stop Logo" />
                    </Link>
                </div>
            </div>

            {/* Search */}
            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            {/* Right Side */}
            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {isAuthenticated ? (
                    <Dropdown className="d-inline">
                        <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
                            <figure className="avatar avatar-nav">
                                <Image
                                    width="50px"
                                    height="50px"
                                    src={user.avatar ?? './images/default_avatar.png'}
                                    className="rounded-circle"
                                />
                            </figure>
                            <span>{user?.name}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {user.role === 'admin' && (
                                <Dropdown.Item className="text-dark" onClick={() => { navigate('/admin/dashboard') }}>
                                    Dashboard
                                </Dropdown.Item>
                            )}
                            <Dropdown.Item className="text-dark" onClick={() => { navigate('/myprofile') }}>
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item className="text-dark" onClick={() => { navigate('/orders') }}>
                                Orders
                            </Dropdown.Item>
                            <Dropdown.Item className="text-danger" onClick={handleLogout}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                )}

                <Link to="/cart" className="ml-3">
                    <span id="cart">Cart</span>
                </Link>
                <span className="ml-1" id="cart_count">{cartItems.length}</span>
            </div>
        </nav>
    )
}
