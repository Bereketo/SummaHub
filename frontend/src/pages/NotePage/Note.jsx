import React from "react";

import Header from "../HomePage/components/header/header";
import Sidebar from "./components/sidebar/sidebar";
// import NoteArea from "./components/NoteArea/notearea";
import NotesFront from "./components/NotesFront/notesFront";
import styles from "./note.module.css";

const Note = ({theme , setTheme}) => {
  
  
  return (
    <div className={styles.notepage_wrapper}>
      <Header useButtons={true} theme = {theme} setTheme = {setTheme}  />
      <div className={styles.note_wrapper}>
        <Sidebar/>
        <NotesFront />
      </div>
    </div>
  );
};

export default Note;
