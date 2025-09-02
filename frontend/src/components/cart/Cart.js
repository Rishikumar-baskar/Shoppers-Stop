import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';

export default function Cart() {
    
    const {items} = useSelector(state => state.cartState)



return (
    <Fragment>
      <h2 className="mt-5">Your Cart: <b>{items.length}</b></h2>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          <Fragment>
            <hr />
            <div className="cart-item">
              <div className="row">
                <div className="col-4 col-lg-3">
                  <img
                    src="https://via.placeholder.com/115"
                    alt="Product 1"
                    height="90"
                    width="115"
                  />
                </div>

                <div className="col-5 col-lg-3">
                  <Link to="#">Sample Product 1</Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p id="card_item_price">$50</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value="1"
                      readOnly
                    />
                    <span className="btn btn-primary plus">+</span>
                  </div>
                </div>

                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                  <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                </div>
              </div>
            </div>
          </Fragment>

          <Fragment>
            <hr />
            <div className="cart-item">
              <div className="row">
                <div className="col-4 col-lg-3">
                  <img
                    src="https://via.placeholder.com/115"
                    alt="Product 2"
                    height="90"
                    width="115"
                  />
                </div>

                <div className="col-5 col-lg-3">
                  <Link to="#">Sample Product 2</Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                  <p id="card_item_price">$30</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                  <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus">-</span>
                    <input
                      type="number"
                      className="form-control count d-inline"
                      value="2"
                      readOnly
                    />
                    <span className="btn btn-primary plus">+</span>
                  </div>
                </div>

                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                  <i id="delete_cart_item" className="fa fa-trash btn btn-danger"></i>
                </div>
              </div>
            </div>
          </Fragment>

          <hr />
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">3 (Units)</span>
            </p>
            <p>
              Est. total:{" "}
              <span className="order-summary-values">$110</span>
            </p>
            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


