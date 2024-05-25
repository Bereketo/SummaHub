import React from "react";

// import ReactQuill from "react-quill";
// import Theme from "quill/core/theme";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import styles from "../NoteArea/notearea.module.css";
import QuillEditor from "react-quill";
import {useState , useRef , useMemo} from 'react'
const NoteEdit = () => {
  const [value, setValue] = useState("");
  function handleEdit() {
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
    }),[]
 
  );
  return (
    <div className={styles.notearea_wrapper}>
    <div className={styles.notearea}>
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
    <button onClick={handleEdit} classname = {styles.savebtn}>Edit</button>

    </div>
  );
};

export default NoteEdit;
