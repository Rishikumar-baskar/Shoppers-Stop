import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function ReviewsList() {
	const dispatch = useDispatch();
	const [productId, setProductId] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [reviews, setReviews] = useState([]);

	const fetchReviews = async () => {
		try{
			setLoading(true);
			setError(null);
			const { data } = await axios.get(`/api/v1/reviews?id=${productId}`);
			setReviews(data.reviews || []);
		} catch(err){
			setError(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	}

	useEffect(()=>{
		if(productId){
			fetchReviews();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const handleDelete = async (rid) => {
		try{
			await axios.delete(`/api/v1/review?id=${rid}&productId=${productId}`);
			setReviews(prev => prev.filter(r => r._id !== rid));
		}catch(err){
			setError(err.response?.data?.message || err.message);
		}
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 mb-3">
					<h2>Product Reviews</h2>
					<div className="d-flex">
						<input type="text" className="form-control mr-2" placeholder="Enter Product ID" value={productId} onChange={(e)=>setProductId(e.target.value)} />
						<button className="btn btn-primary" onClick={fetchReviews} disabled={!productId}>Search</button>
					</div>
				</div>
				<div className="col-12">
					{loading && <p>Loading...</p>}
					{error && <div className="alert alert-danger" role="alert">{String(error)}</div>}
					{!loading && !error && (
						<div className="table-responsive">
							<table className="table table-bordered table-striped">
								<thead>
									<tr>
										<th>ID</th>
										<th>Rating</th>
										<th>Comment</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(reviews) && reviews.length > 0 ? reviews.map(r => (
											<tr key={r._id}>
												<td>{r._id}</td>
												<td>{r.rating}</td>
												<td>{r.comment}</td>
												<td>
													<button className="btn btn-danger" onClick={()=>handleDelete(r._id)}><i className="fa fa-trash"></i></button>
												</td>
											</tr>
									)) : (
									<tr>
										<td colSpan="4" className="text-center">No reviews</td>
									</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}


