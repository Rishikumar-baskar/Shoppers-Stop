import { useEffect, useState } from "react";
import { updatePassword as updatePasswordAction, clearAuthError } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function UpdatePassword(){

const [password, setPassword] = useState("");
const [oldPassword, setOldPassword] = useState("");
const dispatch = useDispatch();
const {isUpdated,error} = useSelector(state => state.authState)

const submitHandler = (e) => {
    e.preventDefault();
    console.log('UpdatePassword - submitHandler - oldPassword:', oldPassword);
    console.log('UpdatePassword - submitHandler - password:', password);
    
    const formData = {
        oldPassword: oldPassword,
        password: password
    };
    console.log('UpdatePassword - submitHandler - formData:', formData);
    
    dispatch(updatePasswordAction(formData))

}

useEffect(() => {
    console.log('UpdatePassword - useEffect - isUpdated:', isUpdated);
    console.log('UpdatePassword - useEffect - error:', error);
    
    if(isUpdated){
        console.log('UpdatePassword - Showing success toast');
        toast.success('Password updated Successfully',{
            position:"top-center",
            autoClose:"10000",
            type:"success",
        });
        setOldPassword("")
        setPassword("")
    }
    if(error){
        console.log('UpdatePassword - Showing error toast:', error);
        toast.error(error,{
            position:"bottom-center",
            type:"error",
            onOpen: () => { dispatch(clearAuthError()) }
        })
    }
},[isUpdated,error,dispatch])

    return(
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mt-2 mb-5">Update Password</h1>
                    <div className="form-group">
                        <label htmlFor="old_password_field">Old Password</label>
                        <input
                            type="password"
                            id="old_password_field"
                            className="form-control"
                            value={oldPassword}
                            onChange={e=>setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="new_password_field">New Password</label>
                        <input
                            type="password"
                            id="new_password_field"
                            className="form-control"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                </form>
            </div>
        </div>
    )
}