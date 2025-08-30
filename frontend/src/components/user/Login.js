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
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg" method="POST" action="/login">
                        <h1 className="mb-3">Login</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                name="password"
                                className="form-control"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            LOGIN
                        </button>

                        <Link to='/register' className="float-right mt-3">New User?</Link>
                    </form>
                    
                </div>
                
            </div>
        </Fragment>


    )
}