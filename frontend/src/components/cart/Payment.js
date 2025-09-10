import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";
import { createOrder } from "../../actions/orderActions";
import { clearError as clearOrderError } from "../../slices/orderSlice";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [payBtnDisabled, setPayBtnDisabled] = useState(false);

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const { user } = useSelector(state => state.authState);
    const { items: cartItems, shippingInfo } = useSelector(state => state.cartState);
    const { error: orderError } = useSelector(state => state.orderState);

    const paymentData = {
        amount: Math.round(orderInfo?.totalPrice * 100),
        shipping: {
            name: user?.name || "",
            address: {
                city: shippingInfo?.city || "",
                postal_code: shippingInfo?.postalCode || "",
                country: shippingInfo?.country || "",
                state: shippingInfo?.state || "",
                line1: shippingInfo?.address || ""
            },
            phone: shippingInfo?.phoneNo || ""
        }
    };

    useEffect(() => {
        if(orderError && payBtnDisabled) {
            toast.error(orderError, {
                position: "bottom-center",
                onOpen: () => { dispatch(clearOrderError()); }
            });
        }
    }, [orderError, dispatch, payBtnDisabled]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setPayBtnDisabled(true);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            };
            const { data } = await axios.post('/api/v1/payment/process', paymentData, config);
            const clientSecret = data.client_secret;

            if (!stripe || !elements) {
                throw new Error("Stripe has not loaded.");
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user?.name || "",
                        email: user?.email || ""
                    }
                }
            });

            if(result.error) {
                toast.error(result.error.message, {
                    position: "bottom-center"
                });
                setPayBtnDisabled(false);
            } else if(result.paymentIntent.status === 'succeeded') {
                toast.success("Payment Success!", {
                    position: "bottom-center"
                });

                // Build order after payment succeeds
                const order = {
                    orderItems: cartItems,
                    shippingInfo,
                    itemsPrice: orderInfo.itemsPrice,
                    shippingPrice: orderInfo.shippingPrice,
                    taxPrice: orderInfo.taxPrice,
                    totalPrice: orderInfo.totalPrice,
                    paymentInfo: {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    },
                    paidAt: new Date().toISOString()
                };

                dispatch(orderCompleted());
                dispatch(createOrder(order));
                navigate('/order/success');
            } else {
                toast.warning("Please try again!", {
                    position: "bottom-center"
                });
                setPayBtnDisabled(false);
            }
        } catch (error) {
            console.error("Payment failed:", error);
            toast.error("Payment failed. Please try again.", {
                position: "bottom-center"
            });
            setPayBtnDisabled(false);
        }
    };

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
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_exp_field">Card Expiry</label>
                        <CardExpiryElement
                            type="text"
                            id="card_exp_field"
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="card_cvc_field">Card CVC</label>
                        <CardCvcElement
                            type="text"
                            id="card_cvc_field"
                            className="form-control"
                        />
                    </div>

                    <button
                        id="pay_btn"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={payBtnDisabled}
                    >
                        Pay - { ` $${orderInfo?.totalPrice || "0.00"}` }
                    </button>
                </form>
            </div>
        </div>
    );
}
