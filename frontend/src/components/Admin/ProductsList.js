import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdminProducts } from '../../actions/productsActions';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductsList() {
	const dispatch = useDispatch();
	const { loading, products = [], error } = useSelector(state => state.productsState || {});

	useEffect(() => {
		dispatch(getAdminProducts());
	}, [dispatch]);

	const handleDelete = async (id) => {
		try{
			const token = localStorage.getItem('token');
			await axios.delete(`/api/v1/product/${id}`, { headers: { 'Authorization': token ? `Bearer ${token}` : '' } });
			toast.success('Product deleted');
			dispatch(getAdminProducts());
		}catch(err){
			toast.error(err.response?.data?.message || err.message || 'Delete failed');
		}
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 d-flex align-items-center justify-content-between mb-3">
					<h2>Products</h2>
					<Link to="/admin/products/create" className="btn btn-primary"><i className="fa fa-plus"></i> Create</Link>
				</div>
				<div className="col-12">
					{loading && <p>Loading...</p>}
					{error && <div className="alert alert-danger" role="alert">{String(error)}</div>}
					{!loading && !error && (
						<div className="table-responsive">
							<table className="table table-bordered table-striped" id="products_table">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Price</th>
										<th>Stock</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(products) && products.length > 0 ? products.map(p => (
											<tr key={p._id}>
												<td>{p._id}</td>
												<td>{p.name}</td>
												<td>${p.price}</td>
												<td>{p.stock}</td>
												<td>
													<Link className="btn btn-primary" to={`/admin/product/${p._id}/edit`}><i className="fa fa-pencil"></i></Link>
													<button className="btn btn-danger ml-2" onClick={() => handleDelete(p._id)}><i className="fa fa-trash"></i></button>
												</td>
											</tr>
										)) : (
										<tr>
											<td colSpan="5" className="text-center">No products found</td>
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
