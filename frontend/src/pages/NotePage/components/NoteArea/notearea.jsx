import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './notearea.module.css';
import Sidebar from '../sidebar/sidebar';
import Header from "../../../HomePage/components/header/header"

const NoteArea = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const quill = useRef();

  const handleSave = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem('user'));
      if (!userToken) {
        throw new Error('No token found');
      }
      const { token } = userToken;
      const response = await axios.post(
        'http://localhost:4040/api/v1/notes',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if (response.data.status === 'success') {
        navigate('/Note'); // Redirect to notes list or home page after successful save
      }
    } catch (err) {
      console.error('Error saving note:', err);
      if (err.response && err.response.status === 401) {
        console.log('Unauthorized. Redirecting to login page...');
        navigate('/Login');
      } else {
        console.error('Error details:', err.response?.data);
      }
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
          <ReactQuill
            theme="snow"
            ref={quill}
            className={styles.quilleditor}
            value={content}
            formats={formats}
            modules={modules}
            placeholder="Start your note here"
            onChange={(value) => setContent(value)}
          />
        </div>
        <button onClick={handleSave} className={styles.savebtn}>
          Save
        </button>
      </div>
    </div>
    </div>
  );
};

export default NoteArea;
