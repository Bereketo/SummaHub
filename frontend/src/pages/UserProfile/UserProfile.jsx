import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import './UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const { user, setUser } = useUser();

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
        console.log(response.data.data)
        setUser(response.data.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        if (err.response && err.response.data.message === 'jwt expired') {
          console.log('JWT expired. Redirecting to login page...');
        } else {
          console.error('Error details:', err.response.data);
        }
      }
    };

    fetchUserData();
  }, [setUser]);

  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handlePhotoChange = (e) => {
    setUser({ ...user, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    console.log('Settings saved:', user);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      // updatePassword(passwordCurrent, password);
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="user-view__content">
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data" encType="multipart/form-data" onSubmit={handleSaveSettings}>
          <div className="form__group">
            <input
              type="text"
              id="name"
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
              id="name"
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
              id="email"
              className="form__input"
              placeholder="Email address"
              required
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form__group form__photo-upload">
            <img className="form__user-photo" src="/images/users/default.jpg" alt="User" />
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
