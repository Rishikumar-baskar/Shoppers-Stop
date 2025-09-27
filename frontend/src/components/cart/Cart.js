import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import{decreaseCartItemQty,increaseCartItemQty,removeItemFromCart} from '../../slices/cartSlice'

export default function Cart() {
    
    const {items} = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.authState);

    
    const increaseQty = (item) => {
      const count = item.quantity;
      if(item.stock === 0 || count >= item.stock) return;
      dispatch(increaseCartItemQty(item.product))
    }

    const decreaseQty = (item) => {
      const count = item.quantity;
      if(count === 1) return;
      dispatch(decreaseCartItemQty(item.product))
    }

    const checkOutHandler = () =>{
      if (isAuthenticated) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");}

    }



return (
    <Fragment>
        {items.length === 0 ? (
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#f8f9fa', 
                padding: '2rem 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="container text-center">
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '3rem 2rem',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        maxWidth: '500px',
                        margin: '0 auto'
                    }}>
                        <i className="fa fa-shopping-cart" style={{ 
                            fontSize: '4rem', 
                            color: '#6c757d',
                            marginBottom: '1rem'
                        }}></i>
                        <h2 style={{ 
                            fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                            fontWeight: '600',
                            color: '#2c3e50',
                            marginBottom: '1rem'
                        }}>
                            Your Cart is Empty
                        </h2>
                        <p style={{ 
                            color: '#6c757d',
                            marginBottom: '2rem'
                        }}>
                            Looks like you haven't added any items to your cart yet.
                        </p>
                        <Link 
                            to="/" 
                            style={{
                                backgroundColor: '#ff6b35',
                                color: 'white',
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        ) : (
            <div style={{ 
                minHeight: '100vh', 
                backgroundColor: '#f8f9fa', 
                padding: '2rem 0' 
            }}>
                <div className="container">
                    <h2 style={{ 
                        fontSize: window.innerWidth < 576 ? '1.5rem' : '2rem',
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '2rem'
                    }}>
                        Your Cart: <b>{items.length}</b> {items.length === 1 ? 'item' : 'items'}
                    </h2>
                    
                    <div className="row">
                        <div className="col-12 col-lg-8">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                marginBottom: window.innerWidth < 992 ? '2rem' : '0'
                            }}>
                                {items.map((item, index) => (
                                    <div key={item.product} style={{
                                        padding: '1rem 0',
                                        borderBottom: index < items.length - 1 ? '1px solid #e1e5e9' : 'none'
                                    }}>
                                        <div className="row align-items-center">
                                            <div className="col-12 col-sm-4 col-md-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    style={{
                                                        width: '100%',
                                                        maxWidth: '120px',
                                                        height: 'auto',
                                                        borderRadius: '8px',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            </div>

                                            <div className="col-12 col-sm-8 col-md-9" style={{ marginTop: window.innerWidth < 576 ? '1rem' : '0' }}>
                                                <div className="row align-items-center">
                                                    <div className="col-12 col-md-4">
                                                        <Link 
                                                            to={`/product/${item.product}`}
                                                            style={{
                                                                color: '#2c3e50',
                                                                textDecoration: 'none',
                                                                fontWeight: '500',
                                                                fontSize: '1rem'
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </div>

                                                    <div className="col-6 col-md-2">
                                                        <p style={{ 
                                                            fontSize: '1.1rem',
                                                            fontWeight: '600',
                                                            color: '#2c3e50',
                                                            margin: 0
                                                        }}>
                                                            ${item.price}
                                                        </p>
                                                    </div>

                                                    <div className="col-6 col-md-4">
                                                        <div style={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            gap: '0.5rem',
                                                            justifyContent: window.innerWidth < 576 ? 'center' : 'flex-start'
                                                        }}>
                                                            <button 
                                                                className="btn btn-outline-danger"
                                                                onClick={() => decreaseQty(item)}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    padding: 0,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className="form-control"
                                                                value={item.quantity}
                                                                readOnly
                                                                style={{
                                                                    width: '60px',
                                                                    textAlign: 'center',
                                                                    border: '1px solid #e1e5e9',
                                                                    borderRadius: '6px'
                                                                }}
                                                            />
                                                            <button 
                                                                className="btn btn-outline-primary"
                                                                onClick={() => increaseQty(item)}
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    padding: 0,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center'
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-2" style={{ 
                                                        textAlign: window.innerWidth < 576 ? 'center' : 'right',
                                                        marginTop: window.innerWidth < 576 ? '1rem' : '0'
                                                    }}>
                                                        <button
                                                            onClick={() => dispatch(removeItemFromCart(item.product))}
                                                            className="btn btn-outline-danger"
                                                            style={{
                                                                padding: '0.5rem',
                                                                borderRadius: '6px'
                                                            }}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-12 col-lg-4">
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                position: window.innerWidth >= 992 ? 'sticky' : 'static',
                                top: '2rem'
                            }}>
                                <h4 style={{ 
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    color: '#2c3e50',
                                    marginBottom: '1rem'
                                }}>
                                    Order Summary
                                </h4>
                                <hr />
                                <div style={{ marginBottom: '1rem' }}>
                                    <p style={{ 
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '0.5rem 0',
                                        color: '#6c757d'
                                    }}>
                                        Subtotal: <span style={{ fontWeight: '500', color: '#2c3e50' }}>
                                            {items.reduce((acc, item) => (acc + item.quantity), 0)} units
                                        </span>
                                    </p>
                                    <p style={{ 
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        margin: '0.5rem 0',
                                        color: '#6c757d'
                                    }}>
                                        Est. total: <span style={{ fontWeight: '600', color: '#2c3e50', fontSize: '1.1rem' }}>
                                            ${items.reduce((acc, item) => (acc + item.quantity * item.price), 0).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <hr />
                                <button
                                    id="checkout_btn"
                                    className="btn btn-primary btn-block"
                                    onClick={checkOutHandler}
                                    style={{
                                        backgroundColor: '#ff6b35',
                                        border: 'none',
                                        borderRadius: '8px',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '1rem',
                                        fontWeight: '500',
                                        width: '100%',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </Fragment>
);
}


