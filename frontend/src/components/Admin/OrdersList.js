import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminOrders } from '../../actions/orderActions';

export default function OrdersList() {
	const dispatch = useDispatch();
	const { loading, adminOrders: orders = [], error } = useSelector(state => state.orderState || {});

	useEffect(() => {
		dispatch(adminOrders());
	}, [dispatch]);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 d-flex align-items-center justify-content-between mb-3">
					<h2>Orders</h2>
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
										<th>Status</th>
										<th>Items</th>
										<th>Total</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(orders) && orders.length > 0 ? orders.map(o => (
											<tr key={o._id}>
												<td>{o._id}</td>
												<td>{o.orderStatus}</td>
												<td>{o.orderItems?.length || 0}</td>
												<td>${o.totalPrice}</td>
												<td>
													<Link className="btn btn-primary" to={`/order/${o._id}`}><i className="fa fa-eye"></i></Link>
												</td>
											</tr>
										)) : (
										<tr>
											<td colSpan="5" className="text-center">No orders found</td>
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
