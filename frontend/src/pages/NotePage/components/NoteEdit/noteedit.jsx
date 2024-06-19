import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import styles from "../NoteArea/notearea.module.css";
import QuillEditor from "react-quill";
import { useNavigate } from "react-router-dom";
import Header from "../../../HomePage/components/header/header";
import Sidebar from "../sidebar/sidebar";
import Note from "../../Note";

const NoteEdit = () => {
  const { note_id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem("user"));
        const { token } = userToken;
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(
          `http://localhost:4040/api/v1/notes/${note_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { title, content } = response.data.data;
        setNote(response.data.data);
        setTitle(title);
        setContent(content);
      } catch (err) {
        console.error("Error fetching note:", err);
        // Handle error as needed
      }
    };
    fetchNote();
  }, [note_id]);

  const handleEdit = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("user"));
      const { token } = userToken;
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.patch(
        `http://localhost:4040/api/v1/notes/${note_id}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      console.log("Note updated successfully");
      if (response.data.status === "success") {
        navigate("/Note"); // Redirect to note list on success
      }
    } catch (err) {
      console.error("Error updating note:", err);
      // Handle error as needed
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

        
return (
  <div>
  <div className={styles.noteadd_header}><Header useButtons = {true} /></div>
   <div className={styles.noteadd_area}>
    <Sidebar />
    <div className={styles.notearea_wrapper}>
      <input
        type="text"
        placeholder="Enter your title here"
        className={styles.note_title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
           <div className={styles.notearea}>
        {note ? (
          <QuillEditor
            theme="snow"
            className={styles.quilleditor}
            modules={modules}
            value={content}
            onChange={setContent}
            placeholder="Start your note here"
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <button onClick={handleEdit} className={styles.savebtn}>
        Edit
      </button>
    </div>
  </div>
  </div>
);
};

export default NoteEdit;
