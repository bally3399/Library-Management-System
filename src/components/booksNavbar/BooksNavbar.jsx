import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import styles from "./BooksNavbar.module.css";
import axios from "axios";

const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        try {
            const response = await axios.get(
                `https://api.fortunaelibrary-api.com/api/Books/search`
            );
            console.log("Search Results:", response.data);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunaé IT Library MS</h1>

            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search books"
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enable Enter key search
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    <FiSearch />
                </button>
            </div>

            <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FiX /> : <FiMenu />}
            </div>

            <div className={`${styles.navLinks} ${isOpen ? styles.showMenu : ""}`}>
                <Link to="/" className={styles.navItem}>Home</Link>
                <Link to="/contact" className={styles.navItem}>Contact</Link>
                <Link to="/logout" className={styles.button}>
                    <button className={styles.logoutButton}>Logout</button>
                </Link>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
