// following this tutorial: https://www.geeksforgeeks.org/how-to-create-a-multi-page-website-using-react-js/

import React from "react";
import { Nav, NavLink, NavMenu } from "./elements";

const NavBar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/test">Test</NavLink>
                    <NavLink to="/upload-image">Upload Image</NavLink>
                    <NavLink to="/display-image">Display Image</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/createProfile">Create Profile</NavLink>
                    <NavLink to="/hubs">Hubs</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/signin">Hannah's Links</NavLink>
                    {/* <NavLink to="/signup">Sign Up</NavLink>
                    <NavLink to="/forgotpassword">Forgot Password</NavLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;