import React from 'react'
import styles from './sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={styles.sidebar_wrapper}>
    <div className={styles.addbtn_wrapper}>
    <button className={styles.addnote_btn}> + New Note</button>
    </div>
    <div className={styles.sidebar_menu}>
    <button><strong className={styles.emoji}> 📃</strong>  Notes</button>
    <button><strong className={styles.emoji}> 🕒</strong> Reminders </button>
    <button><strong className={styles.emoji}> 🧷</strong> Pinned Notes</button>
    <button><strong className={styles.emoji}> 🗑️</strong> Trashed </button>

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