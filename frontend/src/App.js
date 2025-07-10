
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

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
          <ToastContainer theme="dark"/>
          <Routes>
            <Route path='/' element={<Home />} />
           <Route path='/search/:keyword' element={<ProductSearch />} />

            <Route path='/product/:id' element={<ProductDetail />} />

          </Routes>
          <Footer />
        </HelmetProvider>
      </div>
    </Router>


  );
}

export default App;
