const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			signup: async (username, email, password) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							username: username,
							email: email,
							password: password
						})
					});
					console.log(resp)
					const data = await resp.json();

					// Verifica si la creación del usuario fue exitosa
					if (data.success) {
						// Agrega el nuevo usuario al store
						const store = getStore();
						const newUser = { username, email }; // Puedes agregar más campos si es necesario
						setStore({
							message: data.message,
							users: [...store.users, newUser] // Agrega el nuevo usuario al array
						});
					} else {
						setStore({ message: data.message });
					}

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);

				}
			},

			login: (identifier, password) => {
				console.log("Login desde flux")
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					},
					body: JSON.stringify({
						"identifier": identifier,
						"password": password
					})
				};
				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						if (response.status === 200){
							setStore({ auth: true })
					}
						return response.json()
				})
				  .then(data => {
						console.log(data)
						localStorage.setItem("token", data.access_token);
					})
				.catch(error => {
					console.error('Error:', error);
				});
		},

		logout: () => {
			console.log("Logout desde flux")
			localStorage.removeItem("token");
			setStore({auth: false})
		},

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
