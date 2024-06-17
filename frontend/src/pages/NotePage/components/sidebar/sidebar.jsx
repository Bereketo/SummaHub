import React, { useState } from 'react'
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ setShowNoteArea }) => {
  // const [showNotearea , setShowNoteArea] = useState(false);
  const [activeButton, setActiveButton] = useState("")
  // sourcery skip: avoid-function-declarations-in-blocks
  function handleNotesbtn() {
    setShowNoteArea('notes');
    setActiveButton('notes')
  }

  function handleReminderbtn() {
    setShowNoteArea("reminder")
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
        {/* <button onClick={handlenewNotebtn} className={styles.addnote_btn}> + New Note</button> */}
        <Link to="/NoteAdd" className={styles.addnote_btn}> + New Note</Link>
      </div>
      <div className={styles.sidebar_menu}>
        <button onClick={handleNotesbtn} className={activeButton === 'notes' ? styles.active : ''}><strong className={styles.emoji}> 📃</strong>  Notes</button>
        <button onClick={handleReminderbtn} className={activeButton === 'reminder' ? styles.active : ''}><strong className={styles.emoji}> 🕒</strong> Reminders </button>
        <button onClick={handlePinnedNotes} className={activeButton === 'pinnedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🧷</strong> Pinned Notes</button>
        <button onClick={handleTrashedNotes} className={activeButton === 'trashedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🗑️</strong> Trashed </button>
      </div>
    </div>
  );
};

export default Sidebar;
