export default function ProductReview({reviews}) {
    return (
        <div className="reviews w-75">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review._id} className="review-card my-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{width: `${(Number(review.rating)||0)/5*100}%`}}></div>
                        </div>
                        {review.user && review.user.name ? (
                            <p className="review_user">by {review.user.name}</p>
                        ) : null}
                        <p className="review_comment">{review.comment}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p className="text-muted">No reviews yet.</p>
            )}
        </div>
    )
}