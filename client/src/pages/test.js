import React, { useState, useEffect } from "react";

const Test = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
      fetch("http://localhost:8000/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default Test;