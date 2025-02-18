import DashboardNavbar from "../../../components/dashboardNavbar/DashboardNavbar";
import styles from "./Dashboard.module.css";
import Footer from "../../../components/footer";

const Dashboard = () => {
    return (
        <main>
            <DashboardNavbar />
            <div className={styles.dashboard}>
                <button className={styles.actionButton}>Add Book</button>
                <button className={styles.actionButton}>Borrow Book</button>
                <button className={styles.actionButton}>Return Book</button>
                <button className={styles.actionButton}>Update Profile</button>
                <button className={styles.actionButton}>View Borrowing History</button>
            </div>
            <Footer/>
        </main>
    );
};

export default Dashboard;
