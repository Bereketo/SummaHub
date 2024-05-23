import React, { useState } from 'react'
import styles from './sidebar.module.css'
import NoteArea from '../NoteArea/notearea'
const Sidebar = ({setShowNoteArea}) => {
  // const [showNotearea , setShowNoteArea] = useState(false);
  const [activeButton , setActiveButton] = useState("")
 function handleNotesbtn(){
  setShowNoteArea('notes');
  setActiveButton('notes')
 }
 function handleReminderbtn(){
  setShowNoteArea("reminder")
  setActiveButton('reminder')
 }
 function handlenewNotebtn(){
  setShowNoteArea("newnote")
 }
 function handlePinnedNotes(){
  setActiveButton('pinnedNotes')
 }
 function handleTrashedNotes(){
  setActiveButton('trashedNote')
 }
  return (

    <div className={styles.sidebar_wrapper}>
    <div className={styles.addbtn_wrapper}>
    <button  onClick = {handlenewNotebtn} className={styles.addnote_btn}> + New Note</button> </div>
    <div className={styles.sidebar_menu}>
    <button  onClick = {handleNotesbtn} className={activeButton === 'notes' ? styles.active : ''}><strong className={styles.emoji}> 📃</strong>  Notes</button>
    <button  onClick = {handleReminderbtn} className={activeButton === 'reminder' ? styles.active : ''}><strong className={styles.emoji}> 🕒</strong> Reminders </button>
    <button onClick={handlePinnedNotes} className={activeButton === 'pinnedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🧷</strong> Pinned Notes</button>
    <button onClick={handleTrashedNotes} className={activeButton === 'trashedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🗑️</strong> Trashed </button>
    </div>
    </div>
  )
}

export default Sidebar
{/* <div className='noteList'>
<select className='btn_1 eachnote'>
      <option value="note1">Note 1</option>
      <option value="note2">Note 2</option>
      <option value="note3">Note 3</option>
    </select>

</div> */}