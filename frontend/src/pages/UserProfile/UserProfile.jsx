import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { showAlert } from '../../utils/alert';
import styles from './UserProfile.module.css';
import axios from 'axios';
import { styleText } from 'util';

const UserProfile = () => {
  const { user, setUser } = useUser();
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('http://localhost:4040/api/v1/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data);
        setUser(response.data.data);
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
  }, [setUser]);



  const handleSaveSettings = async (e) => {
    e.preventDefault();

    const userToken = JSON.parse(localStorage.getItem('user'));
    const { token } = userToken;

    const formData = new FormData();
    formData.append('firstname', user.firstname);
    formData.append('lastname', user.lastname);
    formData.append('email', user.email);
    if (user.photo instanceof Blob) {
      formData.append('photo', user.photo);
    }

    try {
      const response = await axios.patch('http://localhost:4040/api/v1/users/updateMe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setUser(response.data.data);
      showAlert('Success', 'User info updated successfully!');
    } catch (err) {
      console.error('Error updating user settings:', err);
      showAlert('error', 'Error updating settings. Please try again.');
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      try {
        const userToken = JSON.parse(localStorage.getItem('user'));
        const { token } = userToken;

        const response = await axios.patch(`http://localhost:4040/api/v1/users/updatePassword/${user._id}`, {
          currentPassword: passwordCurrent,
          password,
          passwordConfirm,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Password updated:', response.data);
        showAlert('Success', 'Password updated successfully!');
      } catch (err) {
        console.error('Error updating password:', err);
        alert(err.response?.data?.message || 'Error updating password');
      }
    } else {
      alert('Passwords do not match!');
    }
  };

  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div>

      <div className={styles.userprofile_info}>
      <div className={styles.left}>
      <img src = 'images/summa.png' width={270}/>
      <h1> Welcome Back,  </h1>
      <p> {user.firstname}</p>
      
        <button onClick={handleBack} className={styles.back_btn}>Back</button>
      
      </div>
      
      <div className={styles.right}>
      <div className={styles.form1}>
      <h1> Edit Your Profile </h1>
        <form encType="multipart/form-data" onSubmit={handleSaveSettings}>
          <div className={styles.label}>
            <p> First Name </p>
            <input
            className={styles.info_input}
              type="text"
              placeholder="First Name"
              required
              value={user?.firstname || ''}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
          </div>
          <div className={styles.label}>
          <p> Last Name </p>
            <input
            className={styles.info_input}
              type="text"
              placeholder="Last Name"
              required
              value={user?.lastname || ''}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
          </div>
          <div className={styles.label}>
          <p> Email </p>
            <input
            className={styles.info_input}
              type="email"
              placeholder="Email address"
              required
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
 
          <button  className = {styles.submit_btn} type="submit">Save</button>
        </form>
      </div>

      <div className={styles.form1}>
        <h1 >Password change</h1>
        <form onSubmit={handleSavePassword}>
          <div  className={styles.label} >
          <p> Current </p>
            <input
              className={styles.info_input}
              type="password"
              id="password-current"
              placeholder="Current password"
              required
              minLength="8"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>
          <div  className={styles.label}>
          <p> New </p>
            <input
            className={styles.info_input}
              type="password"
              id="password"
              placeholder="New password"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.label}>
          <p> confirm</p>
            <input
            className={styles.info_input}
              type="password"
              id="password-confirm"
              placeholder="Confirm password"
              required
              minLength="8"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button className = {styles.submit_btn}  type="submit"> Change </button>
        </form>
      </div>
    </div>
    </div>
    </div>
    
  );
};

export default UserProfile;
