import React, { useState } from 'react'
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import NotesFront from '../NotesFront/notesFront';

const Sidebar = ({ setShowNoteArea }) => {

  const [activeButton, setActiveButton] = useState("")
  function handleNotesbtn() {
    setActiveButton('notes')
  }

  function handleReminderbtn() {
    setActiveButton('reminder')
  }

  function handlePinnedNotes() {
    setActiveButton('pinnedNotes');
  }

  function handleTrashedNotes() {
    setActiveButton('trashedNotes');
  }

  return (

    <div className={styles.sidebar_wrapper}>
      <div className={styles.addbtn_wrapper}>
      <NavLink to="/NoteAdd" className={({ isActive }) => isActive ? styles.active : ''} >
      + New Note
      </NavLink>
    
      </div>
      <div className={styles.sidebar_menu}>
  
      <NavLink to="/notefront" className={({ isActive }) => isActive ? styles.active : ''} >
        <strong className={styles.emoji}> 📃</strong> Notes
      </NavLink>
      <NavLink to="/reminders" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setShowNoteArea('reminder')}>
        <strong className={styles.emoji}> 🕒</strong> Reminders
      </NavLink>
      <NavLink to="/pinned" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setShowNoteArea('pinnedNotes')}>
        <strong className={styles.emoji}> 🧷</strong> Pinned Notes
      </NavLink>
      <NavLink to="/trash" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setShowNoteArea('trashedNotes')}>
        <strong className={styles.emoji}> 🗑️</strong> Trashed
      </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
