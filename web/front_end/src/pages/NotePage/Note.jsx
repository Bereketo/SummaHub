import React from 'react'
import Header from '../HomePage/components/header/header'
import Sidebar from './components/sidebar/sidebar'
import NoteArea from './components/NoteArea/notearea'
import './note.css'

const Note = () => {
  return (
    <div className='notepage_wrapper'>
    <Header useButtons={false} />
    <div className='note_wrapper'>
    <Sidebar />
    <NoteArea />
    </div>
    </div>
  )
}

export default Note
