import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['Electronics','Mobile Phones','Laptops','Accessories','Headphones','Food','Books','Clothes/shoes','Beauty/health','Sports','Outdoor','Home'];

export default function ProductCreate(){
	const navigate = useNavigate();
	const [form, setForm] = useState({ name:'', price:0, description:'', category:'', seller:'', stock:0 });
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const onChange = (e) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	}

	const onFiles = (e) => {
		setImages(Array.from(e.target.files || []));
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try{
			setLoading(true); setError(null);
			const data = new FormData();
			Object.entries(form).forEach(([k,v]) => data.append(k, v));
			images.forEach(img => data.append('images', img));
			await axios.post('/api/v1/admin/product/new', data, { headers: { 'Content-Type':'multipart/form-data' }});
			navigate('/admin/products');
		}catch(err){
			setError(err.response?.data?.message || err.message);
		}finally{
			setLoading(false);
		}
	}

	return (
		<div className="container">
			<h2 className="my-3">Create Product</h2>
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
				</div>
				<button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
			</form>
		</div>
	)
}
