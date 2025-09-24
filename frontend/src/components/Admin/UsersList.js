import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UsersList(){
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [users, setUsers] = useState([]);

	const handleDelete = async (uid) => {
		try{
			const token = localStorage.getItem('token');
			const config = {
				headers: {
					'Authorization': token ? `Bearer ${token}` : ''
				}
			};
			await axios.delete(`/api/v1/admin/user/${uid}`, config);
			setUsers(prev => prev.filter(u => u._id !== uid));
			toast.success('User deleted successfully!', {
				position: "bottom-center"
			});
		}catch(err){
			setError(err.response?.data?.message || err.message);
		}
	}

	useEffect(()=>{
		(async () => {
			try{
				setLoading(true);
				const token = localStorage.getItem('token');
				const config = {
					headers: {
						'Authorization': token ? `Bearer ${token}` : ''
					}
				};
				const { data } = await axios.get('/api/v1/admin/users', config);
				setUsers(data.users || []);
			} catch(err){
				setError(err.response?.data?.message || err.message);
			} finally{
				setLoading(false);
			}
		})();
	},[])

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 mb-3 d-flex align-items-center justify-content-between">
					<h2>Users</h2>
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
										<th>Name</th>
										<th>Email</th>
										<th>Role</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{Array.isArray(users) && users.length > 0 ? users.map(u => (
											<tr key={u._id}>
												<td>{u._id}</td>
												<td>{u.name}</td>
												<td>{u.email}</td>
												<td>{u.role}</td>
												<td>
													<Link className="btn btn-primary" to={`/admin/user/${u._id}`}><i className="fa fa-pencil"></i></Link>
													<button className="btn btn-danger ml-2" onClick={()=>handleDelete(u._id)}><i className="fa fa-trash"></i></button>
												</td>
											</tr>
										)) : (
										<tr>
											<td colSpan="5" className="text-center">No users</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
