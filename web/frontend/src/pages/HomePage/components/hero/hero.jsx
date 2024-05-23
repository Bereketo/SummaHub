import React from "react";
import styles from "./hero.module.css";

export const Hero = () => {
  return (
    <div className={styles.hero_wrapper}>
      <div className={` ${styles.paddings} ${styles.innerWidth} ${styles.hero_container}`}>
        <div className = {` ${styles.hero_text} ${styles.paddings}`}>
        <div className={styles.hero_title}>
        <h1> SUMMAHUB</h1>
        <h2>  <strong>AI Powered:</strong> Text Summarizer and Question Generator</h2>
        </div>
        <div className= {styles.hero_descr}>
            <p>
            Best tool for helping you Summarize text and generate question with
            note taking functionality
          </p>
        </div>
        <button className = {` btn_1 ${styles.getstarted_btn}`}> Get Started</button>
        
        </div>
        <div className={styles.hero_pic}>
          <div className= {styles.img_container}>
            <img src="./images/front.png" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
