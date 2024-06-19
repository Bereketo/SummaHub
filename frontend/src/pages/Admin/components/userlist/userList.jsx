import React, { useEffect, useState } from "react";
import styles from './userList.module.css';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className={styles.user_display}>
      <div className={styles.manage_user}>
        <h2>Manage Users</h2>
      </div>
      <div className={styles.user_listtitle}>
        <h3>User List</h3>
        <div className={styles.user_search}>
          <input type="text" placeholder="🔍 Search user" />
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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstname} {user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
