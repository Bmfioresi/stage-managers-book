import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/pages.css';
import '../css/hub-pages.css';

const baseUrl = "https://localhost:8000"

const NoAccess = () => {
    return (
        <div className="bucket">
            <div className="overview" style={{height: "8%", top: "40%", width: "76%", right: "12%"}}>
                <h1 style={{width: "90%", alignSelf: "center", color: "black"}}>YOU DO NOT HAVE ACCESS TO THIS PAGE</h1>
            </div>            
        </div>
    )
}

export default NoAccess;