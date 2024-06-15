import React, { useState, useRef, useMemo } from 'react';
import styles from './notearea.module.css';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../../HomePage/components/header/header';
import Sidebar from '../sidebar/sidebar';
import NotesFront from '../NotesFront/notesFront'
import Reminder from '../Reminder/reminder'

const NoteArea = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const quill = useRef();
  const [showNoteArea, setShowNoteArea] = useState("notes");
  const handleSave = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem('user'));
      const { token } = userToken;
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        'http://localhost:4040/api/v1/notes',
        { title: title, content: content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      if(response.data.status === 'success'){
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
    <div className={styles.notearea_wrapper}>
    <Header />
    <div className={styles.notearea_container}>

    <Sidebar />
      
      
 
    
        <div className={styles.notearea}>
      <input
        type="text"
        placeholder="Enter your title here"
        className={styles.note_title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
   
        <QuillEditor
          theme="snow"
          ref={(el) => (quill.current = el)}
          className={styles.quilleditor}
          value={content}
          formats={formats}
          modules={modules}
          placeholder="Start your note here"
          onChange={(value) => setContent(value)}
        />
         <button onClick={handleSave} className={styles.savebtn}>
        Save
      </button>
      </div>
   </div>
    </div>

   
  
    
  );
};

export default NoteArea;
