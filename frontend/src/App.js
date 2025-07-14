
import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import ProductDetail from './components/product/productDetail';
import ProductSearch from './components/product/productSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import MainLayout from './components/layouts';

function App() {
  return (
    <div className="App">
      {/* <MainLayout /> */}
      <Router>
        <HelmetProvider>

          <ToastContainer theme="dark" />
          <Routes>
              <Route path='/' element={<Home />} />
            <Route path='/' element={<MainLayout />}>
              <Route path='/search/:keyword' element={<ProductSearch />} />
              <Route path='/product/:id' element={<ProductDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>



          </Routes>

        </HelmetProvider>
      </Router>
    </div>


  );
}

export default App;
