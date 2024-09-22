const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			users: [],
			posts: [
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
			]
		
		},
		actions: {

			signup: (email, username, password) => {
				console.log("Signup desde flux")
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body: JSON.stringify({
						"email": email,
						"username": username,
						"password": password
					})
				};
				fetch(process.env.BACKEND_URL + "/api/signup", requestOptions)
					.then(response => {
						if (response.status === 200) {
							const store = getStore();
							const newUser = { username, email };
							setStore({
								users: [...store.users, newUser],
							});
						}
						return response.json()
					})
					.then(data => {
						console.log(data)
						localStorage.setItem("token", data.access_token);
						setStore({ auth: true, message: null });
					})
					.catch(error => {
						console.error('Error:', error);
					});
			},

			login: (identifier, password) => {
				console.log("Login desde flux");
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=UTF-8' },
					body: JSON.stringify({ "identifier": identifier, "password": password })
				};
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						if (response.status === 200) {
							setStore({ auth: true });
							return response.json();
						} else {
								console.log("User or password is wrong")
							
						}
					})
					.then(data => {
						if (data.access_token) {
							localStorage.setItem("token", data.access_token);
							console.log("User created successfully", "token", data.access_token);
						}
					})
					.catch(error => {
						console.error('Error:', error);
					});
			},

			logout: () => {
				console.log("Logout desde flux")
				localStorage.removeItem("token");
				setStore({ auth: false })
			},

			checkUserExists: (username, email) => {
				return fetch(process.env.BACKEND_URL + "/api/checkUser", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body: JSON.stringify({ username, email })
				})
				.then(response => response.json())
				.then(data => data.exists);
			}
		}
	};
};

export default getState;
