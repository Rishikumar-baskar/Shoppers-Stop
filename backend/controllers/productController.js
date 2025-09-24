const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');
const { request } = require('express');

//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next)=>{
  const resPerPage = 4;

  let buildQuery = () => {
    return new APIFeatures(Product.find(), req.query).search().filter();
  }

  const filteredProductsCount = await buildQuery().query.countDocuments({});

  const totalProductsCount = await Product.countDocuments({});

  let productsCount = totalProductsCount;
  if(filteredProductsCount !== totalProductsCount){
    productsCount = filteredProductsCount;

  }
  
      const products = await buildQuery().paginate(resPerPage).query;
      res.status(200).json({
        success : true,
        productsCount: productsCount,resPerPage,
        products
      })
})


//Create Product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req,res,next)=>{
   req.body.user = req.user.id

   let images = []
   if(req.files && req.files.length > 0){
       req.files.forEach(file => {
           let url = `/uploads/product/${file.originalname}`
           images.push({image: url})
       })
       req.body.images = images
   }

   const product = await Product.create(req.body);
      res.status(201).json({
       success: true,
       product
      })

});

//Get single product
exports.getSingleProduct = async(req, res, next) => {
 const product = await Product.findById(req.params.id).populate('reviews.user', 'name');

 if(!product){
  return next(new ErrorHandler('Product not found!', 400));
 }

 res.status(200).json({
  success: true,
  product
 })
}

//Update product
exports.updateProduct = async(req, res, next) => {
   let product = await Product.findById(req.params.id);

   if(!product){
   return res.status(404).json(
     {
       success: false,
       message: "product not found"
     }
   );
  }

  let images = []
  if(req.files && req.files.length > 0){
      req.files.forEach(file => {
          let url = `/uploads/product/${file.originalname}`
          images.push({image: url})
      })
      req.body.images = images
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true
  })

  res.status(200).json({
   success: true,
   product
  })
}

//DeleteProduct
exports.deleteProduct = async (req, res, next) =>{
  const product = await Product.findById(req.params.id);

 if(!product){
  return res.status(404).json(
    {
      success: false,
      message: "product not found"
    }
  );
 }

 await product.deleteOne({ _id: req.params.id });

 res.status(200).json({
  success: true,
  message: "product deleted"
 })
}

// Create Review - api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment} = req.body;

  const review = {
    user : req.user.id,
    rating: Number(rating),
    comment
  }

  const product = await Product.findById(productId);

  // Always append a new review, even if the same user reviewed before
  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;

  // Recalculate average rating
  product.ratings = product.reviews.reduce((acc, review) => {
    return Number(review.rating) + acc;
  }, 0) / product.reviews.length;
  product.ratings = isNaN(product.ratings)?0:product.ratings;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true
  })

})

//Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate('reviews.user', 'name');

  res.status(200).json({
    success: true,
    reviews: product.reviews
  })
})

//Delete Review - api/v1/review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  
  //filtering the reviews which does not match the deleting review id
  const reviews = product.reviews.filter(review => {
  return review._id.toString() !== req.query.id.toString()
  });

  //number of reviews
  const numOfReviews = reviews.length;

  //finding average with filtered reviews
  let ratings = reviews.reduce((acc, review) => {
    return review.rating + acc;
  }, 0) / reviews.length;
  ratings = isNaN(ratings)?0:ratings;

  //saving the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings
  })

  res.status(200).json({
    success: true
  })
});
// get admin products  - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) =>{
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products
    })
});