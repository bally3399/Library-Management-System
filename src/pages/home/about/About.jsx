import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.title}>About Fortunaé IT Library Management System</h1>

            <p className={styles.summary}>
                Fortunaé IT Library Management System is your ultimate companion for a modern library experience.
                Designed for book lovers and librarians alike, our app offers seamless book browsing,
                easy borrowing, and instant support through our Contact feature. Whether you're
                exploring new reads or managing library tasks, we bring convenience and connection
                to your fingertips—anytime, anywhere.
            </p>

            <div className={styles.section}>
                <h2 className={styles.subtitle}>Our Mission</h2>
                <p className={styles.text}>
                    We aim to revolutionize the way you interact with libraries by blending technology
                    with the timeless joy of reading. Our goal is to make knowledge accessible, foster
                    community engagement, and empower users with tools to explore, learn, and connect.
                </p>
            </div>

            <div className={styles.section}>
                <h2 className={styles.subtitle}>What We Offer</h2>
                <ul className={styles.featureList}>
                    <li className={styles.featureItem}>Browse and borrow books effortlessly.</li>
                    <li className={styles.featureItem}>Track your reading history and due dates.</li>
                    <li className={styles.featureItem}>Connect with library staff instantly.</li>
                    <li className={styles.featureItem}>Personalized book recommendations.</li>
                </ul>
            </div>

            <div className={styles.section}>
                <h2 className={styles.subtitle}>Get in Touch</h2>
                <p className={styles.text}>
                    Have questions or suggestions? We’d love to hear from you! Reach out to our team
                    and let’s make your library experience even better.
                </p>
                <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    className={styles.contactButton}
                    style={{ background: "#ab7933", color: "white" }}
                >
                    Contact Us
                </Button>
            </div>
        </div>
    );
};

export default About;