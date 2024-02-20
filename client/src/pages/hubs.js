import React, { useState, useEffect } from "react";
import axios from 'axios';

function Hub() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    owner: ""
  });

  const [name, setName] = useState("Unchanged");
  const [description, setDescription] = useState("Unchanged");
  const [owner, setOwner] = useState("Unchanged");
  const [hids, setHids] = useState([]);

  useEffect(() => {
    // Fetch data from the database
    fetchData();
  }, []); // Empty dependency array to fetch data only once when component mounts

  // Function to fetch data from the database
  const fetchData = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/authenticate';
    const uid = "03";

    axios.post(url, formData).then((response) => {
        console.log("RESPONSE")


        console.log("LOCAL STORAGE")
        // console.log(JSON.parse(localStorage.getItem("uid")))
    });

    console.log("SUBMIT")
}

  return (
    <div>
      <h1>Hubs</h1>
      <form>
        <label htmlFor="fname">Join new hub: </label>
        <input type="text" id="code" name="code" placeholder="Enter access code"></input><br></br>
      </form>
    </div>
  );
}

export default Hub;