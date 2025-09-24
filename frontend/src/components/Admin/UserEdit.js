import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserEdit(){
	const navigate = useNavigate();
	const { id } = useParams();
	const [form, setForm] = useState({ name:'', email:'', role:'' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(()=>{
		(async()=>{
			try{
				setLoading(true);
				const token = localStorage.getItem('token');
				const config = {
					headers: {
						'Authorization': token ? `Bearer ${token}` : ''
					}
				};
				const { data } = await axios.get(`/api/v1/admin/user/${id}`, config);
				const u = data.user;
				setForm({
					name: u.name || '',
					email: u.email || '',
					role: u.role || ''
				});
			}catch(err){
				setError(err.response?.data?.message || err.message);
			}finally{
				setLoading(false);
			}
		})();
	},[id])

	const onChange = (e) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		try{
			setLoading(true); setError(null);
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Content-Type':'application/json',
					'Authorization': token ? `Bearer ${token}` : ''
				}
			};
			await axios.put(`/api/v1/admin/user/${id}`, form, config);
			navigate('/admin/users');
		}catch(err){
			setError(err.response?.data?.message || err.message);
		}finally{
			setLoading(false);
		}
	}

	return (
		<div className="container">
			<h2 className="my-3">Edit User</h2>
			{error && <div className="alert alert-danger" role="alert">{String(error)}</div>}
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Name</label>
					<input name="name" value={form.name} onChange={onChange} className="form-control" required />
				</div>
				<div className="form-group">
					<label>Email</label>
					<input type="email" name="email" value={form.email} onChange={onChange} className="form-control" required />
				</div>
				<div className="form-group">
					<label>Role</label>
					<select name="role" value={form.role} onChange={onChange} className="form-control" required>
						<option value="user">User</option>
						<option value="admin">Admin</option>
					</select>
				</div>
				<button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
			</form>
		</div>
	)
}