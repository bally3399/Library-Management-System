import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./DashboardNavbar.module.css";

const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunae IT Library Management System</h1>

            <input
                type="text"
                placeholder="Search books..."
                className={styles.searchBox}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </div>

            <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
                <Link to="/" className={styles.navItem}>Home</Link>
                <Link to="/books" className={styles.navItem}>Books</Link>
                <Link to="/contact" className={styles.navItem}>Contact</Link>
                <Link to="/logout" className={styles.button}>
                    <button className={styles.logoutButton}>Logout</button>
                </Link>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
