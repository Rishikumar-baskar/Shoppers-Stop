import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
			navigate('/admin/products');
		}catch(err){
			setError(err.response?.data?.message || err.message);
		}finally{
			setLoading(false);
		}
	}

	return (
		<div className="container">
			<h2 className="my-3">Edit Product</h2>
			{error && <div className="alert alert-danger" role="alert">{String(error)}</div>}
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input name="name" value={form.name} onChange={onChange} className="form-control" required />
				</div>
				<div className="form-group">
					<label>Price</label>
					<input type="number" name="price" value={form.price} onChange={onChange} className="form-control" min="0" step="0.01" required />
				</div>
				<div className="form-group">
					<label>Description</label>
					<textarea name="description" value={form.description} onChange={onChange} className="form-control" required />
				</div>
				<div className="form-group">
					<label>Category</label>
					<select name="category" value={form.category} onChange={onChange} className="form-control" required>
						<option value="">Select</option>
						{categories.map(c => <option key={c} value={c}>{c}</option>)}
					</select>
				</div>
				<div className="form-group">
					<label>Seller</label>
					<input name="seller" value={form.seller} onChange={onChange} className="form-control" required />
				</div>
				<div className="form-group">
					<label>Stock</label>
					<input type="number" name="stock" value={form.stock} onChange={onChange} className="form-control" min="0" required />
				</div>
				<div className="form-group">
					<label>Images</label>
					<input type="file" multiple onChange={onFiles} className="form-control-file" />
					{existingImages.length > 0 && (
						<div className="mt-2">
							<small className="text-muted">Current Images:</small>
							<div className="d-flex flex-wrap">
								{existingImages.map((img, index) => (
									<img key={index} src={img.image} alt={`Product ${index}`} style={{width: '100px', height: '100px', objectFit: 'cover', margin: '5px'}} />
								))}
							</div>
						</div>
					)}
				</div>
				<button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
			</form>
		</div>
	)
}


