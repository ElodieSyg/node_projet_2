import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = props => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="container">
            <Link to="/">
                <img className="item" onClick={handleOpen} src="./menu.png" alt="home icon" width="50px" height="50px" />
            </Link>
        </div>
    );
};

export default Navbar;