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
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to="/hubs">Hubs</NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default NavBar;