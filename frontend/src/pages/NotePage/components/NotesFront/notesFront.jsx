import React from 'react'
// import Sidebar from '../sidebar/sidebar'
import Notecard from './NoteCard/notecard'
import styles from './noteFront.module.css'

function NotesFront() {
  return (
    <div className={styles.notefront_wrapper}>
       <Notecard />
    </div>
  )
}

export default NotesFront