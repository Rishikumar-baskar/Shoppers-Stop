import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview, getProduct } from "../../actions/productAction";
import { clearReviewSubmitted, clearError } from "../../slices/productSlice";
import { toast } from 'react-toastify';
import Loader from '../layouts/Loader'
import MetaData from "../layouts/MetaData";
import { addCartItem } from "../../actions/cartActions";
import {Modal, Carousel} from 'react-bootstrap';
import ProductReview from './ProductReview';

export default function ProductDetail() {
    const { loading, product, isReviewSubmitted, error } = useSelector((state) => state.productState);
    const { isAuthenticated } = useSelector((state) => state.authState || { isAuthenticated: false });
    const dispatch = useDispatch();
    const { id } = useParams()
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        const count = document.querySelector('.count')
            if(product.stock === 0 || count.valueAsNumber >= product.stock ) return;
            const qty = count.valueAsNumber + 1;
            setQuantity(qty);

            
        
    }
    const decreaseQty = () => {
        const count = document.querySelector('.count')
            if(count.valueAsNumber === 1 ) return;
            const qty = count.valueAsNumber - 1;
            setQuantity(qty);

            
        
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(!isAuthenticated){
            toast.error('Login first to submit review');
            return;
        }
        setShow(true);
    };
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState("");





    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch,id])

    useEffect(() => {
        if(isReviewSubmitted){
            toast.success('Review submitted successfully');
            setShow(false);
            setComment("");
            dispatch(getProduct(id));
            dispatch(clearReviewSubmitted());
        }
    }, [isReviewSubmitted, dispatch, id])

    useEffect(() => {
        if(error){
            toast.error(typeof error === 'string' ? error : 'Failed to submit review');
            dispatch(clearError());
        }
    }, [error, dispatch])
    return (
        <Fragment>
            {loading? <Loader/>:
            <Fragment>
                <MetaData title={product.name}/>
                <div className="container container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-5 img-fluid mb-4 mb-lg-0" id="product_image">
                            {product.images && product.images.length > 1 ? (
                                <Carousel>
                                    {product.images.map((image, index) => (
                                        <Carousel.Item key={index}>
                                            <img
                                                className="d-block w-100"
                                                src={image.image}
                                                alt={`${product.name} - Image ${index + 1}`}
                                                height="500"
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <img
                                    src={product.images && product.images.length > 0 ? product.images[0].image : '/images/default_product.png'}
                                    alt={product.name}
                                    height="500"
                                    width="500"
                                    className="d-block w-100"
                                    style={{ objectFit: 'contain' }}
                                />
                            )}

       <hr />
       <ProductReview reviews={product.reviews} />
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
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" disabled={product.stock===0?true:false} onClick={()=>(dispatch(addCartItem(product._id, quantity)))} className="btn btn-primary d-inline ml-4">Add to Cart</button>

                            <hr />

                            <p>Status: <span className={ product.stock > 0 ? 'greenColor': 'redColor'} id="stock_status">{ product.stock > 0 ? 'In Stock': 'Out of stock'}</span></p>

                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p>{product.description}</p>
                            <hr />
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                            <button onClick={handleShow}  id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Submit Your Review
                           </button>

                            <div className="row mt-2 mb-5">
                <div className="rating w-50">
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Submit Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="stars">
                                {
                                    [1,2,3,4,5].map(star =>(
                                      <li value={star} onClick={()=>setRating(star)} className={`star ${star<=rating?'orange':''}`} onMouseOver={(e) => e.target.classList.add('yellow')} onMouseOut={(e) => e.target.classList.remove('yellow')}><i className="fa fa-star"></i></li>
                                    ))
                                }
                                
                            </ul>

                            <textarea name="review" id="review" className="form-control mt-3" placeholder="Write your review here..." value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>

                            <button className="btn my-3 float-right review-btn px-4 text-white" onClick={() => {
                                if(!isAuthenticated){
                                    toast.error('Login first to submit review');
                                    return;
                                }
                                dispatch(createReview({ productId: id, rating, comment }))
                            }}>
                                Submit
                            </button>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>

			

                        </div>

                    </div>
                </div>
            </Fragment>}
        </Fragment>


    )
}