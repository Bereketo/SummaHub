import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext';
import styles from './header.module.css';

const Header = ({ useButtons }) => {
  const { user, logout } = useUser();
  // console.log('user', user.data);
  const location = useLocation();

  const isActive = (path) => location.pathname === path; // Function to determine if the current path is active


  return (
    <div className={styles.head_wrapper}>
      <div className={styles.head_container}>
        <img src="./images/logo.png" alt="logo" width={50} />
        <div className={`flexCenter ${styles.head_menu}`}>
          <NavLink className={`${styles.link} ${isActive("/") ? styles.active : ""}`} to="/">Home</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Summary") ? styles.active : ""}`} to="/Summary">Summarize Text</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Question") ? styles.active : ""}`} to="/Question">Generate Question</NavLink>
          <NavLink className={`${styles.link} ${isActive("/Note") ? styles.active : ""}`} to="/Note">Note</NavLink>
        </div>
        <div className={styles.daynight_btn}>
          <img src="./images/night-mode.png" alt="night mode toggle" />
        </div>
        {user ? (
          <div className={styles.user_info}>
            <button className={`btn_1 ${styles.logout_btn}`} onClick={logout}>Logout</button>
            <img className={styles.user_photo} src='/images/users/default.jpg' alt="User" />
            <NavLink className={styles.user_name} to="/myprofile">{user.data.firstname}</NavLink>
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

export default Header;
