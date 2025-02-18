"use client";

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <div className={styles.logoutContainer}>
            <div className={styles.logoutCard}>
                <h2 className={styles.logoutTitle}>Are you sure you want to log out?</h2>
                <Button
                    variant="contained"
                    fullWidth
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Logout;
