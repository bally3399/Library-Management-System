import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./BookDetails.module.css";

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(
                    `https://library-mangement-backend.onrender.com/api/Books/book/${bookId}`
                );
                setBook(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load book details.");
                setLoading(false);
            }
        };
        fetchBook();
    }, [bookId]);

    if (loading) return <p className={styles.loading}>Loading...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.bookDetailsContainer}>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <p className={styles.bookAuthor}>Author: {book.author}</p>
            <p className={styles.bookDescription}>{book.description}</p>
        </div>
    );
};

export default BookDetails;
