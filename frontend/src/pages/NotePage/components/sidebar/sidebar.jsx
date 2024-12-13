import React from 'react';
import styles from './sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={styles.sidebar_wrapper}>
      <div className={styles.addbtn_wrapper}>
        <NavLink 
          to="/NoteAdd" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          + New Note
        </NavLink>
      </div>
      <div className={styles.sidebar_menu}>
        <NavLink 
          to="/Note" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott
          }
        >
          <strong className={styles.emoji}>📃</strong> Notes
        </NavLink>
        <NavLink 
          to="/Reminder" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott
          }
        >
          <strong className={styles.emoji}>🕒</strong> Reminders
        </NavLink>
       
        <NavLink 
          to="/trash" 
          className={({ isActive }) => 
            isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott
          }
        >
          <strong className={styles.emoji}>🗑️</strong> Trashed
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
