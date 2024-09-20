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
