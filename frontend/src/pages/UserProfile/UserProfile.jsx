import React, { useState } from 'react';
import './UserProfile.css';

const UserProfile = ({ user, setUser, updatePassword }) => {
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handlePhotoChange = (e) => {
    setUser({ ...user, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    // Here we assume the save settings logic would be handled by passing updated user data to a server
    console.log('Settings saved:', user);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      updatePassword(passwordCurrent, password);
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div className="user-view__content">
      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
        <form className="form form-user-data" onSubmit={handleSaveSettings}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">Name</label>
            <input
              type="text"
              id="name"
              className="form__input"
              required
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="form__group ma-bt-md">
            <label htmlFor="email" className="form__label">Email address</label>
            <input
              type="email"
              id="email"
              className="form__input"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form__group form__photo-upload">
            <img className="form__user-photo" src={`/img/users/${user.photo}`} alt="User" />
            <input
              type="file"
              className="form__upload"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo">Choose new photo</label>
          </div>
          <button className="btn btn--small btn--green" type="submit">Save settings</button>
        </form>
      </div>

      <div className="line">&nbsp;</div>

      <div className="user-view__form-container">
        <h2 className="heading-secondary ma-bt-md">Password change</h2>
        <form className="form form-user-settings" onSubmit={handleSavePassword}>
          <div className="form__group">
            <label htmlFor="password-current" className="form__label">Current password</label>
            <input
              type="password"
              id="password-current"
              className="form__input"
              placeholder="••••••••"
              required
              minLength="8"
              value={passwordCurrent}
              onChange={(e) => setPasswordCurrent(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__label">New password</label>
            <input
              type="password"
              id="password"
              className="form__input"
              placeholder="••••••••"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group ma-bt-lg">
            <label htmlFor="password-confirm" className="form__label">Confirm password</label>
            <input
              type="password"
              id="password-confirm"
              className="form__input"
              placeholder="••••••••"
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
