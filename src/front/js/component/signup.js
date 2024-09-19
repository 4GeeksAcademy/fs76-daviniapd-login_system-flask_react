import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); 

    const handleSignup = async () => {
        const result = await actions.signup(username, email, password);
        
        // if (result.ok) {
        //     setMessage("User created successfully!"); 
        // } else {
        //     setMessage("Error creating user: " + result.error); 
        // }
    };

    return (
        <div className="container h-100 d-flex justify-content-center align-items-center my-5">
            <div className="card" id="cardSignup">
                <a className="singup">Sign Up</a>
                {message && <div className="alert">{message}</div>} 
                <div className="inputBox1">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <span className="user">Email</span>
                </div>

                <div className="inputBox">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <span>Username</span>
                </div>

                <div className="inputBox">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span>Password</span>
                </div>

                <button className="enter" onClick={handleSignup}>Enter</button>
            </div>
        </div>
    );
};