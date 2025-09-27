import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminOrders } from '../../actions/orderActions';

export default function OrdersList() {
	const dispatch = useDispatch();
	const { loading, adminOrders: orders = [], error } = useSelector(state => state.orderState || {});
	const [searchTerm, setSearchTerm] = useState('');
	const [entriesPerPage, setEntriesPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(adminOrders());
	}, [dispatch]);

	// Filter orders based on search term
	const filteredOrders = orders.filter(order => 
		order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
		order.orderStatus.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const totalPages = Math.ceil(filteredOrders.length / entriesPerPage);
	const startIndex = (currentPage - 1) * entriesPerPage;
	const endIndex = startIndex + entriesPerPage;
	const currentOrders = filteredOrders.slice(startIndex, endIndex);

	const getStatusColor = (status) => {
		switch(status.toLowerCase()) {
			case 'processing': return '#dc3545';
			case 'shipped': return '#ffc107';
			case 'delivered': return '#28a745';
			default: return '#6c757d';
		}
	};

	return (
		<div style={{ 
			backgroundColor: '#f8f9fa', 
			minHeight: '100vh', 
			padding: window.innerWidth < 768 ? '1rem 0' : '2rem 0' 
		}}>
			<div className="container-fluid" style={{ padding: window.innerWidth < 768 ? '0.5rem' : '1rem' }}>
				<div style={{
					backgroundColor: 'white',
					borderRadius: '12px',
					padding: window.innerWidth < 768 ? '1rem' : '2rem',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					marginBottom: '2rem'
				}}>
					{/* Header */}
					<div style={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center',
						marginBottom: window.innerWidth < 768 ? '1.5rem' : '2rem',
						flexDirection: window.innerWidth < 576 ? 'column' : 'row',
						gap: window.innerWidth < 576 ? '1rem' : '0'
					}}>
						<h2 style={{ 
							fontSize: window.innerWidth < 576 ? '1.5rem' : '1.8rem', 
							fontWeight: '600', 
							color: '#2c3e50',
							margin: 0
						}}>
							Orders
						</h2>
					</div>

					{/* Controls */}
					<div style={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center',
						marginBottom: '1.5rem',
						flexWrap: 'wrap',
						gap: '1rem',
						flexDirection: window.innerWidth < 576 ? 'column' : 'row'
					}}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
							<label style={{ 
								fontWeight: '500', 
								color: '#2c3e50',
								fontSize: '0.9rem'
							}}>
								Show entries
							</label>
							<select 
								value={entriesPerPage} 
								onChange={(e) => {
									setEntriesPerPage(Number(e.target.value));
									setCurrentPage(1);
								}}
								style={{
									border: '1px solid #e1e5e9',
									borderRadius: '6px',
									padding: '0.5rem',
									fontSize: '0.9rem',
									backgroundColor: 'white'
								}}
							>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>
						</div>
						
						<div style={{ position: 'relative' }}>
							<input
								type="text"
								placeholder="Search"
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
								style={{
									border: '1px solid #e1e5e9',
									borderRadius: '6px',
									padding: '0.5rem 1rem',
									fontSize: '0.9rem',
									width: window.innerWidth < 576 ? '100%' : '200px',
									backgroundColor: 'white'
								}}
							/>
						</div>
					</div>

					{/* Error Display */}
					{error && (
						<div className="alert alert-danger" role="alert" style={{ 
							borderRadius: '8px',
							marginBottom: '1.5rem'
						}}>
							{String(error)}
						</div>
					)}

					{/* Loading State */}
					{loading && (
						<div className="text-center" style={{ padding: '2rem' }}>
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
							<p style={{ marginTop: '1rem', color: '#6c757d' }}>Loading orders...</p>
						</div>
					)}

					{/* Table */}
					{!loading && !error && (
						<div style={{ 
							borderRadius: '8px',
							overflow: 'auto',
							border: '1px solid #e1e5e9',
							maxWidth: '100%'
						}}>
							<table style={{ 
								width: '100%', 
								borderCollapse: 'collapse',
								backgroundColor: 'white',
								minWidth: window.innerWidth < 768 ? '600px' : 'auto'
							}}>
								<thead>
									<tr style={{ backgroundColor: '#f8f9fa' }}>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Order ID
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Number of Items
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Amount
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Status
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Actions
										</th>
									</tr>
								</thead>
								<tbody>
									{currentOrders.length > 0 ? currentOrders.map((order, index) => (
										<tr key={order._id} style={{ 
											backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
											borderBottom: '1px solid #e1e5e9'
										}}>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: '#2c3e50',
												fontFamily: 'monospace'
											}}>
												{order._id}
											</td>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: '#2c3e50'
											}}>
												{order.orderItems?.length || 0}
											</td>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: '#2c3e50',
												fontWeight: '500'
											}}>
												${order.totalPrice}
											</td>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: getStatusColor(order.orderStatus),
												fontWeight: '500'
											}}>
												{order.orderStatus}
											</td>
											<td style={{ padding: '1rem' }}>
												<Link 
													to={`/order/${order._id}`}
													style={{
														display: 'inline-flex',
														alignItems: 'center',
														justifyContent: 'center',
														width: '32px',
														height: '32px',
														backgroundColor: '#007bff',
														color: 'white',
														borderRadius: '6px',
														textDecoration: 'none',
														transition: 'all 0.3s ease'
													}}
													onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
													onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
												>
													<i className="fa fa-eye" style={{ fontSize: '0.8rem' }}></i>
												</Link>
											</td>
										</tr>
									)) : (
										<tr>
											<td colSpan="5" style={{ 
												padding: '2rem',
												textAlign: 'center',
												color: '#6c757d',
												fontStyle: 'italic'
											}}>
												No orders found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}

					{/* Pagination */}
					{!loading && !error && filteredOrders.length > 0 && (
						<div style={{ 
							display: 'flex', 
							justifyContent: 'space-between', 
							alignItems: 'center',
							marginTop: '1.5rem',
							flexWrap: 'wrap',
							gap: '1rem'
						}}>
							<div style={{ 
								color: '#6c757d',
								fontSize: '0.9rem'
							}}>
								Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} entries
							</div>
							
							<div style={{ display: 'flex', gap: '0.5rem' }}>
								<button
									onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
									disabled={currentPage === 1}
									style={{
										padding: '0.5rem 1rem',
										border: '1px solid #e1e5e9',
										borderRadius: '6px',
										backgroundColor: currentPage === 1 ? '#f8f9fa' : 'white',
										color: currentPage === 1 ? '#6c757d' : '#2c3e50',
										cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
										fontSize: '0.9rem'
									}}
								>
									Previous
								</button>
								
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
									<button
										key={page}
										onClick={() => setCurrentPage(page)}
										style={{
											padding: '0.5rem 1rem',
											border: '1px solid #e1e5e9',
											borderRadius: '6px',
											backgroundColor: currentPage === page ? '#ff6b35' : 'white',
											color: currentPage === page ? 'white' : '#2c3e50',
											cursor: 'pointer',
											fontSize: '0.9rem',
											fontWeight: currentPage === page ? '500' : 'normal'
										}}
									>
										{page}
									</button>
								))}
								
								<button
									onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
									disabled={currentPage === totalPages}
									style={{
										padding: '0.5rem 1rem',
										border: '1px solid #e1e5e9',
										borderRadius: '6px',
										backgroundColor: currentPage === totalPages ? '#f8f9fa' : 'white',
										color: currentPage === totalPages ? '#6c757d' : '#2c3e50',
										cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
										fontSize: '0.9rem'
									}}
								>
									Next
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
