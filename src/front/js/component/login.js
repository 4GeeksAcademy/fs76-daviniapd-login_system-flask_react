import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);

    function sendData(e) {
        e.preventDefault();
        if (!identifier || !password) {
            setMessage("Please, complete all fields.");
            return;
        }
        if (password.length < 8) {
            setMessage("The password must be at least 8 characters.");
            return;
        }

        actions.login(identifier, password);
    }

    return (
        <>
            {store.auth === true ? <Navigate to="/private" /> :
                <form className="container h-100 d-flex justify-content-center align-items-center my-5" onSubmit={sendData}>
                    <div className="card" id="cardLogin">
                        <h1 className="login">Login</h1>
                        {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}                        
                        <i type="button" className="btn-close float-end" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                        </div>}
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