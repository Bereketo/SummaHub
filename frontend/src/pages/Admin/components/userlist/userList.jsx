import React, { useEffect, useState } from "react";
import styles from './userList.module.css';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Adjust items per page as needed

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:4040/api/v1/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setUsers(response.data.data);
        setFilteredUsers(response.data.data); // Initialize filteredUsers with all users
      } catch (err) {
        console.error('Error fetching user data:', err);
        if (err.response && err.response.data.message === 'jwt expired') {
          console.log('JWT expired. Redirecting to login page...');
        } else {
          console.error('Error details:', err.response?.data);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleDelete = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.patch(`http://localhost:4040/api/v1/users/${userId}`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 204) {
          // User deleted successfully, update the UI
          setUsers(users.filter(user => user._id !== userId));
          setFilteredUsers(filteredUsers.filter(user => user._id !== userId));
          console.log('User deleted successfully');
        } else {
          console.error('Failed to delete user');
        }
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter(user =>
      user.firstname.toLowerCase().includes(searchTerm) ||
      user.lastname.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredUsers);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.user_display}>
      <div className={styles.manage_user}>
        <h2>Manage Users</h2>
      </div>
      <div className={styles.user_listtitle}>
        <h3>User List</h3>
        <div className={styles.user_search}>
          <input type="text" placeholder="🔍 Search user" value={searchTerm} onChange={handleSearchChange} />
        </div>
      </div>
      <div className={styles.user_list}>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.active ? 'Active' : 'Inactive'}</td>
                <td>
                  {user.active && (
                    <button onClick={() => handleDelete(user._id, `${user.firstname} ${user.lastname}`)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination_controls}>
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredUsers.length / itemsPerPage)}>Next</button>
        </div>
        {filteredUsers.length > itemsPerPage && (
          <ul className={styles.pagination}>
            {Array(Math.ceil(filteredUsers.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? styles.active : ""}
                >
                  {index + 1}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
