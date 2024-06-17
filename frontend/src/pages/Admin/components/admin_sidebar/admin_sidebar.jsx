// AdminSidebar.jsx
import React, { useState } from 'react';
import styles from './admin_sidebar.module.css';

const AdminSidebar = ({ setShowNoteArea }) => {
  const [activeButton, setActiveButton] = useState('');

// sourcery skip: avoid-function-declarations-in-blocks
  function handleButtonClick(button) {
    setActiveButton(button);
    if (setShowNoteArea) {
      setShowNoteArea(button);
    }
  }

  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.sidebar_menu}>
        <div className={styles.admin_title}>
          <h1>Admin Hub</h1>
        </div>
        <button
          onClick={() => handleButtonClick('adminProfile')}
          className={activeButton === 'adminProfile' ? styles.active : ''}
        >
          <strong className={styles.emoji}>👤</strong> Admin Profile
        </button>
        <button
          onClick={() => handleButtonClick('userList')}
          className={activeButton === 'userList' ? styles.active : ''}
        >
          <strong className={styles.emoji}>👥</strong> User List
        </button>
        <button
          onClick={() => handleButtonClick('feedbacks')}
          className={activeButton === 'feedbacks' ? styles.active : ''}
        >
          <strong className={styles.emoji}>📝</strong> Feedbacks
        </button>
        <button
          onClick={() => handleButtonClick('deletedUsers')}
          className={activeButton === 'deletedUsers' ? styles.active : ''}
        >
          <strong className={styles.emoji}>🗑️</strong> Deleted Users
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
