import DashboardNavbar from "../../../components/dashboardNavbar/DashboardNavbar";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  
    return (
        <main>
            <DashboardNavbar />
            <div className={styles.dashboard}>
                <button onClick={() => navigate("/AddBook")} className={styles.actionButton}>Add Book</button>
                <button onClick={() => navigate("/BorrowBook")} className={styles.actionButton}>Borrow Book</button>
                <button onClick={() => navigate("/ReturnBook")} className={styles.actionButton}>Return Book</button>
                <button onClick={() => navigate("/UpdateProfile")} className={styles.actionButton}>Update Profile</button>
                <button onClick={() => navigate("/ViewHistory")} className={styles.actionButton}>View Borrowing History</button>
            </div>
        </main>
    );
};

export default Dashboard;
