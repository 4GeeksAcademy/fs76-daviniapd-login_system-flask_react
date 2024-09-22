import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="full-screen-bg" id="home">

		<div className="d-flex justify-content-center align-items-center h-50 flex-column">
		<h1 className="text-center" id="titleHome">WELCOME DEAR MUGGLE</h1>
			<div className="mt-4">
			  <Link to="/signup">
				<span className="btn btn-lg me-4" id="button-signup" role="button">
				  signup
				</span>
			  </Link>
			  <Link to="/login">
				<span className="btn btn btn-lg ms-4" id="button-login" role="button">
				  login
				</span>
			  </Link>
			</div>
		  </div>
		</div>
	);
};
