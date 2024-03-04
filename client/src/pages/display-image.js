import React, { useState } from "react";

const DisplayImage = () => {
    const [url, setUrl] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();
        getImage(event.target[0].value).then(setUrl);
    }

    async function getImage(name) {
        let blob;
        try {
            let res = await fetch(`http://localhost:8000/display-image?name=${name}`);
            blob = await res.blob();
            return URL.createObjectURL(blob);
        } catch (err) {
            console.log(err);
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Image display test</h1>
                <input type="text" placeholder="Enter file name to display"/>
                <button type="submit">Search</button>
            </form>
            <br></br>
            <img src={url} alt="&nbsp;Not found"/>
        </div>
    );
};

export default DisplayImage;