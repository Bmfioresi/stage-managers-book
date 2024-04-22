import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios, { formToJSON } from 'axios';
import "../../css/sign-up-frame.css";
import "../../css/global.css";
// import { Tooltip as ReactTooltip } from 'react-tooltip'; // couldn't get this to work 
import { toast } from 'react-toastify'; 
import LineFrame from "./sign-up-form-frame";
import validator from 'validator';

const SignUpFrame = () => {
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    let sanitizedValue = value;

    // general escape to prevent any HTML/JS code from being executed
    sanitizedValue = validator.escape(sanitizedValue);

    switch (name) {
      case 'email':
        sanitizedValue = validator.normalizeEmail(sanitizedValue, { gmail_remove_subaddress:true, outlookdotcom_remove_subaddress:true,
          yahoo_remove_subaddress: true, icloud_remove_subaddress: true }) ? sanitizedValue : '';
        // Remove any characters that are not typical in email addresses as a user types
        sanitizedValue = sanitizedValue.replace(/[^a-zA-Z0-9@.-]/g, '');
        break;
      case 'fullName':
        sanitizedValue = sanitizedValue.replace(/[\{\}\[\]\$]/g, '');
        break;
      default:
        break;
    }

    if (sanitizedValue) {
      setFormData(prevState => ({ ...prevState, [name]: sanitizedValue }));
    } else { // handle the error
      setFormData(prevState => ({ ...prevState, [name]: '' }));
    }
};

function isValidEmail(email) { // Function to check if the email is valid
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) { // Function to check if the password is valid
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
}

function containsPersonalInfo(password, email, fullName) {
  const emailParts = email.split('@')[0];
  const nameParts = fullName.toLowerCase().split(' ');
  return nameParts.some(part => password.toLowerCase().includes(part)) || password.toLowerCase().includes(emailParts.toLowerCase());
}
  
async function handleLoginSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  if (!formData.fullName || !formData.email || !formData.password || !formData.verifyPassword) { // If any of the fields are empty
    toast.error('Please fill in all fields.');
    return; // stop submission
  }

  if (!isValidEmail(formData.email)) { // If the email is not valid
    toast.error('Please enter a valid email.');
    return; // stop submission
  }

  if (!isValidPassword(formData.password)) { // If the password is not valid
    toast.error('Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.');
    return; // stop submission
  }

  if (formData.password !== formData.verifyPassword) { // If the passwords do not match
    toast.error('Passwords do not match. Please try again.');
    return; // stop submission
  }

  if (containsPersonalInfo(formData.password, formData.email, formData.fullName)) {
    toast.error('Password should not contain your email or parts of your full name.');
    return; // stop submission 
  }

  const url = 'http://localhost:8000/register'; // URL for registration

  await axios.post(url, JSON.stringify(formData)).then((response) => {

    if (response.status === 201) { // If the status is 201 (Created)
      toast.success('Successfully registered');
      navigate('/signin');
    } else { 
      toast.error(response.data.message);
    }
  });
};

  return (
    <div className="left-side-column">
      <div className="left-side-column-child" />
      <div className="welcome-back-container">
        <div className="welcome-back">
          <span>
            <span>Welcome Back</span>
            <span className="span">{` `}</span>
          </span>
        </div>
        <form className="input-label" onSubmit={(event) => handleLoginSubmit(event)} method="POST">
          <div className="today-is-a-container">
            <span>
              <p className="today-is-a">{`Today marks a new beginning. It’s your stage. You
                set the scene. Sign up to start crafting the theatrical experience.`}</p>
            </span>
          </div>
          <div className="button-instance">
          <LineFrame
            label1="Full Name"
            placeholderPlaceholder1="John Smith"
            propWidth1="370px"
            inputType="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleLoginChange}
          />
          <LineFrame
            label1="Email"
            placeholderPlaceholder1="JohnSmith@example.com"
            propWidth1="370px"
            inputType="email"
            name="email"
            value={formData.email}
            onChange={handleLoginChange}
          />
          <LineFrame
            label1="Password"
            placeholderPlaceholder1="at least 8 characters"
            propWidth1="370px"
            inputType="password"
            name="password"
            value={formData.password}
            onChange={handleLoginChange} // Pass the handler
            type = "password" // to hide the password
            // tooltipText="Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            criteria={`Password must contain:
            - at least 8 characters
            - one uppercase letter
            - one lowercase letter
            - one number
            - one special character`}
          />
          <LineFrame
            label1="Verify Password"
            placeholderPlaceholder1="Re-enter password"
            propWidth1="370px"
            inputType="password"
            name="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleLoginChange} // Pass the handler
            type = "password" // to hide the password
          />
          </div>
          <button className="main-button1" type="submit">
            <div className="sign-in1">Sign up</div>
          </button>
        </form>
      </div>
      <img
        className="smb-logo-icon"
        loading="eager"
        alt=""
        src="/smb-logo.png"
      />
    </div>
  );
};

export default SignUpFrame;