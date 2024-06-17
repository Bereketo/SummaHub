import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';
import PropTypes from 'prop-types';
import styles from './header.module.css';

const Header = ({ useButtons, theme, setTheme }) => {
  const { user, logout } = useUser();
  // console.log(user.data.role)
  const location = useLocation();

  const toggle_mode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.head_wrapper}>
      <div className={styles.head_container}>
        <img src="./images/summa.png" alt="logo" width={170} />
        <div className={`flexCenter ${styles.head_menu}`}>
          <NavLink className={`${styles.link} ${isActive("/") ? styles.active : ""}`} to="/">Home</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Summary") ? styles.active : ""}`} to="/Summary">Summarize Text</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Question") ? styles.active : ""}`} to="/Question">Generate Question</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Chat") ? styles.active : ""}`} to="/Chat">Chat</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Note") ? styles.active : ""}`} to="/Note">Note</NavLink>
        </div>
        <div className={styles.daynight_btn}>
          <img
            onClick={toggle_mode}
            src={theme === 'light' ? "/images/moon.png" : "/images/sun.png"}
            alt="Toggle Theme"
          />
        </div>
        {user ? (
          <div className={styles.user_info}>
            <button className={`btn_1 ${styles.logout_btn}`} onClick={logout}>Logout</button>
            <img className={styles.user_photo} src='/images/users/default.jpg' alt="User" />
            <NavLink className={styles.user_name} to={user.data.role === 'user' ? "/myprofile" : "/admin"}>
              {user.data.firstname}
            </NavLink>

          </div>
        ) : (
          useButtons && (
            <div className={`buttons ${styles.buttons}`}>
              <button className={`btn_1 ${styles.login_btn}`}>
                <NavLink className={styles.login_link} to="/Login">Login</NavLink>
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  useButtons: PropTypes.bool,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Header;
