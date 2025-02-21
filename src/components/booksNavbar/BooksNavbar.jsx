import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import styles from "./BooksNavbar.module.css";
import axios from "axios";

const DashboardNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        try {
            const response = await axios.get(
                `https://api.fortunaelibrary-api.com/api/Books/search?title=${encodeURIComponent(searchTerm)}`
            );
            setSearchResults(response.data);
            setShowSuggestions(true);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    const handleSelectBook = (bookId) => {
        setShowSuggestions(false);
        navigate(`/book/${bookId}`);
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
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button className={styles.searchButton} onClick={handleSearch}>
                    <FiSearch />
                </button>

                {showSuggestions && (
                    <div className={styles.suggestionsDropdown}>
                        {searchResults.length > 0 ? (
                            searchResults.map((book) => (
                                <div
                                    key={book.id}
                                    className={styles.suggestionItem}
                                    onClick={() => handleSelectBook(book.id)}
                                >
                                    {book.title}
                                </div>
                            ))
                        ) : (
                            <div className={styles.noResults}>No results found</div>
                        )}
                    </div>
                )}
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


