import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import styles from "./AddBook.module.css";

const API_URL = "https://api.fortunaelibrary-api.com/api/Books";

const AddBook = ({ onAddBook }) => {
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        genre: "",
        description: "",
        isbn: "",
        image: null,
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const handleFileChange = (e) => {
        setBookData({ ...bookData, image: e.target.files[0] });
    };

    const inputStyles = {
        "& label.Mui-focused": { color: "#a47a47" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "black" },
            "&:hover fieldset": { borderColor: "#a47a47" },
            "&.Mui-focused fieldset": { borderColor: "#a47a47" },
        },
        // marginBottom: "8px",
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const formData = new FormData();
        formData.append("title", bookData.title);
        formData.append("author", bookData.author);
        formData.append("genre", bookData.genre);
        formData.append("description", bookData.description);
        formData.append("isbn", bookData.isbn);
        formData.append("image", bookData.image);

        try {
            const response = await axios.post(`${API_URL}/AddBook`,
                formData,
                {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const newBook = response.data;

            setMessage("Book added successfully!");
            onAddBook(newBook); 
            setBookData({
                title: "",
                author: "",
                genre: "",
                description: "",
                isbn: "",
                image: null,
            });
            window.location.href="/books"
        } catch (error) {
            setMessage("Failed to add book. Try again.");
        }
    };

    return (
        <div className={styles.addBookContainer}>
            <h2>Add a New Book</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Author"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Genre"
                    name="genre"
                    value={bookData.genre}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="Description"
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />
                <TextField
                    label="ISBN"
                    name="isbn"
                    value={bookData.isbn}
                    onChange={handleChange}
                    fullWidth
                    required
                    margin="normal"
                    sx={inputStyles}
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                    className={styles.fileInput}

                />
                <div className={styles.submitButtonWrapper}>
                    <Button
                        type="submit"
                        variant="contained"
                        className={styles.submitButton}
                        fullWidth
                    >
                        Add Book
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddBook;
