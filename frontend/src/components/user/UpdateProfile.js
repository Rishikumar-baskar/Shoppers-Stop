import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearAuthError } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {

    const { loading, error, user, isUpdated } = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(file);
                }
            }
            reader.readAsDataURL(file);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!name.trim() || !email.trim()) {
            toast.error('Name and email are required');
            return;
        }
        
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('email', email.trim());
        if (avatar) {
            formData.append('avatar', avatar);
        }
        
        console.log('Submitting form data:', { name, email, avatar: avatar ? avatar.name : 'No avatar' });
        
        // Dispatch the update action
        dispatch(updateProfile(formData));
    }

    useEffect(() => {
        console.log('UpdateProfile useEffect - user:', user, 'error:', error, 'isUpdated:', isUpdated);
        
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if (user.avatar) {
                setAvatarPreview(user.avatar)
            }
        }
        
        if (error) {
            console.log("Profile update error:", error);
            toast.error(error, {
                position: "bottom-center",
                autoClose: 5000,
                onOpen: () => { dispatch(clearAuthError()) }
            });
        }

        if (isUpdated) {
               toast.success("Profile updated successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "colored"
        });
            // Navigate to profile page after successful update
            navigate('/myprofile');
            dispatch(UPDATE_PROFILE_RESET());
            
        }

    },[user, error, isUpdated, navigate])

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-6">
                    <div className="card shadow border-0 update-profile-card">
                        <div className="card-body p-4">
                            <h1 className="text-center mb-4 fw-bold text-dark">Update Profile</h1>

                            <form onSubmit={submitHandler} encType='multipart/form-data'>
                                <div className="form-group mb-3">
                                    <label htmlFor="name_field" className="form-label fw-semibold text-dark mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control border-2"
                                        name='name'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="email_field" className="form-label fw-semibold text-dark mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control border-2"
                                        name='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>

                                 <div className='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img
                                    src={avatarPreview}
                                    className='rounded-circle'
                                    alt='Avatar Preview'
                                />
                            </figure>
                        </div>
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChangeAvatar}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                        </label>
                        </div>
                    </div>
                </div>

                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100 fw-semibold"
                                    disabled={loading}
                                    style={{
                                        backgroundColor: '#fa9c23',
                                        borderColor: '#fa9c23',
                                        padding: '10px 20px',
                                        borderRadius: '8px'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        'Update'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}