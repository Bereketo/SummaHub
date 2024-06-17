import React, { useState } from 'react';
import styles from './admin_sidebar.module.css';

const AdminSidebar = ({ setShowNoteArea }) => {
  const [activeButton, setActiveButton] = useState("");

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
          onClick={() => handleButtonClick('notes')}
          className={activeButton === 'notes' ? styles.active : ''}
        >
          <strong className={styles.emoji}>👤</strong> Admin Profile
        </button>
        <button
          onClick={() => handleButtonClick('reminder')}
          className={activeButton === 'reminder' ? styles.active : ''}
        >
          <strong className={styles.emoji}>👥</strong> User List
        </button>
        <button
          onClick={() => handleButtonClick('pinnedNotes')}
          className={activeButton === 'pinnedNotes' ? styles.active : ''}
        >
          <strong className={styles.emoji}>📝</strong> Feedbacks
        </button>
        <button
          onClick={() => handleButtonClick('trashedNotes')}
          className={activeButton === 'trashedNotes' ? styles.active : ''}
        >
          <strong className={styles.emoji}>🗑️</strong> Deleted Users
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
