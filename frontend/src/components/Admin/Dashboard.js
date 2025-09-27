import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getProducts, getAdminProducts } from "../../actions/productsActions";
import { adminOrders as fetchAdminOrders } from '../../actions/orderActions'
import { Link } from "react-router-dom";

export default function Dashboard () {
    const { products = [] } = useSelector( state => state.productsState || {});
    const { adminOrders = [] } = useSelector( state => state.orderState || {});
    const dispatch = useDispatch();
    let outOfStock = 0;

    if (products.length > 0) {
        products.forEach( product => {
            if( product.stock === 0  ) {
                outOfStock = outOfStock + 1;
            }
        })
    }

    let totalAmount = 0;
    if (adminOrders.length > 0) {
        adminOrders.forEach( order => {
            totalAmount += order.totalPrice
        })
    }



    useEffect( () => {
       dispatch(getAdminProducts());
       dispatch(fetchAdminOrders());
    }, [dispatch])


    return (
        <div className="row" style={{ margin: 0, minHeight: '100vh' }}>
            <div className="col-12 col-lg-2" style={{ padding: 0 }}>
                <Sidebar/>
            </div>
            <div className="col-12 col-lg-10 admin-main-content" style={{ 
                padding: window.innerWidth < 768 ? '1rem' : '2rem',
                backgroundColor: '#f8f9fa',
                minHeight: '100vh'
            }}>
                <h1 style={{ 
                    fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                    marginBottom: '2rem',
                    color: '#2c3e50',
                    fontWeight: '600'
                }}>
                    Dashboard
                </h1>
                
                {/* Total Amount Card */}
                <div className="row" style={{ marginBottom: '2rem' }}>
                    <div className="col-12">
                        <div style={{
                            backgroundColor: '#007bff',
                            borderRadius: '12px',
                            padding: '2rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                            <h3 style={{ 
                                fontSize: window.innerWidth < 576 ? '1.2rem' : '1.5rem',
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                Total Amount
                            </h3>
                            <h2 style={{ 
                                fontSize: window.innerWidth < 576 ? '1.8rem' : '2.5rem',
                                margin: '0.5rem 0 0 0',
                                fontWeight: '700'
                            }}>
                                ${totalAmount.toLocaleString()}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                        <div style={{
                            backgroundColor: '#28a745',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1rem' : '1.2rem',
                                    margin: 0,
                                    fontWeight: '500'
                                }}>
                                    Products
                                </h4>
                                <h3 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                                    margin: '0.5rem 0',
                                    fontWeight: '700'
                                }}>
                                    {products.length}
                                </h3>
                            </div>
                            <Link 
                                to="/admin/products"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            >
                                View Details <i className="fa fa-angle-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                        <div style={{
                            backgroundColor: '#dc3545',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1rem' : '1.2rem',
                                    margin: 0,
                                    fontWeight: '500'
                                }}>
                                    Orders
                                </h4>
                                <h3 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                                    margin: '0.5rem 0',
                                    fontWeight: '700'
                                }}>
                                    {adminOrders.length}
                                </h3>
                            </div>
                            <Link 
                                to="/admin/orders"
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    padding: '0.5rem',
                                    borderRadius: '6px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                            >
                                View Details <i className="fa fa-angle-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4 mb-3">
                        <div style={{
                            backgroundColor: '#ffc107',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            color: 'white',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1rem' : '1.2rem',
                                    margin: 0,
                                    fontWeight: '500'
                                }}>
                                    Out of Stock
                                </h4>
                                <h3 style={{ 
                                    fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                                    margin: '0.5rem 0',
                                    fontWeight: '700'
                                }}>
                                    {outOfStock}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}