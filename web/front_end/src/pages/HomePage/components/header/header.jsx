import React from "react";
import styles from "./header.module.css";

const Header = ({useButtons}) => {
  return (
    <div className={styles.head_wrapper}>
      <div className={styles.head_container}>
        <img src="./images/logo.png" alt="logo" width={50} />
        <div className={`flexCenter ${styles.head_menu}`}>
          <a href=""> Home </a>
          <a href=""> Summarize / Question </a>
          <a href=""> Note </a>
          <a href=""> About </a>
        </div>
        <div className={styles.daynight_btn}>
        <img src="./images/night-mode.png"/>
        </div>
        
        {useButtons  ? ( 
          
          <>
          <div className={`buttons ${styles.buttons}`}>
          <button className={` btn_1 ${styles.login_btn}`}> Login </button>
          <button className={`btn_2 ${styles.signUp_btn}`}> SignUp </button>
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
    </div>
  );
};

export default Header;
