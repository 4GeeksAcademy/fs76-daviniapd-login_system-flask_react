import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(null);
    const formRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false); 

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
        setTimeout(() => {
            if (!store.auth) {
                setMessage("User or password is wrong");
            }
        }, 2000); 
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendData(e); 
        }
    };

    return (
        <>
            {store.auth === true ? <Navigate to="/private" /> :
                <form className="container h-100 d-flex justify-content-center align-items-center my-5" onSubmit={sendData} ref={formRef} onKeyDown={handleKeyDown}>
                    <div className="card" id="cardLogin">
                        <h1 className="login">Login</h1>
                        {message && <div className="alert alert-warning d-flex align-items-center mx-2"><i className="fa-solid fa-triangle-exclamation me-2" />{message}
                            <i type="button" className="btn-close float-end ms-1" style={{fontSize: "10px"}} data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlert(null)}></i>
                        </div>}
                        <div className="inputBox1">
                            <input value={identifier} 
                            onChange={(e) => setIdentifier(e.target.value)} 
                            type="text" 
                            required="required" />
                            <span className="user">Username or Email</span>
                        </div>

                        <div className="inputBox">
                            <input 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type={showPassword ? "text" : "password"} 
                                required="required" 
                            />
                            <span>Password</span>
                            <i 
                                className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                                onClick={() => setShowPassword(!showPassword)} 
                                style={{ cursor: "pointer", position: "absolute", right: "10px", top: "35px" }} 
                            ></i>
                        </div>


                        <button type="submit" className="enter" style={{ marginBottom: '5px' }}>Enter</button>
                        <p>Is this your first time here? <Link to="/signup">Sign up</Link></p>

                    </div>
                </form>
            }
        </>
    );
};