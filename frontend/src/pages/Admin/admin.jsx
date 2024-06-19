import React from "react";
import AdminSidebar from "./components/admin_sidebar/admin_sidebar";
import styles from "./admin.module.css";  // Ensure to import the styles

const Admin = () => {
  return (
    <div className={styles.adminContainer}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        {/* Add main content components here, e.g., UserList, ProfileDetails, etc. */}
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default Admin;
