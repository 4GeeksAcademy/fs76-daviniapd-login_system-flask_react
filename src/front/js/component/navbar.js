import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const [loggingOut, setLoggingOut] = useState(false);

	function handleLogout() {
		setLoggingOut(true);
		actions.logout();
		navigate("/logout", { state: { from: true } });
		
	}

	return (
		<nav className="navbar navbar-light">
			<div className="container" >
				<Link to="/" style={{ textDecoration: "none" }} >
					<h1 className="codegram-logo py-3 m-0"><i className="fa-solid fa-share-nodes me-1 fs-4"></i>codegram<i className="fa-solid fa-share-nodes ms-1 fs-4" id="iconReverse"></i></h1>
				</Link>
				<div className="ml-auto">
					{store.auth === true ? (
						<button
							className="enter btn btn-warning my-auto text-light"
							onClick={() => handleLogout()}
						>
							Logout
						</button>
					) : (
						''
					)}
				</div>
			</div>
		</nav>
	);
};
{/* <Link to="/signup"> 
						<button className="btn btn-primary me-3">Signup</button>
					</Link>
					<Link to="/login"> 
						<button className="btn btn-primary me-3">Login</button>
					</Link> */}