import React from "react";
import styles from "./hero.module.css";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Link } from "react-router-dom";

export const Hero = () => {

    const [text ] = useTypewriter({
      words: ['WELCOME to SUMMAHUB' , "YOUR BEST TOOL"],
      loop: Infinity,
      typeSpeed:150,
      deleteSpeed: 100,
      delaySpeed:1000,
    });

  return (
    <div className={styles.hero_wrapper}>
      <div
        className={` ${styles.paddings} ${styles.innerWidth} ${styles.hero_container}`}>
        <div className={` ${styles.hero_text} ${styles.paddings}`}>
          <div className={styles.hero_title}>
              {" "}
              {/* <h1>WELCOME to SUMMAHUB</h1> */}
              <h1>{text}</h1>
              <Cursor />
            <h2>
              {" "}
              <strong>AI Powered:</strong> Text Summarizer and Question
              Generator
            </h2>
          </div>
          <div className={styles.hero_descr}>
            <p>
              Your go-to tool for concise text summaries and intelligent
              question generation. Ideal for students, educators, researchers,
              and professionals, enhancing your learning experience.
            </p>
          </div>

          <Link to = '/Summary'>
            <button className={` btn_1 ${styles.getstarted_btn}`}>
              {" "}
              Get Started
            </button>
          </Link>
        </div>
        <div className={styles.hero_pic}>
          <div className={styles.img_container}>

            <img src="./images/front.png" />
          </div>
        </div>
      </div>
    </div>
  );
};                                                                                                                                             
export default Hero;
