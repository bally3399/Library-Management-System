"use strict";

import React, { useState, useEffect, } from "react";
import axios from "axios";
import { Card, CardContent, Typography, CardMedia, Button } from "@mui/material";
import styles from "./Books.module.css";
import DashboardNavbar from "../../../components/dashboardNavbar/DashboardNavbar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";



const API_URL = "http://api.fortunaelibrary-api.com/api";


const BooksPage = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const [memberId, setMemberId] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();






    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${API_URL}/Books/getbooks?pageNumber=1&pageSize=10`);
                setBooks(response.data);
            } catch (err) {
                setError("Failed to load books.");
                console.error("Error fetching books:", err);
            }

            // Decode token only if it exists
            setLoading(false);
        };

        fetchBooks();
    }, []); // Ensure `useEffect` runs when `token` changes

    if (loading){
        <p>Loading...</p>;
    }    
    if (error){
      <p>{error}</p>;
    }

    const token = localStorage.getItem("token"); // Get token from local storage (or state)
   
       //const token = localStorage.getItem('token');
    //    const decodedToken = jwtDecode(token);
    //    console.log(token);
    //    //console.log(token.UserId);
    //    console.log(decodedToken);
    //   console.log(decodedToken.UserId);

    const handleBorrowBook = async (e, bookId) => { 
    e.preventDefault();
    console.log(bookId);
    setLoading(true);

    if (!token) {
        console.error("No authentication token found.");
        setMessage("User not authenticated.");
        setLoading(false);
        return;
    }

    try {
        let userId = null;

        try {
            const decodedToken = jwtDecode(token);
            userId = decodedToken?.UserId; // Extract userId directly
            console.log("UserId:", userId);
        } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            setMessage("Invalid token.");
            setLoading(false);
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        };

        // Use query parameters instead of body
        const response = await axios.post(
            `${API_URL}/Borrowing?userId=${userId}&bookId=${bookId}`, 
            null, // No request body needed
            config // Headers
        );

        setMessage("Book borrowed successfully!");
        console.log("Borrow response:", response.data);
        toast.success("Book borrowed successfully!");
    } catch (error) {
        setMessage("Failed to borrow book.");
        console.error("Borrowing error:", error.response?.data || error.message);
    } finally {
        setLoading(false);
    }
};
  


    return (
        <div>
            <DashboardNavbar />
            <div className={styles.booksPageContainer}>
                <h2>All Books</h2>
                <div className={styles.booksList}>
                    {books.map((book) => (
                        <Card key={book.id} className={styles.bookCard}>
                            <CardMedia
                                component="img"
                                alt={book.title}
                                height="50"
                                image={book.image || "/jefffinleyunsplash.jpg"}
                                title={book.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{book.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {book.author}
                                </Typography>
                                <Typography variant="body2">{book.genre}</Typography>
                                <div className="flex justify-between">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={`/books/${book.id}`}
                                >
                                    View Details
                                </Button>
                                <Button
                                   onClick={(e) => handleBorrowBook(e, book.id)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button>
                                </div>
                                
{/* 
                                <Button
                                   onClick={(e) => handleBorrowBook(e, book.id)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Borrow Book
                                </Button> */}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default BooksPage;
