import React, { useContext } from "react";
import { ProfileTab } from "./profileTab";
import { HomeTab } from "./homeTab";
import { Navigate } from "react-router-dom";

import { Context } from "../store/appContext";


export const Private = () => {
	const { store, actions } = useContext(Context);

	const isAuthenticated = store.auth;

	if (!isAuthenticated) {
		return <Navigate to="/" />;
	}

	const posts = store.posts;

	return (
		<>
			<nav className="nav-tab">
				<ul className="nav nav-tabs mt-3 justify-content-center border-0" id="myTab" role="tablist">
					<li className="nav-item" role="presentation">
						<button className="nav-link active border-0" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">
							<i className="fa-solid fa-table-cells"></i>
						</button>
					</li>
					<li className="nav-item" role="presentation">
						<button className="nav-link border-0" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
							<i className="fa-solid fa-square"></i>
						</button>
					</li>
				</ul>
				<div className="tab-content" id="myTabContent">
					<HomeTab />
					<div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
						{posts.map((post, index) => (
							<ProfileTab key={index} post={post} index={index} />
						))}
					</div>
				</div>
			</nav>
		</>
	);
};
