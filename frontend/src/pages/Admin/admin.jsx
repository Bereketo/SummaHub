import React, { useState } from "react";
import AdminSidebar from "./components/admin_sidebar/admin_sidebar";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import UserList from "./components/userlist/userList";
import styles from "./admin.module.css";

const Admin = () => {
  const [activeContent, setActiveContent] = useState('adminProfile');

  const renderContent = () => {
    switch (activeContent) {
      case 'adminProfile':
        return <AdminProfile />;
      case 'userList':
        return <UserList />; // Placeholder for UserList component
      // case 'feedbacks':
      //   return <h1>Feedbacks Component</h1>; // Placeholder for Feedbacks component
      case 'deletedUsers':
        return ; // Placeholder for DeletedUsers component
      default:
        return <AdminProfile />;
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
