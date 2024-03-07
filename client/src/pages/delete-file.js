import React from "react";

const DeleteFile = () => {

    async function handleSubmit(event) {
        event.preventDefault();
        let bucket = "test-resources";
        try {
            let res = await fetch(`http://localhost:8000/delete-file?name=${event.target[0].value}&bucket=${bucket}`);
            res = await res.json();
            if (res.status == 404) alert("File not found");
            else if (res.status == 200) alert("File deleted");
            else throw res;
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>File Delete Test</h1>
                <input type="text" placeholder="Enter file name to delete"/>
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default DeleteFile;