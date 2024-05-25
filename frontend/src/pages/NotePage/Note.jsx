import React from "react";
import { useState } from "react";
import Header from "../HomePage/components/header/header";
import Sidebar from "./components/sidebar/sidebar";
import NoteArea from "./components/NoteArea/notearea";
import NotesFront from "./components/NotesFront/notesFront";
import styles from "./note.module.css";

const Note = () => {
  const [showNoteArea, setShowNoteArea] = useState(" ");
  return (
    <div className={styles.notepage_wrapper}>
      <Header useButtons={false} />
      <div className={styles.note_wrapper}>
        <Sidebar setShowNoteArea={setShowNoteArea} />
        {showNoteArea === "newnote" && <NoteArea />}
        {showNoteArea === "notes" && <NotesFront />}
        {showNoteArea === " " && <NotesFront />}
      </div>
    </div>
  );
};

export default Note;