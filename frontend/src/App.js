
import './App.css';
import Home from './components/Home';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './components/product/productDetail';
import ProductSearch from './components/product/productSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userActions';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';

function App() {
    useEffect(() => {
        // Debug: Log environment variable
        //console.log('REACT_APP_BASE_URL:', process.env.REACT_APP_BASE_URL);
        //console.log('All environment variables:', process.env);
        //console.log('NODE_ENV:', process.env.NODE_ENV);

        // Only load user if there's a token in localStorage
        const token = localStorage.getItem('token');
        // console.log('Token in localStorage:', token);
        if (token) {
            store.dispatch(loadUser());
        }
    }, []);

    return (
        <div className="App">
            <Router>
                <HelmetProvider>
                    <ToastContainer
                        theme="dark"
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        style={{ zIndex: 9999 }}
                    />
                    <Header />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/search/:keyword' element={<ProductSearch />} />
                        <Route path='/product/:id' element={<ProductDetail />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/myprofile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                        <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
                        <Route path='/password/forgot' element={<ForgotPassword />} />

                        <Route path='/password/reset/:token' element={<ResetPassword />} />
                        <Route path='/cart' element={<Cart />} />


                    </Routes>
                    <Footer />
                </HelmetProvider>
            </Router>
        </div>
    );
}

export default App;
