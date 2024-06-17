import React, { useState } from 'react'
import styles from './sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ setShowNoteArea }) => {

  const [, setActiveButton] = useState("")
// sourcery skip: avoid-function-declarations-in-blocks


  // eslint-disable-next-line no-unused-vars
  function handlePinnedNotes() {
    setActiveButton('pinnedNotes');
  }


  return (

    <div className={styles.sidebar_wrapper}>
      <div className={styles.addbtn_wrapper}>
      <NavLink to="/NoteAdd" className={({ isActive }) => 
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
      } >
      + New Note
      </NavLink>
      </div>
      <div className={styles.sidebar_menu}>
      <NavLink to="/notefront" className={({ isActive }) =>isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott} >
        <strong className={styles.emoji}> 📃</strong> Notes
      </NavLink>
      <NavLink to="/reminders" className={({ isActive }) => isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott} onClick={() => setShowNoteArea('reminder')}>
        <strong className={styles.emoji}> 🕒</strong> Reminders
      </NavLink>
      <NavLink to="/pinned" className={({ isActive }) =>isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott} onClick={() => setShowNoteArea('pinnedNotes')}>
        <strong className={styles.emoji}> 🧷</strong> Pinned Notes
      </NavLink>
      <NavLink to="/trash" className={({ isActive }) => isActive ? `${styles.navLink_bott} ${styles.active}` : styles.navLink_bott} onClick={() => setShowNoteArea('trashedNotes')}>
        <strong className={styles.emoji}> 🗑️</strong> Trashed
      </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
