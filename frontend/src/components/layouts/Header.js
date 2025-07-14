import Search from "./Search";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import test from '../../../public/images/logo.svg'
export default function Header() {
  const navigate = useNavigate()
  return (

    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/">
            <img width="100px" height={100} src="/images/logo.svg" />
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>



      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        {/* <Link to="/login" className="btn" id="login_btn">Login</Link> */}
        <div className="btn" id="login_btn"onClick={()=>{
          console.info('calling login')
          navigate('/login')}}>Login</div>

        <span id="cart" className="ml-3">Cart</span>
        <span className="ml-1" id="cart_count">2</span>
      </div>
    </nav>

  )
}