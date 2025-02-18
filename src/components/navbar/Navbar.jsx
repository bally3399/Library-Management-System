import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunae IT Library Management System</h1>

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </div>

            <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
            </div>

            <Link to="/register" className={styles.desktopOnly}>
                <button className={styles.getStarted}>Get Started</button>
            </Link>
        </nav>
    );
};

export default Navbar;
