import Navbar from "../../../components/navbar/Navbar";
import styles from "../heroPage/HeroPage.module.css"
import React from "react";
import { Link } from "react-router-dom";


const HeroPage = () => {
    return (
        <main style={{minHeight:'100vh'}}>
            <Navbar/>
            <div style={{flexGrow: 1}}>
                <div className={styles.HeroPage}>
                    <h1 className={styles.heroText}>Welcome to fortunae IT Library Management System</h1>
                    <p className={styles.HeroText}>We provide an advanced library management system for your
                        organization.
                    </p>
                    <Link to={"/register"}>
                        <button className={styles.button}>Get Started</button>
                    </Link>
                </div>
            </div>
        </main>

    )
}
export default HeroPage