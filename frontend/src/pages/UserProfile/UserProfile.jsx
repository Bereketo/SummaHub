import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { showAlert } from '../../utils/alert';
import './UserProfile.css';
import axios from 'axios';

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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, photo: URL.createObjectURL(file) });
    }
  };

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
    <div className="user-view__content">
      <div className='btn-back'>
        <button onClick={handleBack}>Back</button>
      </div>

      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account info</h2>
        <form className="form form-user-data" encType="multipart/form-data" onSubmit={handleSaveSettings}>
          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="First Name"
              required
              value={user?.firstname || ''}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            />
          </div>
          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Last Name"
              required
              value={user?.lastname || ''}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            />
          </div>
          <div className="form__group ma-bt-md">
            <input
              type="email"
              className="form__input"
              placeholder="Email address"
              required
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form__group form__photo-upload">
            <img className="form__user-photo" src={user?.photo || '/img/users/default.jpg'} alt="User" />
            <input
              type="file"
              className="form__upload"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo" className="photo">Choose new photo</label>
          </div>
          <button className="btn btn--small btn--green" type="submit">Save settings</button>
        </form>
      </div>

      <div className="line">&nbsp;</div>

      <div className="user-view__form-container-2">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-settings" onSubmit={handleSavePassword}>
          <div className="form__group">
            <input
              type="password"
              id="password-current"
              className="form__input"
              placeholder="Current password"
              required
              minLength="8"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>
          <div className="form__group">
            <input
              type="password"
              id="password"
              className="form__input"
              placeholder="New password"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-lg">
            <input
              type="password"
              id="password-confirm"
              className="form__input"
              placeholder="Confirm password"
              required
              minLength="8"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button className="btn btn--small btn--green btn--save--password" type="submit">Save password</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
