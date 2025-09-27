//import e from 'express';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register, clearAuthError } from '../../actions/userActions';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';
//import { ToastContainer } from "react-toastify";

export default function Register(){
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading,error,isAuthenticated } = useSelector(state => state.authState)

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }


            reader.readAsDataURL(e.target.files[0])
        }else{
        setUserData({...userData, [e.target.name]:e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar)
        dispatch(register(formData))
        console.info('navigateing home')
        // navigate('/')


    }

    useEffect(()=>{
        // Redirect if already authenticated
        if(isAuthenticated){
            navigate('/');
            return;
        }
        
        if(error){
       console.log("Login error:", error);
       
                   toast(error,{
                       position: "bottom-center",
                       type: 'error',
                       onOpen: ()=>{ dispatch(clearAuthError()) }
                   });
        }

    },[error,isAuthenticated,navigate,dispatch])

    // Don't render the form if user is already authenticated
    if(isAuthenticated) {
        return null;
    }

    return(
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
                                Register
                            </h1>

                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label htmlFor='name_field' style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: '#2c3e50',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Full Name
                                    </label>
                                    <input 
                                        type='text' 
                                        name='name' 
                                        onChange={onChange} 
                                        id='name_field' 
                                        className='form-control'
                                        style={{
                                            border: '1px solid #e1e5e9',
                                            borderRadius: '8px',
                                            padding: '0.75rem',
                                            fontSize: '1rem',
                                            width: '100%'
                                        }}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label htmlFor='email_field' style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: '#2c3e50',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Email Address
                                    </label>
                                    <input 
                                        type='email' 
                                        name='email' 
                                        onChange={onChange} 
                                        id='email_field' 
                                        className='form-control'
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
                                    <label htmlFor='password_field' style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: '#2c3e50',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Password
                                    </label>
                                    <input 
                                        type='password' 
                                        name='password' 
                                        onChange={onChange} 
                                        id='password_field' 
                                        className='form-control'
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

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label htmlFor='avatar_upload' style={{
                                        display: 'block',
                                        fontWeight: '500',
                                        color: '#2c3e50',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        Profile Picture
                                    </label>
                                    <div style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '1rem',
                                        flexDirection: window.innerWidth < 576 ? 'column' : 'row'
                                    }}>
                                        <div>
                                            <img 
                                                src={avatarPreview} 
                                                alt='Avatar Preview' 
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    border: '2px solid #e1e5e9'
                                                }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <input
                                                type='file'
                                                name='avatar'
                                                onChange={onChange}
                                                className='form-control'
                                                id='customFile'
                                                accept='image/*'
                                                style={{
                                                    border: '1px solid #e1e5e9',
                                                    borderRadius: '8px',
                                                    padding: '0.5rem',
                                                    fontSize: '0.9rem',
                                                    width: '100%'
                                                }}
                                            />
                                            <small style={{ 
                                                color: '#6c757d', 
                                                fontSize: '0.8rem',
                                                marginTop: '0.25rem',
                                                display: 'block'
                                            }}>
                                                Choose a profile picture (optional)
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    id='register_button'
                                    type='submit'
                                    className='btn btn-block py-3'
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
                                    {loading ? 'REGISTERING...' : 'REGISTER'}
                                </button>

                                <div style={{ 
                                    textAlign: 'center', 
                                    marginTop: '1.5rem' 
                                }}>
                                    <span style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                                        Already have an account?{' '}
                                    </span>
                                    <Link 
                                        to='/login' 
                                        style={{
                                            color: '#007bff',
                                            textDecoration: 'none',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Login Here
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}