import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrashUser = () => {
  const [trashs, setTrash] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Number of items per page

  useEffect(() => {
    const fetchTrashUsers = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:4040/api/v1/users/trashedUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrash(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        console.error('Error fetching trashed users:', err);
      }
    };

    fetchTrashUsers();
  }, [currentPage]); // Reload on page change

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1>Trashed Users</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trashs.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstname} {user.lastname}</td>
              <td>{user.email}</td>
              <td>
                <button>Restore</button> {/* Implement restore action if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div>
          {[...Array(totalPages).keys()].map((page) => (
            <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default TrashUser;
