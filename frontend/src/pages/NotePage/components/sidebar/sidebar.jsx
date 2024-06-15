import React, { useState , useHistory } from 'react'
import styles from './sidebar.module.css';
import { Link } from 'react-router-dom';
// import NoteArea from '../NoteArea/notearea'
const Sidebar = ({ setShowNoteArea }) => {

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

    <div className={styles.sidebar_wrapper}>
      <div className={styles.addbtn_wrapper}>
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
      </div>
    </div>
  )
}

export default Sidebar
// {/* <div className='noteList'>
// <select className='btn_1 eachnote'>
//       <option value="note1">Note 1</option>
//       <option value="note2">Note 2</option>
//       <option value="note3">Note 3</option>
//     </select>

// </div> */}