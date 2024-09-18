import React from "react";
import { Link } from "react-router-dom";

export const Signup = () => {
    return (
        <div className="container h-100 d-flex justify-content-center align-items-center mb-5">
            <div className="card" id="cardSignup">
                <a className="singup">Sign Up</a>
                <div className="inputBox1">
                    <input type="text" required="required"/>
                        <span className="user">Email</span>
                </div>

                <div className="inputBox">
                    <input type="text" required="required"/>
                        <span>Username</span>
                </div>

                <div className="inputBox">
                    <input type="password" required="required"/>
                        <span>Password</span>
                </div>

                <button className="enter">Enter</button>

            </div>
        </div>
    );
};