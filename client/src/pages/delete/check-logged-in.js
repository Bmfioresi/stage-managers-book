import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const baseUrl = 'https://localhost:8000';

const checkLoggedIn = async function() {
    let url = `${baseUrl}/check-logged-in`;
    console.log(localStorage.getItem("sessionID"));
    await axios.post(url, JSON.stringify(localStorage.getItem("sessionID"))).then((response) => {
        console.log(response);
        if (response.data[0].uid === "-1") {
            console.log("false");
            return false;
        }
        else {
            console.log("true");
            return true;
        }
    });
    return false;
}

export default checkLoggedIn;