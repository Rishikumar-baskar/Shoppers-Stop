const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({storage:multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,'..', 'uploads/product'))
    },
    filename: function(req,file,cb) {
        cb(null, file.originalname )
    }
})})

const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview, getReviews, deleteReview, getAdminProducts } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

router.route('/products').get( getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), updateProduct);
router.route('/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);
router.route('/review').put(isAuthenticatedUser, createReview);
router.route('/reviews').get(isAuthenticatedUser, getReviews);
router.route('/review').delete(isAuthenticatedUser, deleteReview);

//Admin routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), upload.array('images'), newProduct);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);


module.exports = router;