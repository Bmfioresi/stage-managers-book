import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const Logout = () => {

    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/test")
        .then((res) => res.json())
        .then((data) => setMessage(data.message));
    }, []);

    // TODO: Notify user that they have been logged out
    localStorage.setItem("sessionID", "-1");
    return <Navigate to='/' />;
};

export default Logout;