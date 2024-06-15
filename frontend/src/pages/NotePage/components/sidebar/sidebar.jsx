<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, { useState , useHistory } from 'react'
>>>>>>> 76d84b8e7a22f9e4f40e3fd534beadd97477e421
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';

const Sidebar = ({ setShowNoteArea }) => {
<<<<<<< HEAD
  const [activeButton, setActiveButton] = useState("");

// sourcery skip: avoid-function-declarations-in-blocks
  function handleNotesbtn() {
    setShowNoteArea('notes');
    setActiveButton('notes');
  }
=======

  const [activeButton, setActiveButton] = useState("")
 
  function handleNotesbtn() {
    // setShowNoteArea('notes');
    setActiveButton('notes')
  }
  function handleReminderbtn() {
    // setShowNoteArea("reminder")
    setActiveButton('reminder')
  }
  // function handlenewNotebtn() {
  //   setShowNoteArea("newnote")
  // }
  function handlePinnedNotes() {
    setActiveButton('pinnedNotes')
  }
  function handleTrashedNotes() {
    setActiveButton('trashedNote')
  }
  return (
>>>>>>> 76d84b8e7a22f9e4f40e3fd534beadd97477e421

  function handleReminderbtn() {
    setShowNoteArea('reminder');
    setActiveButton('reminder');
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
<<<<<<< HEAD
        <Link to="/NoteAdd" className={styles.addnote_btn}> + New Note </Link>
      </div>
      <div className={styles.sidebar_menu}>
        <button onClick={handleNotesbtn} className={activeButton === 'notes' ? styles.active : ''}>
          <strong className={styles.emoji}> 📃</strong> Notes
        </button>
        <button onClick={handleReminderbtn} className={activeButton === 'reminder' ? styles.active : ''}>
          <strong className={styles.emoji}> 🕒</strong> Reminders
        </button>
        <button onClick={handlePinnedNotes} className={activeButton === 'pinnedNotes' ? styles.active : ''}>
          <strong className={styles.emoji}> 🧷</strong> Pinned Notes
        </button>
        <button onClick={handleTrashedNotes} className={activeButton === 'trashedNotes' ? styles.active : ''}>
          <strong className={styles.emoji}> 🗑️</strong> Trashed
        </button>
=======
        {/* <button onClick={handlenewNotebtn} className={styles.addnote_btn}> + New Note</button> */}
        <div className={styles.addnotebtn_wrapper}>
        <Link to="/NoteAdd" className={styles.addnote_btn}> + New Note</Link>
        </div>
      
      </div>
      <div className={styles.sidebar_menu}>
      <Link onClick={handleNotesbtn} to="/NoteFront" className={`${styles.links} ${activeButton === 'notes' ? styles.active : ''}`}>
      <strong className={styles.emoji}> 📃</strong>Notes
    </Link>
    <Link  onClick={handleReminderbtn} to="/Reminder" className={`${styles.links} ${activeButton === 'reminder' ? styles.active : ''}`}>
      <strong className={styles.emoji}> 🕒 </strong> Reminder
    </Link>
    <Link onClick={handlePinnedNotes} to="/NoteAdd" className={`${styles.links} ${activeButton === 'pinnedNotes' ? styles.active : ''}`}>
      <strong className={styles.emoji}> 🧷 </strong>Pinned Notes</Link>
    <Link onClick={handleTrashedNotes} to="/NoteAdd" className={`${styles.links} ${activeButton === 'trashedNotes' ? styles.active : ''}`}>
      <strong className={styles.emoji}> 🗑️ </strong>Trashed Notes
    </Link>
        {/* <button onClick={handleNotesbtn} className={activeButton === 'notes' ? styles.active : ''}><strong className={styles.emoji}> 📃</strong>  Notes</button>
        <button onClick={handleReminderbtn} className={activeButton === 'reminder' ? styles.active : ''}><strong className={styles.emoji}> 🕒</strong> Reminders </button>
        <button onClick={handlePinnedNotes} className={activeButton === 'pinnedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🧷</strong> Pinned Notes</button>
        <button onClick={handleTrashedNotes} className={activeButton === 'trashedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🗑️</strong> Trashed </button> */}
>>>>>>> 76d84b8e7a22f9e4f40e3fd534beadd97477e421
      </div>
    </div>
  );
};

export default Sidebar;
