import React from "react";
import { useState } from "react";
import Header from "../HomePage/components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import NoteArea from "./components/NoteArea/notearea";
import NotesFront from "./components/NotesFront/notesFront";
import Reminder from "./components/Reminder/reminder";
import styles from "./note.module.css";

const Note = ({theme , setTheme}) => {
  const [showNoteArea, setShowNoteArea] = useState("notes");
  return (
    <div className={styles.notepage_wrapper}>
      <Header useButtons={false} theme = {theme} setTheme = {setTheme}/>
      <div className={styles.note_wrapper}>
        <Sidebar setShowNoteArea={setShowNoteArea} />
        {showNoteArea === "newnote" && <NoteArea />}
        {showNoteArea === "notes" && <NotesFront />}
        {showNoteArea === "reminder" && <Reminder />}
      </div>
    </div>
  );
};

export default Note;
