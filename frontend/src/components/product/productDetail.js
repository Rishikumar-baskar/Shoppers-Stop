import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../actions/productAction";
import Loader from '../layouts/Loader'
import MetaData from "../layouts/MetaData";
//import { Carousel } from 'react-bootstrap';

export default function ProductDetail() {
    const { loading, product } = useSelector((state) => state.productState);
    const dispatch = useDispatch();
    const { id } = useParams()

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch,id])
    return (
        <Fragment>
            {loading? <Loader/>:
            <Fragment>
                <MetaData title={product.name}/>
                <div className="container container-fluid">
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                           
                            <img src="./images/products/3.jpg" alt="sdf" height="500" width="500" />

                            
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.name}</h3>
                            <p id="product_id">Product # {product._id}</p>

                            <hr />

                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                            </div>


                            <hr />

                            <p id="product_price">${product.price}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus">-</span>

                                <input type="number" className="form-control count d-inline" value="1" readOnly />

                                <span className="btn btn-primary plus">+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span className={ product.stock > 0 ? 'greenColor': 'redColor'} id="stock_status">{ product.stock > 0 ? 'In Stock': 'Out of stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>


                            <div className="rating w-50"></div>

                        </div>

                    </div>
                </div>
            </Fragment>}
        </Fragment>


    )
}