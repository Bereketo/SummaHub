import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import PropTypes from "prop-types";
import { toast} from "react-toastify";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-toastify/dist/ReactToastify.css';
import styles from "./header.module.css";
// import CustomToast from "../../../Toast/toast";

const Header = ({ useButtons, theme, setTheme }) => {
  const { user, logout } = useUser();
  const location = useLocation();

  const toggle_mode = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            logout();
            toast.success("You have successfully logged out!");
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className={styles.head_wrapper}>
      <div className={styles.head_container}>
        <div className={`flexCenter ${styles.head_menu}`}>
          <img src="./images/summa.png" alt="logo" width={170} />
          <NavLink
            className={`${styles.link} ${isActive("/") ? styles.active : ""}`}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={`${styles.link} ${
              isActive("/Summary") ? styles.active : ""
            }`}
            to="/Summary"
          >
            Summarize Text
          </NavLink>
          <NavLink
            className={`${styles.link} ${
              isActive("/Question") ? styles.active : ""
            }`}
            to="/Question"
          >
            Generate Question
          </NavLink>
          <NavLink
            className={`${styles.link} ${
              isActive("/Chat") ? styles.active : ""
            }`}
            to="/Chat"
          >
            Chat
          </NavLink>
          <NavLink
            className={`${styles.link} ${
              isActive("/Note") ? styles.active : ""
            }`}
            to="/Note"
          >
            Note
          </NavLink>
        </div>
        <div className={styles.daynight_btn}>
          {/* <img
            onClick={toggle_mode}
            src={theme === "light" ? "/images/moon.png" : "/images/sun.png"}
            alt="Toggle Theme"
          /> */}
        </div>
        {user ? (
          <div className={styles.user_info}>
            <img className={styles.user_photo} src='/images/user.png' alt="User" />
            <NavLink className={styles.user_name} to={user.data.role === 'user' ? "/myprofile" : "/admin"}>
              {user.data.firstname}
            </NavLink>
            <button className={`btn_1 ${styles.logout_btn}`} onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          useButtons && (
            <div className={`buttons ${styles.buttons}`}>
              <button className={`btn_1 ${styles.login_btn}`}>
                <NavLink className={styles.login_link} to="/Login">
                  Login
                </NavLink>
              </button>
              <button className={`btn_2 ${styles.signUp_btn}`}>
                <NavLink className={styles.signup_link} to="/Signup">
                  SignUp
                </NavLink>
              </button>
            </div>
          )
        )}
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

Header.propTypes = {
  useButtons: PropTypes.bool,
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default Header;
