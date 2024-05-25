import React from 'react'
import styles from "./notecard.module.css"
import { Link } from 'react-router-dom';

function Notecard() {
    const currentdate = new Date()
    const formattedDate = currentdate.toLocaleString();
  return (
    <div className = {styles.card_wrapper}>
  <div className={styles.notecontent}>
  <div className ={styles.card_title}>
    <h1> Title</h1> 
    </div>
    <div className = {styles.card_content}> 
    <p> hello </p>
    </div>
  </div>

    <footer>
    <div className = {styles.deleteSave}>
    <button className={styles.deletebtn}> Delete</button>
    <Link className={styles.editbtn} to='/NoteEdit'> Edit </Link>
    </div>
        <p className={styles.noteDate}>{formattedDate}</p>
        
        <div className={styles.pinnedSymbol}>🖊️</div>
    </footer>
     
    
    </div>
  )
}

export default Notecard