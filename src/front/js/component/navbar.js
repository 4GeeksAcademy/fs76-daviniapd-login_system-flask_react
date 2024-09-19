import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handleLogout(){
		actions.logout()
		navigate('/')
	}

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/" style={{textDecoration: "none"}} >
					<h1 className="codegram-logo py-3 m-0">codegram</h1>
				</Link>
				<div className="ml-auto">
				{/* <Link to="/signup"> 
						<button className="btn btn-primary me-3">Signup</button>
					</Link>
					<Link to="/login"> 
						<button className="btn btn-primary me-3">Login</button>
					</Link> */}
					{store.auth === true ? <button className="btn btn-warning" onClick={()=>handleLogout()}>Logout</button> : ''} 
				</div>

			</div>
		</nav>
	);
};
