import React, { useRef } from "react";
import styles from "./header.module.css";
import { NavLink , useLocation } from "react-router-dom";
// import About from "../AboutUs/aboutus";

const Header = ({useButtons, onScrollToBottom }) => {
  const location = useLocation();
  function isActive(to){
    return to === location.pathname
  }


  return (
    
    <div className={styles.head_wrapper}>
      <div className={styles.head_container}>
        <img src="./images/logo.png" alt="logo" width={50} />
        <div className={`flexCenter ${styles.head_menu}`}>
          
          <NavLink className = {`${styles.link} ${isActive("/") ? styles.active : ""} `} to = "/"> Home</NavLink>
          <NavLink className = {`${styles.link} ${isActive("/Summary") ? styles.active : ""} `} to = "/Summary"> Summarize Text</NavLink>
          <NavLink className = {`${styles.link} ${isActive("/Question") ? styles.active : ""} `} to = "/Question"> Generate Question</NavLink>
          <NavLink className = {`${styles.link} ${isActive("/Note") ? styles.active : ""} `} to = "/Note"> Note </NavLink>
          <NavLink onClick = {onScrollToBottom} className = {`${styles.link} ${isActive("/About") ? styles.active : ""} `} > About </NavLink>

        </div>
        <div className={styles.daynight_btn}>
        <img src="./images/night-mode.png"/>
        </div>
        
        {useButtons  ? ( 
          
          <>
          <div className={`buttons ${styles.buttons} `}>
          <button className={` btn_1 ${styles.login_btn}`}> <NavLink className={styles.login_link}  to = "/Login"> Login </NavLink> </button>
          <button className={`btn_2 ${styles.signUp_btn}`}> <NavLink className={styles.signup_link} to = "/Signup"> SignUp </NavLink> </button>
          </div>
          </>):
          (<div className={styles.account}>
            <div className={styles.account_img}> 
             <img src="./images/user.png" />
            </div>
            <div className={styles.account_detail}>
            <h1>Yonas Alemu</h1>
            <p>yonasAlemu@gmail.com</p>
            </div> 
          </div>
            )
          }
        
      </div>
      {/* <div ref={bottomRef}>  /><About</div> */}
    </div>

  );
};



export default Header;
