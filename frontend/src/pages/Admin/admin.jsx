import React, { useState } from "react";
import AdminSidebar from "./components/admin_sidebar/admin_sidebar";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import styles from "./admin.module.css";

const Admin = () => {
  const [activeContent, setActiveContent] = useState('adminProfile');

  const renderContent = () => {
    switch (activeContent) {
      case 'adminProfile':
        return <AdminProfile />;
      case 'userList':
        return <h1>User List Component</h1>; // Placeholder for UserList component
      case 'feedbacks':
        return <h1>Feedbacks Component</h1>; // Placeholder for Feedbacks component
      case 'deletedUsers':
        return <h1>Deleted Users Component</h1>; // Placeholder for DeletedUsers component
      default:
        return <h1>Welcome to Admin Dashboard</h1>;
    }
  };

  return (
    <div className={styles.adminContainer}>
      <AdminSidebar setShowNoteArea={setActiveContent} />
      <div className={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
