import React, { useState } from 'react';
import styles from './admin_sidebar.module.css';

const AdminSidebar = ({ setShowNoteArea }) => {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (setShowNoteArea) {
      setShowNoteArea(button);
    }
  };

  return (
    <div className={styles.sidebarWrapper}>
      
      <div className={styles.sidebarMenu}>
        <button
          onClick={() => handleButtonClick('adminProfile')}
          className={`${styles.menuButton} ${activeButton === 'adminProfile' ? styles.active : ''}`}
        >
          <span className={styles.icon}>👤</span> Admin Profile
        </button>
        <button
          onClick={() => handleButtonClick('userList')}
          className={`${styles.menuButton} ${activeButton === 'userList' ? styles.active : ''}`}
        >
          <span className={styles.icon}>👥</span> User List
        </button>
       
      </div>
    </div>
  );
};

export default AdminSidebar;
