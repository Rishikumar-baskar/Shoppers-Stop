import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const categories = ['Electronics','Mobile Phones','Laptops','Accessories','Headphones','Food','Books','Clothes/shoes','Beauty/health','Sports','Outdoor','Home'];

export default function ProductEdit(){
	const navigate = useNavigate();
	const { id } = useParams();
	const [form, setForm] = useState({ name:'', price:0, description:'', category:'', seller:'', stock:0 });
	const [images, setImages] = useState([]);
	const [existingImages, setExistingImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(()=>{
		(async()=>{
			try{
				setLoading(true);
				const { data } = await axios.get(`/api/v1/product/${id}`);
				const p = data.product;
				setForm({
					name: p.name || '',
					price: p.price || 0,
					description: p.description || '',
					category: p.category || '',
					seller: p.seller || '',
					stock: p.stock || 0
				});
				setExistingImages(p.images || []);
			}catch(err){
				setError(err.response?.data?.message || err.message);
			}finally{
				setLoading(false);
			}
		})();
	},[id])

	const onFiles = (e) => {
		setImages(Array.from(e.target.files || []));
	}

	const onChange = (e) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try{
			setLoading(true); setError(null);
			const token = localStorage.getItem('token');

			let data, config;
			if(images.length > 0){
				data = new FormData();
				Object.entries(form).forEach(([k,v]) => data.append(k, v));
				images.forEach(img => data.append('images', img));
				config = {
					headers: {
						'Content-Type':'multipart/form-data',
						'Authorization': token ? `Bearer ${token}` : ''
					}
				};
			}else{
				data = form;
				config = {
					headers: {
						'Content-Type':'application/json',
						'Authorization': token ? `Bearer ${token}` : ''
					}
				};
			}

			await axios.put(`/api/v1/product/${id}`, data, config);
			toast.success('Product updated successfully!', {
				position: "bottom-center"
			});
			navigate('/admin/products');
		}catch(err){
			setError(err.response?.data?.message || err.message);
		}finally{
			setLoading(false);
		}
	}

	return (
		<div className="container" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '2rem 0' }}>
			<div className="row justify-content-center">
				<div className="col-12 col-md-8 col-lg-6">
					<div style={{
						backgroundColor: 'white',
						borderRadius: '12px',
						padding: '2rem',
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
						marginBottom: '2rem'
					}}>
						<h2 style={{ 
							fontSize: '1.8rem', 
							fontWeight: '600', 
							color: '#2c3e50', 
							marginBottom: '2rem',
							textAlign: 'center'
						}}>
							Update Product
						</h2>
						
						{error && (
							<div className="alert alert-danger" role="alert" style={{ 
								borderRadius: '8px',
								marginBottom: '1.5rem'
							}}>
								{String(error)}
							</div>
						)}
						
						{loading && !form.name && (
							<div className="text-center" style={{ padding: '2rem' }}>
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
								<p style={{ marginTop: '1rem', color: '#6c757d' }}>Loading product details...</p>
							</div>
						)}
						
						{form.name && (
							<form onSubmit={onSubmit}>
								<div className="row">
									<div className="col-12 col-md-6">
										<div className="form-group" style={{ marginBottom: '1.5rem' }}>
											<label style={{ 
												fontWeight: '500', 
												color: '#2c3e50', 
												marginBottom: '0.5rem',
												display: 'block'
											}}>
												Product Name
											</label>
											<input 
												name="name" 
												value={form.name} 
												onChange={onChange} 
												className="form-control" 
												required 
												style={{
													border: '1px solid #e1e5e9',
													borderRadius: '8px',
													padding: '0.75rem',
													fontSize: '1rem'
												}}
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-group" style={{ marginBottom: '1.5rem' }}>
											<label style={{ 
												fontWeight: '500', 
												color: '#2c3e50', 
												marginBottom: '0.5rem',
												display: 'block'
											}}>
												Price ($)
											</label>
											<input 
												type="number" 
												name="price" 
												value={form.price} 
												onChange={onChange} 
												className="form-control" 
												min="0" 
												step="0.01" 
												required 
												style={{
													border: '1px solid #e1e5e9',
													borderRadius: '8px',
													padding: '0.75rem',
													fontSize: '1rem'
												}}
											/>
										</div>
									</div>
								</div>
								
								<div className="form-group" style={{ marginBottom: '1.5rem' }}>
									<label style={{ 
										fontWeight: '500', 
										color: '#2c3e50', 
										marginBottom: '0.5rem',
										display: 'block'
									}}>
										Description
									</label>
									<textarea 
										name="description" 
										value={form.description} 
										onChange={onChange} 
										className="form-control" 
										rows="4" 
										required 
										style={{
											border: '1px solid #e1e5e9',
											borderRadius: '8px',
											padding: '0.75rem',
											fontSize: '1rem',
											resize: 'vertical'
										}}
									/>
								</div>
								
								<div className="row">
									<div className="col-12 col-md-6">
										<div className="form-group" style={{ marginBottom: '1.5rem' }}>
											<label style={{ 
												fontWeight: '500', 
												color: '#2c3e50', 
												marginBottom: '0.5rem',
												display: 'block'
											}}>
												Category
											</label>
											<select 
												name="category" 
												value={form.category} 
												onChange={onChange} 
												className="form-control" 
												required 
												style={{
													border: '1px solid #e1e5e9',
													borderRadius: '8px',
													padding: '0.75rem',
													fontSize: '1rem'
												}}
											>
												<option value="">Select Category</option>
												{categories.map(c => <option key={c} value={c}>{c}</option>)}
											</select>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-group" style={{ marginBottom: '1.5rem' }}>
											<label style={{ 
												fontWeight: '500', 
												color: '#2c3e50', 
												marginBottom: '0.5rem',
												display: 'block'
											}}>
												Seller
											</label>
											<input 
												name="seller" 
												value={form.seller} 
												onChange={onChange} 
												className="form-control" 
												required 
												style={{
													border: '1px solid #e1e5e9',
													borderRadius: '8px',
													padding: '0.75rem',
													fontSize: '1rem'
												}}
											/>
										</div>
									</div>
								</div>
								
								<div className="row">
									<div className="col-12 col-md-6">
										<div className="form-group" style={{ marginBottom: '1.5rem' }}>
											<label style={{ 
												fontWeight: '500', 
												color: '#2c3e50', 
												marginBottom: '0.5rem',
												display: 'block'
											}}>
												Stock Quantity
											</label>
											<input 
												type="number" 
												name="stock" 
												value={form.stock} 
												onChange={onChange} 
												className="form-control" 
												min="0" 
												required 
												style={{
													border: '1px solid #e1e5e9',
													borderRadius: '8px',
													padding: '0.75rem',
													fontSize: '1rem'
												}}
											/>
										</div>
									</div>
									<div className="col-12 col-md-6">
										<div className="form-group" style={{ marginBottom: '1.5rem' }}>
											<label style={{ 
												fontWeight: '500', 
												color: '#2c3e50', 
												marginBottom: '0.5rem',
												display: 'block'
											}}>
												Product Images
											</label>
											<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
												<input 
													type="file" 
													multiple 
													onChange={onFiles} 
													className="form-control-file" 
													accept="image/*" 
													style={{
														flex: 1,
														border: '1px solid #e1e5e9',
														borderRadius: '8px',
														padding: '0.5rem',
														fontSize: '0.9rem'
													}}
												/>
												<button 
													type="button" 
													className="btn btn-outline-secondary"
													style={{
														borderRadius: '8px',
														padding: '0.5rem 1rem',
														fontSize: '0.9rem',
														border: '1px solid #e1e5e9'
													}}
													onClick={() => document.querySelector('input[type="file"]').click()}
												>
													Browse
												</button>
											</div>
											<small style={{ 
												color: '#6c757d', 
												fontSize: '0.85rem',
												marginTop: '0.25rem',
												display: 'block'
											}}>
												Upload new images to replace existing ones
											</small>
											
											{existingImages.length > 0 && (
												<div style={{ marginTop: '1rem' }}>
													<small style={{ 
														color: '#6c757d', 
														fontWeight: '500',
														display: 'block',
														marginBottom: '0.5rem'
													}}>
														Current Images:
													</small>
													<div style={{ 
														display: 'flex', 
														flexWrap: 'wrap', 
														gap: '0.5rem' 
													}}>
														{existingImages.map((img, index) => (
															<img 
																key={index} 
																src={img.image} 
																alt={`Product ${index}`} 
																style={{
																	width: '80px', 
																	height: '80px', 
																	objectFit: 'cover',
																	borderRadius: '8px',
																	border: '2px solid #e1e5e9'
																}} 
															/>
														))}
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
								
								<div className="form-group text-center" style={{ marginTop: '2rem' }}>
									<button 
										className="btn btn-primary btn-lg px-5" 
										type="submit" 
										disabled={loading}
										style={{
											backgroundColor: '#ff6b35',
											border: 'none',
											borderRadius: '8px',
											padding: '0.75rem 2rem',
											fontSize: '1.1rem',
											fontWeight: '500',
											width: '100%',
											transition: 'all 0.3s ease'
										}}
										onMouseOver={(e) => e.target.style.backgroundColor = '#e55a2b'}
										onMouseOut={(e) => e.target.style.backgroundColor = '#ff6b35'}
									>
										{loading ? 'Saving...' : 'Save Changes'}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}


