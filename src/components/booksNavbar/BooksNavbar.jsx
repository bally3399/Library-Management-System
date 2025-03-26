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
    const [searchType, setSearchType] = useState("title"); // Default search type
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setShowSuggestions(false);
            return;
        }

        try {
            const queryParams = new URLSearchParams({
                title: searchType === "title" ? searchTerm : "",
                author: searchType === "author" ? searchTerm : "",
                genre: searchType === "genre" ? searchTerm : "",
                isAvailable: true,

            });

            const response = await axios.get(
                `https://library-mangement-backend.onrender.com/api/Books/search?${queryParams}`
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

    const handleSearchTypeChange = (type) => {
        setSearchType(type);
        setSearchTerm("");
        setShowSuggestions(false);
    };

    return (
        <nav className={styles.navbar}>
            <h1 className={styles.brandName}>Fortunaé IT Library MS</h1>

            <div className={styles.searchContainer}>
                <select
                    className={styles.searchTypeDropdown}
                    value={searchType}
                    onChange={(e) => handleSearchTypeChange(e.target.value)}
                >
                    <option value="title">Search by Title</option>
                    <option value="author">Search by Author</option>
                    <option value="genre">Search by Genre</option>
                </select>
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value.trim() === "") {
                            setShowSuggestions(false);
                        }
                    }}
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
                                    {book.title} by {book.author}
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