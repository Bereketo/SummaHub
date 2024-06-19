import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import styles from "../NoteArea/notearea.module.css";
import QuillEditor from "react-quill";
import { useNavigate } from "react-router-dom";
import Header from "../../../HomePage/components/header/header";
import Sidebar from "../sidebar/sidebar";

const NoteEdit = () => {
  const { note_id } = useParams();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const quill = useRef();

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

      // Clean up Quill editor content
      const cleanedContent = quill.current.editor.getText().trim();

      const response = await axios.patch(
        `http://localhost:4040/api/v1/notes/${note_id}`,
        {
          title: title,
          content: cleanedContent, // Use cleaned content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        navigate("/Note"); // Redirect to note list on success
      }
    } catch (err) {
      console.error("Error updating note:", err);
      // Handle error as needed
    }
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'clean',
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  return (
    <div>
      <div className={styles.noteadd_header}><Header useButtons={true} /></div>
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
                ref={quill} // Assign ref to Quill editor instance
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
