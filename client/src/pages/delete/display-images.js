import React, {useState, useEffect} from "react";

const DisplayImages = () => {
    const [images, setImages] = useState("");

    async function getImages() {
        let filenames = await fetch("http://localhost:8000/get-filenames?bucket=images");
        filenames = await filenames.json();
        let images = [];

        // TODO - add a spinner while it is loading

        for (let i = 0; i < filenames.length; i++) {
            // console.log(filenames[i]);
            let res = await fetch(`http://localhost:8000/display-image?name=${filenames[i]}`);
            let blob = await res.blob();
            let url = URL.createObjectURL(blob);
            images.push(<img src={url} length="100" width="100" alt={filenames[i]} key={i}/>);
        }
        await setImages(images);
    }

    useEffect(() => {
        getImages();
    }, [] );

    return (
        <div>
            <div>{images}</div>
        </div>
    );
};

export default DisplayImages;