import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap'
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

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <a href="/">
                        <img width="100px" height={100} src="/images/logo.svg" alt="Shoppers Stop Logo" />
                    </a>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {isAuthenticated ? (
                    <>

                        <Dropdown className='d-inline'>
                            <DropdownToggle variant='default text-white pr-5' id='dropdown-basic'>
                                <figure className='avatar avatar-nav'>
                                    <Image width="50px" src={user.avatar ?? './images/default_avatar.png'} />
                                </figure>
                                <span>Hi, </span>

                                <span>{user?.name}</span>
                            </DropdownToggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className='text-dark' onClick={() => { navigate('/myprofile') }}>Profile</Dropdown.Item>

                                <Dropdown.Item className='text-danger' onClick={handleLogout}>Logout</Dropdown.Item>

                            </Dropdown.Menu>
                        </Dropdown>

                    </>
                ) : (
                    <div className="btn" id="login_btn" onClick={() => {
                        navigate('/login')
                    }}>
                        Login
                    </div>
                )}

                <span id="cart" className="ml-3">Cart</span>
                <span className="ml-1" id="cart_count">2</span>
            </div>
        </nav>
    )
}