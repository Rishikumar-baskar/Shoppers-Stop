import { Fragment, useEffect, useState } from "react";
import MetaData from '../layouts/MetaData';
import { clearAuthError, login } from "../../actions/userActions";
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getToken } from '../../utils/tokenUtils';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {loading, error, isAuthenticated } = useSelector(state => state.authState);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        // Redirect if already authenticated
        if(isAuthenticated){
            // Navigate to intended page or home
            const from = location.state?.from || '/';
            navigate(from, { replace: true });
            return;
        }

        // Show toast if redirected from protected route and not authenticated and no token
        if (!isAuthenticated && location.state?.message && !getToken()) {
            toast(location.state.message, {
                position: "bottom-center",
                type: 'error'
            });
        }

        if(error) {
            console.log("Login error:", error);
            toast(error,{
                position: "bottom-center",
                type: 'error',
                onOpen: ()=>{ dispatch(clearAuthError()) }
            });
        }
    },[error, isAuthenticated, navigate, dispatch, location.state])
    
    // Don't render the form if user is already authenticated
    if(isAuthenticated) {
        return null;
    }
    
    return (
        <Fragment>
            <MetaData title={'Login'}/>
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#f8f9fa', 
                padding: '2rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                padding: window.innerWidth < 576 ? '1.5rem' : '2.5rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                width: '100%'
                            }}>
                                <h1 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                                    fontWeight: '600',
                                    color: '#2c3e50',
                                    textAlign: 'center',
                                    marginBottom: '2rem'
                                }}>
                                    Login
                                </h1>

                                <form onSubmit={submitHandler}>
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label htmlFor="email_field" style={{
                                            display: 'block',
                                            fontWeight: '500',
                                            color: '#2c3e50',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem'
                                        }}>
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email_field"
                                            name="email"
                                            className="form-control"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            style={{
                                                border: '1px solid #e1e5e9',
                                                borderRadius: '8px',
                                                padding: '0.75rem',
                                                fontSize: '1rem',
                                                width: '100%'
                                            }}
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <label htmlFor="password_field" style={{
                                            display: 'block',
                                            fontWeight: '500',
                                            color: '#2c3e50',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.9rem'
                                        }}>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password_field"
                                            name="password"
                                            className="form-control"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            style={{
                                                border: '1px solid #e1e5e9',
                                                borderRadius: '8px',
                                                padding: '0.75rem',
                                                fontSize: '1rem',
                                                width: '100%'
                                            }}
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <div style={{ 
                                        textAlign: 'right', 
                                        marginBottom: '1.5rem' 
                                    }}>
                                        <Link 
                                            to="/password/forgot" 
                                            style={{
                                                color: '#007bff',
                                                textDecoration: 'none',
                                                fontSize: '0.9rem',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={loading}
                                        style={{
                                            backgroundColor: '#ff6b35',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '0.75rem 2rem',
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            width: '100%',
                                            color: 'white',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#e55a2b')}
                                        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#ff6b35')}
                                    >
                                        {loading ? 'LOGGING IN...' : 'LOGIN'}
                                    </button>

                                    <div style={{ 
                                        textAlign: 'center', 
                                        marginTop: '1.5rem' 
                                    }}>
                                        <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                                            New User?{' '}
                                        </span>
                                        <Link 
                                            to='/register' 
                                            style={{
                                                color: '#007bff',
                                                textDecoration: 'none',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Register Here
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}