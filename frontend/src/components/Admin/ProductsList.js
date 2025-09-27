import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdminProducts } from '../../actions/productsActions';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductsList() {
	const dispatch = useDispatch();
	const { loading, products = [], error } = useSelector(state => state.productsState || {});
	const [searchTerm, setSearchTerm] = useState('');
	const [entriesPerPage, setEntriesPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(getAdminProducts());
	}, [dispatch]);

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try{
				const token = localStorage.getItem('token');
				await axios.delete(`/api/v1/product/${id}`, { headers: { 'Authorization': token ? `Bearer ${token}` : '' } });
				toast.success('Product deleted successfully');
				dispatch(getAdminProducts());
			}catch(err){
				toast.error(err.response?.data?.message || err.message || 'Delete failed');
			}
		}
	}

	// Filter products based on search term
	const filteredProducts = products.filter(product => 
		product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
		product.category?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Pagination logic
	const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
	const startIndex = (currentPage - 1) * entriesPerPage;
	const endIndex = startIndex + entriesPerPage;
	const currentProducts = filteredProducts.slice(startIndex, endIndex);

	return (
		<div style={{ 
			backgroundColor: '#f8f9fa', 
			minHeight: '100vh', 
			padding: '2rem 0' 
		}}>
			<div className="container-fluid">
				<div style={{
					backgroundColor: 'white',
					borderRadius: '12px',
					padding: '2rem',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					marginBottom: '2rem'
				}}>
					{/* Header */}
					<div style={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center',
						marginBottom: '2rem'
					}}>
						<h2 style={{ 
							fontSize: '1.8rem', 
							fontWeight: '600', 
							color: '#2c3e50',
							margin: 0
						}}>
							Products
						</h2>
						<Link 
							to="/admin/products/create" 
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '0.5rem',
								backgroundColor: '#ff6b35',
								color: 'white',
								padding: '0.75rem 1.5rem',
								borderRadius: '8px',
								textDecoration: 'none',
								fontWeight: '500',
								transition: 'all 0.3s ease'
							}}
							onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
							onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
						>
							<i className="fa fa-plus"></i> Create Product
						</Link>
					</div>

					{/* Controls */}
					<div style={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						alignItems: 'center',
						marginBottom: '1.5rem',
						flexWrap: 'wrap',
						gap: '1rem'
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
									width: '200px',
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
							<p style={{ marginTop: '1rem', color: '#6c757d' }}>Loading products...</p>
						</div>
					)}

					{/* Table */}
					{!loading && !error && (
						<div style={{ 
							borderRadius: '8px',
							overflow: 'hidden',
							border: '1px solid #e1e5e9'
						}}>
							<table style={{ 
								width: '100%', 
								borderCollapse: 'collapse',
								backgroundColor: 'white'
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
											Product ID
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Name
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Price
										</th>
										<th style={{ 
											padding: '1rem',
											textAlign: 'left',
											fontWeight: '600',
											color: '#2c3e50',
											borderBottom: '1px solid #e1e5e9',
											fontSize: '0.9rem'
										}}>
											Stock
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
									{currentProducts.length > 0 ? currentProducts.map((product, index) => (
										<tr key={product._id} style={{ 
											backgroundColor: index % 2 === 0 ? 'white' : '#f8f9fa',
											borderBottom: '1px solid #e1e5e9'
										}}>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: '#2c3e50',
												fontFamily: 'monospace'
											}}>
												{product._id}
											</td>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: '#2c3e50',
												fontWeight: '500'
											}}>
												{product.name}
											</td>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: '#2c3e50',
												fontWeight: '500'
											}}>
												${product.price}
											</td>
											<td style={{ 
												padding: '1rem',
												fontSize: '0.9rem',
												color: product.stock > 0 ? '#28a745' : '#dc3545',
												fontWeight: '500'
											}}>
												{product.stock}
											</td>
											<td style={{ padding: '1rem' }}>
												<div style={{ display: 'flex', gap: '0.5rem' }}>
													<Link 
														to={`/admin/product/${product._id}/edit`}
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
														<i className="fa fa-pencil" style={{ fontSize: '0.8rem' }}></i>
													</Link>
													<button 
														onClick={() => handleDelete(product._id)}
														style={{
															display: 'inline-flex',
															alignItems: 'center',
															justifyContent: 'center',
															width: '32px',
															height: '32px',
															backgroundColor: '#dc3545',
															color: 'white',
															border: 'none',
															borderRadius: '6px',
															cursor: 'pointer',
															transition: 'all 0.3s ease'
														}}
														onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
														onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
													>
														<i className="fa fa-trash" style={{ fontSize: '0.8rem' }}></i>
													</button>
												</div>
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
												No products found
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}

					{/* Pagination */}
					{!loading && !error && filteredProducts.length > 0 && (
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
								Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} entries
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
