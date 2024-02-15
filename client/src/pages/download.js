import React, { useState, useEffect } from "react";
import parse from 'html-react-parser';

const Download = () => {
    const [image, setImage] = useState("");

    async function getDownload() {
        let res = await fetch("http://localhost:8000/download");
        let json = await res.json();
        console.log(json);
        return json.tag;
    }

    useEffect(() => {
        getDownload().then(setImage);
    }, []);

    return (
        <div>
            <h1>Test download</h1>
            {parse(image)}
        </div>
    );
};

export default Download;