import { useEffect, useState } from "react"
import { clearAuthError, resetPassword } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordResetAttempted, setPasswordResetAttempted] = useState(false);
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.authState);
    const navigate = useNavigate();
    const{token} = useParams();
    const submitHandler = (e) => {
        e.preventDefault();

        // Client-side validation
        if (!password || !confirmPassword) {
            toast.error('Please fill in both password fields', {
                position: 'bottom-center',
                type: 'error'
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match', {
                position: 'bottom-center',
                type: 'error'
            });
            return;
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long', {
                position: 'bottom-center',
                type: 'error'
            });
            return;
        }

        const passwordData = {
            password,
            confirmPassword
        };

        dispatch(resetPassword(passwordData, token));
        setPasswordResetAttempted(true);
    }

    useEffect(()=> {
        if(passwordResetAttempted && isAuthenticated){
            toast.success('Password Reset Success', {
                type:'success',
                position:'top-center',
            })
            // Clear form and navigate to home after a brief delay
            setTimeout(() => {
                setPassword('');
                setConfirmPassword('');
                setPasswordResetAttempted(false);
                navigate('/', { replace: true });
            }, 1500);
            return;

        }
        if(error) {
            toast.error(error, {
                type:'error',
                position:'bottom-center',
                onOpen: ()=> { dispatch(clearAuthError())}
            })
        }

    },[isAuthenticated, error,dispatch,navigate,passwordResetAttempted])



    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}>
                        {loading ? 'Setting Password...' : 'Set Password'}
                    </button>

                </form>
            </div>
        </div>
    )
}