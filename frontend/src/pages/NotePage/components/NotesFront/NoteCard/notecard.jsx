import React, { useEffect, useState } from 'react';
import styles from "./notecard.module.css";
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

function Notecard() {
  // const currentdate = new Date();
  // const formattedDate = currentdate.toLocaleString();
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:4040/api/v1/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data[0].title);
        setNotes(response.data.data); // Update this line to correctly set the notes
      } catch (err) {
        console.error('Error fetching notes:', err);
        if (err.response && err.response.data.message === 'jwt expired') {
          console.log('JWT expired. Redirecting to login page...');
          navigate('/Login');
        } else {
          console.error('Error details:', err.response?.data);
        }
      }
    };
    fetchNotes();
  }, [navigate, setNotes]);

  return (
    <div>
      {notes.map((note) => (
        <div key={note._id} className={styles.card_wrapper}>
          <div className={styles.notecontent}>
            <div className={styles.card_title}>
              <h1>{note.title}</h1>
            </div>
            <div className={styles.card_content}>
              <p>{note.content}</p>
            </div>
            <footer>
              <div className={styles.deleteSave}>
                <button className={styles.deletebtn}>Delete</button>
                <Link className={styles.pinnedSymbol} to='/NoteEdit'>🖊️</Link>
              </div>
              {/* <p className={styles.noteDate}>{formattedDate}</p>
              <div className={styles.pinnedSymbol}></div> */}
            </footer>
          </div>
          {/* <div className={styles.pinnedSymbol}>🖊️</div> */}
        </div>
      ))}
    </div>
  );
}

export default Notecard;
