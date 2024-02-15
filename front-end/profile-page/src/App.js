import React, { useState } from 'react';
import './App.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    contact_info: '',
    pronouns: '',
    emergency_contact: '',
    roles: '',
    resume: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to handle form submission (e.g., save data to MongoDB)
    console.log(formData); // For demonstration purposes
  };

  return (
    <div class="container">
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={"First Last"} onChange={handleChange} /><br />

        <label htmlFor="bio">Bio:</label>
        <textarea id="bio" name="bio" rows="4" cols="50" value={"I am very creative"} onChange={handleChange}></textarea><br />

        <label htmlFor="contact_info">Contact Info:</label>
        <input type="text" id="contact_info" name="contact_info" value={"123-456-7890"} onChange={handleChange} /><br />

        <label htmlFor="pronouns">Pronouns:</label>
        <input type="text" id="pronouns" name="pronouns" value={"any/all"} onChange={handleChange} /><br />

        <label htmlFor="emergency_contact">Emergency Contact:</label>
        <input type="text" id="emergency_contact" name="emergency_contact" value={"911"} onChange={handleChange} /><br />

        <label htmlFor="roles">Roles:</label>
        <input type="text" id="roles" name="roles" value={"Actor"} onChange={handleChange} /><br />

        <label htmlFor="resume">Resume:</label>
        <input type="text" id="resume" name="resume" value={"resume.com/myresume"} onChange={handleChange} /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfilePage;
