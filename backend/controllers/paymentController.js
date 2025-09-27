const catchAsyncError = require('../middlewares/catchAsyncError');

// Initialize Stripe only if the secret key is available
let stripe;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_your_stripe_secret_key_here') {
    stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn('Stripe secret key not configured. Payment functionality will be disabled.');
}



exports.processPayment = catchAsyncError(async(req, res , next) => {
    if (!stripe) {
        return res.status(500).json({
            success: false,
            message: 'Stripe is not configured. Please set up your Stripe API keys.'
        });
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "Test Payment",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret,
    })
})

exports.sendStripeApi = catchAsyncError(async(req, res , next) => {
    console.log('STRIPE_API_KEY:', process.env.STRIPE_API_KEY);

    if (!process.env.STRIPE_API_KEY || process.env.STRIPE_API_KEY === 'pk_test_your_stripe_publishable_key_here') {
        return res.status(500).json({
            success: false,
            message: 'Stripe API key not configured. Please set up your Stripe API keys.'
        });
    }

    res.status(200).json({
        success: true,
        stripeApiKey: process.env.STRIPE_API_KEY,
    })
})