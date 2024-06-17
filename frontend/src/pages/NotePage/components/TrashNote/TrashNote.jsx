import React, { useEffect, useState } from 'react';
import styles from "../NotesFront/NoteCard/notecard.module.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TrashNote() {
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`http://localhost:4040/api/v1/notes/trash?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setNotes(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching trashed notes:', err);
        if (err.response && err.response.data.message === 'jwt expired') {
          navigate('/Login');
        }
      }
    };
    fetchNotes();
  }, [navigate, page]);

  const handleRestore = async (id) => {
    try {
      const userToken = JSON.parse(localStorage.getItem('user'));
      const { token } = userToken;
      if (!token) {
        throw new Error('No token found');
      }
      await axios.patch(`http://localhost:4040/api/v1/notes/${id}`, { isDeleted: false }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter(note => note._id !== id));
      window.location.reload();
    } catch (err) {
      console.error('Error restoring note:', err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <div className={styles.grid_container}>
        {notes.map((note) => (
          <div key={note._id} className={styles.card_wrapper}>
            <div className={styles.notecontent}>
              <div className={styles.card_title}>
                <h1>{note.title}</h1>
              </div>
              <div className={styles.card_content}>
                <p>{note.content}</p>
              </div>
            </div>
            <footer>
              <div className={styles.deleteSave}>
                <button
                  className={styles.restorebtn}
                  onClick={() => handleRestore(note._id)}
                >
                  Restore
                </button>
              </div>
            </footer>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={notes.length < 6}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TrashNote;
