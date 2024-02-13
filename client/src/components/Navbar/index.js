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
                    <NavLink to="/search">Search</NavLink>
                    <NavLink to="/upload">Upload</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/desktop-signin">Sign In</NavLink>
                    <NavLink to="/desktop-forgot-password">Forgot Password</NavLink>
                    <NavLink to="/desktop-signup">Sign Up</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/hubs">Hubs</NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;