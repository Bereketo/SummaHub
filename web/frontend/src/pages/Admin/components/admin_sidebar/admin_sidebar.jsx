
import React, { useState } from 'react'
import styles from './admin_sidebar.module.css'

const AdminSidebar = ({setShowNoteArea}) => {
  // const [showNotearea , setShowNoteArea] = useState(false);
  const [activeButton , setActiveButton] = useState("")
 function handleNotesbtn(){

 }
 function handleReminderbtn(){

 }

 function handlePinnedNotes(){
 
 }
 function handleTrashedNotes(){
 
 }
  return (

    <div className={styles.sidebar_wrapper}>
    <div className={styles.sidebar_menu}>
    <button  onClick = {handleNotesbtn} className={activeButton === 'notes' ? styles.active : ''}><strong className={styles.emoji} > 👤</strong>Admin Profile </button>
    <button  onClick = {handleReminderbtn} className={activeButton === 'reminder' ? styles.active : ''}><strong className={styles.emoji}>👥</strong> User List </button>
    <button onClick={handlePinnedNotes} className={activeButton === 'pinnedNotes' ? styles.active : ''}><strong className={styles.emoji}>📝</strong> Feedbacks </button>
    <button onClick={handleTrashedNotes} className={activeButton === 'trashedNotes' ? styles.active : ''}><strong className={styles.emoji}> 🗑️</strong> Deleted Users </button>
    </div>
    </div>
  )
}

export default AdminSidebar

