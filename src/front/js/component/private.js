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

	const posts = [
		{
			profileImage: "https://i.pinimg.com/originals/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.png",
			title: "Game of Thrones",
			image: "https://img.freepik.com/premium-photo/set-futuristic-gaming-chairs-16-bit-pixel-with-led-lights-sl-game-asset-design-concept-art_655090-1872057.jpg",
			altText: "Gamer chair collage",
			likedBy: ["corsair", "razer", "ikea", "50,000 others"],
			content: "Once you start coding, you won't be able to stop. So I'm going to give you some advice: Choose a good throne",
			hashtag: "#forthefuture #gameofthrones"
		},
		{
			profileImage: "https://i.pinimg.com/originals/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.png",
			title: "You are not alone",
			image: "https://static.vecteezy.com/system/resources/previews/034/545/064/non_2x/concept-of-cyber-crime-or-cyber-attack-graphic-of-skull-with-programming-script-background-vector.jpg",
			altText: "A skull on a computer screen",
			likedBy: ["4geeksacademy", "mentalhealthfoundation", "80,000 others"],
			content: "It is normal to feel frustrated while coding. Don't give up",
			hashtag: "#youarenotalone"
		},
		{
			profileImage: "https://i.pinimg.com/originals/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.png",
			title: "Coding like a woman",
			image: "https://imgcdn.stablediffusionweb.com/2024/5/17/e7fac0a3-bee9-4e6f-b45e-5626875e53cf.jpg",
			altText: "A woman using a computer",
			likedBy: ["68.322 likes"],
			content: "\"For most a history, Anonymous was a woman\"", 
			hashtag: "#VirginiaWoolf #womencoding"
		}
	];

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
