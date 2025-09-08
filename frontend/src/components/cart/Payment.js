import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import {createOrder} from '../../actions/orderActions'
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    const { user } = useSelector(state => state.authState)
    const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error:orderError, loading:orderLoading, orderDetail } = useSelector(state => state.orderState)

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    // Redirect if no order info (user accessed payment page directly)
    useEffect(() => {
        if (!orderInfo && !paymentCompleted) {
            console.log('No order info found and payment not completed, redirecting to cart');
            toast.warning('Please complete your order details first.', {
                position: 'bottom-center'
            });
            navigate('/cart');
            return;
        }
    }, [orderInfo, navigate, paymentCompleted]);

    const paymentData = orderInfo ? {
        amount : Math.round( orderInfo.totalPrice * 100),
        shipping :{
            name: user?.name || '',
            address:{
                city: shippingInfo?.city || '',
                postal_code : shippingInfo?.postalCode || '',
                country: shippingInfo?.country || '',
                state: shippingInfo?.state || '',
                line1 : shippingInfo?.address || ''
            },
            phone: shippingInfo?.phoneNo || ''
        }
    } : {}

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        
    }

    useEffect(() => {
        console.log('Payment useEffect triggered:', { orderError, orderDetail, orderLoading });
        if(orderError) {
            console.log('Order error detected:', orderError);
            toast.error(orderError, {
                position: 'bottom-center',
                onOpen: ()=> { dispatch(clearOrderError()) }
            })
            setIsProcessing(false);
            document.querySelector('#pay_btn').disabled = false;
            return
        }

        // Navigate to success page when order is created successfully
        console.log('Checking navigation condition:', {
            orderDetailExists: !!orderDetail,
            orderDetailKeys: orderDetail ? Object.keys(orderDetail) : [],
            orderDetailLength: orderDetail ? Object.keys(orderDetail).length : 0,
            orderLoading: orderLoading
        });

        // Navigate only when payment is completed and order is successfully created
        if(paymentCompleted && orderDetail && (Object.keys(orderDetail).length > 0 || orderDetail._id) && !orderLoading) {
            console.log('Payment and order completed successfully, navigating to success page:', orderDetail);
            navigate('/order/success')
        }

    },[navigate, orderError, dispatch, orderDetail, orderLoading, paymentCompleted])

    const submitHandler = async (e) => {
        e.preventDefault();

        // Check if order info exists
        if (!orderInfo) {
            toast.error('Order information not found. Please go back to cart and checkout.', {
                position: 'bottom-center'
            });
            navigate('/cart');
            return;
        }

        // Validate Stripe and Elements availability
        if (!stripe) {
            toast.error('Stripe not loaded. Please refresh the page.', {
                position: 'bottom-center'
            });
            return;
        }

        if (!elements) {
            toast.error('Payment elements not loaded. Please refresh the page.', {
                position: 'bottom-center'
            });
            return;
        }

        // Validate card elements
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
            toast.error('Card elements not properly loaded. Please refresh the page.', {
                position: 'bottom-center'
            });
            return;
        }

        // Validate card details using Stripe's createPaymentMethod
        console.log('Validating card details...');
        const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
        });

        console.log('Stripe validation result:', { error: cardError, hasPaymentMethod: !!paymentMethod });

        if (cardError) {
            console.log('Card validation error:', cardError.message);
            toast.error(cardError.message, {
                position: 'bottom-center'
            });
            return;
        }

        if (!paymentMethod) {
            console.log('No payment method created - card details incomplete');
            toast.warning('Please fill in all card details completely.', {
                position: 'bottom-center'
            });
            return;
        }

        console.log('Card validation successful, proceeding with payment...');

        // Set processing state and disable button
        setIsProcessing(true);
        document.querySelector('#pay_btn').disabled = true;

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            };
            const {data} = await axios.post('/api/v1/payment/process', paymentData, config)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
                toast.error(result.error.message, {
                    position: 'bottom-center'
                })
                setIsProcessing(false);
                document.querySelector('#pay_btn').disabled = false;
            }else{
                if((await result).paymentIntent.status === 'succeeded') {
                    console.log('Payment succeeded, setting paymentCompleted to true');
                    setPaymentCompleted(true);

                    toast.success('Payment Success!', {
                        position: 'bottom-center'
                    })
                    order.paymentinfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }

                    console.log('Order data being sent:', order);
                    console.log('Dispatching orderCompleted and createOrder');

                    dispatch(orderCompleted())

                    // Create order after successful payment
                    try {
                        await dispatch(createOrder(order))
                        console.log('Order creation completed successfully');
                        // Navigation will be handled by useEffect when orderDetail is populated
                    } catch (error) {
                        console.error('Order creation failed:', error);
                        // Even if order creation fails, payment was successful, so navigate to success
                        console.log('Payment successful but order creation failed, navigating to success page');
                        navigate('/order/success');
                    }

                    // Fallback navigation in case useEffect doesn't trigger
                    setTimeout(() => {
                        console.log('Fallback navigation triggered after payment success');
                        if (!orderDetail || Object.keys(orderDetail).length === 0) {
                            console.log('Order detail not populated, navigating to success page as fallback');
                            navigate('/order/success');
                        }
                    }, 3000); // 3 second fallback

                }else{
                    toast.warning('Please Try again!', {
                        position: 'bottom-center'
                    })
                    setIsProcessing(false);
                    document.querySelector('#pay_btn').disabled = false;
                }
            }


        } catch (error) {
            console.error('Payment processing error:', error);
            toast.error('Payment failed. Please try again.', {
                position: 'bottom-center'
            });
            setIsProcessing(false);
            document.querySelector('#pay_btn').disabled = false;
        }
    }


     return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                        options={{
                            showIcon: true,
                            style: {
                                base: {
                                    fontSize: '16px',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                }
                            }
                        }}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                }
                            }
                        }}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    '::placeholder': {
                                        color: '#aab7c4'
                                    }
                                }
                            }
                        }}
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    disabled={isProcessing || !stripe || !elements || !orderInfo}
                    >
                    {isProcessing ? 'Processing Payment...' : `Pay - $${orderInfo?.totalPrice || '0.00'}`}
                    </button>
        
                </form>
            </div>
        </div>
    )
}