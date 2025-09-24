import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function ReviewsList() {
	const dispatch = useDispatch();
	const [productId, setProductId] = useState('');
	const [productName, setProductName] = useState('');
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [reviews, setReviews] = useState([]);

	const searchProducts = async (name) => {
		if (!name.trim()) {
			setProducts([]);
			return;
		}
		try {
			const { data } = await axios.get(`/api/v1/products?keyword=${name}&limit=10`);
			setProducts(data.products || []);
		} catch (err) {
			console.error('Error searching products:', err);
		}
	}

	const selectProduct = (product) => {
		setProductId(product._id);
		setProductName(product.name);
		setProducts([]);
		fetchReviews(product._id);
	}

	const fetchReviews = async (id = productId) => {
		try{
			setLoading(true);
			setError(null);
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Authorization': token ? `Bearer ${token}` : ''
				}
			};
			const { data } = await axios.get(`/api/v1/reviews?id=${id}`, config);
			setReviews(data.reviews || []);
		} catch(err){
			setError(err.response?.data?.message || err.message);
		} finally {
			setLoading(false);
		}
	}

	// Removed useEffect that was calling fetchReviews on productId change
	// Now fetchReviews is called when selecting a product

	const handleDelete = async (rid) => {
		try{
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Authorization': token ? `Bearer ${token}` : ''
				}
			};
			await axios.delete(`/api/v1/review?id=${rid}&productId=${productId}`, config);
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
					<div className="position-relative">
						<input
							type="text"
							className="form-control"
							placeholder="Search product by name..."
							value={productName}
							onChange={(e) => {
								setProductName(e.target.value);
								searchProducts(e.target.value);
							}}
						/>
						{products.length > 0 && (
							<div className="position-absolute bg-white border rounded shadow-sm w-100 mt-1" style={{zIndex: 1000, maxHeight: '200px', overflowY: 'auto'}}>
								{products.map(product => (
									<div
										key={product._id}
										className="p-2 border-bottom cursor-pointer"
										onClick={() => selectProduct(product)}
										style={{cursor: 'pointer'}}
									>
										{product.name}
									</div>
								))}
							</div>
						)}
					</div>
					{productId && (
						<div className="mt-2">
							<small className="text-muted">Selected: {productName}</small>
							<button className="btn btn-sm btn-outline-secondary ml-2" onClick={() => { setProductId(''); setProductName(''); setReviews([]); }}>Clear</button>
						</div>
					)}
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


