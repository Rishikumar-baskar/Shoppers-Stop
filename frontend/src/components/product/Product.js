import { Link } from "react-router-dom"


export default function Product({ product, col = 3, colSm = 12, colMd = 6, colLg = 3 }) {
    return (
        <div className={`col-${colSm} col-md-${colMd} col-lg-${colLg} mb-4`}>
            <div className="card h-100">
                <div className="card-img-container p-3">
                    <img
                        className="card-img-top w-100"
                        src={product.images && product.images[0] ? product.images[0].image : '/images/default_product.png'}
                        alt={product.name}
                        style={{ height: '200px', objectFit: 'contain' }}
                    />
                </div>
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title mb-2">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h6>
                    <div className="ratings mb-2">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text mb-3">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block mt-auto">View Details</Link>
                </div>
            </div>
        </div>
    )
}