import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import styles from "./Books.module.css";

const API_URL = "https://api.fortunaelibrary-api.com/api/Books";

const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${API_URL}?filter=`);
                setBooks(response.data);
            } catch (err) {
                setError("Failed to load books.");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.booksPageContainer}>
            <h2>All Books</h2>
            <div className={styles.booksList}>
                {books.map((book) => (
                    <Card key={book.id} className={styles.bookCard}>
                        <CardMedia
                            component="img"
                            alt={book.title}
                            height="200"
                            image={book.image || "default_image_url"}
                            title={book.title}
                        />
                        <CardContent>
                            <Typography variant="h6">{book.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {book.author}
                            </Typography>
                            <Typography variant="body2">{book.genre}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href={`/books/${book.id}`}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default BooksPage;
