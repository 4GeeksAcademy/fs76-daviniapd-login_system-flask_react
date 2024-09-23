import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

import "../../styles/loading.css";

export const NotFound = () => {
    const [timeoutExpired, setTimeoutExpired] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setTimeoutExpired(true);
      }, 3000);
  
      return () => clearTimeout(timeoutId);
    }, [location]);
  
    if (timeoutExpired) {
      return <Navigate to="/" />;
    }
  
    return (
      <div className="container text-center">
        <div className="row align-items-start mt-5">
          <div className="col">
  
          </div>
          <div className="col-10">
            <h2 className="display-6">Not Found!</h2>
            <h5>Redirecting...</h5>
            <br></br>
            <div className="loader mx-auto "></div>
          </div>
          <div className="col">
  
          </div>
        </div>
      </div>
    );
  };