import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import styles from "./Books.module.css";
import BooksNavbar from "../../../components/booksNavbar/BooksNavbar";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://fortunaeapi-dev.eba-7p6g3tc2.us-east-1.elasticbeanstalk.com/api/Books/getbooks";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const fetchBooks = async () => {
        try {
            const response = await axios.get(API_URL);
            console.log("Fetched books:", response?.data);
            setBooks(response.data);
        } catch (err) {
            setError("Failed to load books.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [location]); // Re-fetch books when the location changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <BooksNavbar />
            <div className={styles.booksPageContainer}>
                <h2>All Books</h2>
                <div className={styles.booksList}>
                    {books.map((book) => (
                        <Card key={book.id} className={styles.bookCard}>
                            <CardMedia
                                component="img"
                                alt={book.title}
                                height="200"
                                image={book.bookImage || "default_image_url"}
                                title={book.title}
                                description={book.description}
                                className={styles.bookImage}
                            />
                            <CardContent>
                                <Typography className={styles.bookTitle} variant="h6">
                                    {book.title}
                                </Typography>
                                <Typography className={styles.bookAuthor} variant="body2" color="textSecondary">
                                    {book.author}
                                </Typography>
                                <Typography className={styles.bookDescription}>
                                    {book.description}
                                </Typography>
                                <div className={styles.submitButtonWrapper}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className={styles.submitButton}
                                        onClick={() => navigate("/BorrowBook")}
                                    >
                                        Borrow Book
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BooksPage;