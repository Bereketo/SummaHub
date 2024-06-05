import React from "react";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import styles from "./notearea.module.css";
import QuillEditor from "react-quill";
import {useState , useRef , useMemo} from 'react'
const NoteArea = () => {
  const [value, setValue] = useState("");

  function handleSave() {
    console.log(value);
  }
  const formats = ["header","bold","italic","underline","strike","blockquote",
    "list","bullet","indent","link","image","color","clean",
  ];
  const quill = useRef();
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
         
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
 
      },
      clipboard: {
        matchVisual: true,
      },
    }),
 
  );
  return (
    <div className={styles.notearea_wrapper}>
    <div className={styles.notearea}>
    <input type="text" placeholder="Enter your title here" className={styles.note_title } />
      <QuillEditor
      theme = {'snow'}
      ref = {(el)=>(quill.current = el)}
       className={styles.quilleditor}
       
       value ={value}
       formats={formats}
       modules={modules}
       placeholder="start your note here"
       onChange = {(value) => setValue(value)}
        />
    </div>
    <button onClick = {handleSave} classname = {styles.savebtn}> Save</button>

    </div>
  );
};

export default NoteArea;
