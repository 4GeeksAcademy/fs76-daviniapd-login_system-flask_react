const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			users: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },

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

			checkUserExists: async (username, email) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/checkUser", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body: JSON.stringify({ username, email })
				});
				const data = await response.json();
				return data.exists; // Suponiendo que la respuesta tiene un campo 'exists'
			}

			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
