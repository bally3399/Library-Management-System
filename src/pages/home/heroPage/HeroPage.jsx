import Navbar from "../../../components/navbar/Navbar";
import styles from "../heroPage/HeroPage.module.css";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer";

const books = [
    {
        title: "Atomic Habits",
        author: "James Clear",
        description: "An easy and proven way to build good habits and break bad ones.",
        image: "https://m.media-amazon.com/images/I/51-uspgqWIL.jpg",
        rating: 5,
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        description: "A futuristic society where happiness is controlled by technology.",
        image: "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg",
        rating: 4,
    },

    {
        title: "Dune",
        author: "Frank Herbert",
        description: "A sci-fi epic about politics, religion, and power on a desert planet.",
        image: "https://d3525k1ryd2155.cloudfront.net/h/995/807/944807995.0.x.jpg",
        rating: 4,
    },

    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        description: "A fantasy novel about a young wizard’s journey at Hogwarts.",
        image: "https://m.media-amazon.com/images/I/51UoqRAxwEL.jpg",
        rating: 5,
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        description: "f",
        image: "https://m.media-amazon.com/images/I/41aQPTCmeVL.jpg",
        rating: 5,
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        description: "A philosophical novel about following one's dreams.",
        image: "https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg",
        rating: 5,
    },
    {
        title: "1984",
        author: "George Orwell",
        description: "A dystopian novel about totalitarianism and surveillance.",
        image: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg",
        rating: 5,
    },

    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        description: "A novel about teenage alienation and rebellion.",
        image: "https://m.media-amazon.com/images/I/81OthjkJBuL._AC_SY679_.jpg.jpg",
        rating: 4,
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A novel about racial injustice in the American South.",
        image: "https://m.media-amazon.com/images/I/51grMGCKivL.jpg",
        rating: 5,
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        description: "A classic novel exploring wealth and ambition in the 1920s.",
        image: "https://m.media-amazon.com/images/I/51vv75oglyL.jpg",
        rating: 4,
    },
    {
        title: "Moby-Dick",
        author: "Herman Melville",
        description: "A novel about a captain's obsessive quest for revenge on a whale.",
        image: "https://render.fineartamerica.com/images/images-profile-flow/400/images/artworkimages/mediumlarge/2/the-whale-barathieu-gabriel.jpg",
        rating: 4,
    },

    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        description: "A romantic novel about manners, marriage, and societal expectations.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNQOqNz5BNMTGXMVS82T6p6M4KekaMLnicyw&s",
        rating: 5,
    },

];



const HeroPage = () => {
    return (
        <main style={{minHeight: '100vh'}}>
            <Navbar/>
            <div style={{flexGrow: 1}}>
                <div className={styles.HeroPage}>
                    <h1 className={styles.heroText}>Welcome to Fortunaé IT Library Management System</h1>
                    <p className={styles.HeroText}>We provide an advanced library management system for your
                        organization.</p>
                    <Link to={"/register"}>
                        <button className={styles.button}>Get Started</button>
                    </Link>
                </div>
            </div>

            <div className={styles.bookSection}>
                <h2 className={styles.sectionTitle}>Popular Books</h2>
                <div className={styles.bookGrid}>
                    {books.map((book, index) => (
                        <div key={index} className={styles.bookCard}>
                            <img src={book.image} alt={book.title} className={styles.bookImage}/>
                            <h3 className={styles.bookTitle}>{book.title}</h3>
                            <p className={styles.bookAuthor}>by {book.author}</p>
                            <p className={styles.bookDescription}>{book.description}</p>
                            <div className={styles.bookRating}>
                                {Array.from({length: 5}).map((_, i) => (
                                    <span key={i}
                                          className={i < book.rating ? styles.activeStar : styles.inactiveStar}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <Link to={"/login"}>
                                <button className={styles.viewButton}>View</button>
                            </Link>
                        </div>
                    ))}
                </div>
                </div>

            <Footer/>
        </main>
    );
};

export default HeroPage;
