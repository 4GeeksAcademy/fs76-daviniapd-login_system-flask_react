import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const { store, actions } = useContext(Context);

    function sendData(e) {
        e.preventDefault()
        actions.login(identifier, password)
    }

    return (
        <>
            {store.auth === true ? <Navigate to="/private" /> :
                <form className="container h-100 d-flex justify-content-center align-items-center my-5" onSubmit={sendData}>
                    <div className="card" id="cardLogin">
                        <a className="login">Login</a>
                        <div className="inputBox1">
                            <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} type="text" required="required" />
                            <span className="user">Username or Email</span>
                        </div>

                        <div className="inputBox">
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required="required" />
                            <span>Password</span>
                        </div>

                        <button type="submit" className="enter">Enter</button>

                    </div>
                </form>
            }
        </>
    );
};