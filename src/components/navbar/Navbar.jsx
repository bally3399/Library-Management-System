import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunae IT Library Management System</h1>
            <div className={styles.navLinks}>
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
            </div>
            <Link to="/register">
                <button className={styles.getStarted}>Get Started</button>
            </Link>

        </nav>
    );
};

export default Navbar;