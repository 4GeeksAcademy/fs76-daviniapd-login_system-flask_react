import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	function handleLogout(){
		actions.logout()
		navigate('/login')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
				<Link to="/signup"> 
						<button className="btn btn-primary me-3">Signup</button>
					</Link>
					<Link to="/login"> 
						<button className="btn btn-primary me-3">Login</button>
					</Link>
					{store.auth === true ? <button className="btn btn-primary" onClick={()=>handleLogout()}>Logout</button> : ''} 
				</div>

			</div>
		</nav>
	);
};
