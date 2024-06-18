import React from "react";
import styles from "./slider.module.css";
import { Link } from "react-router-dom";

function Slider() {
  return (
    <div className={styles.slide_wrapper}>
    <div className={styles.slide_title}>
    <h1> Optimize Your Text with Summaries: Get Results Like These </h1>
    </div>
  
      <div className={` paddings innerwidth ${styles.demo_slider} `}>
        <div className={styles.textbox_left}>
          <div className={styles.left_text}>
            <h3> Input</h3>
            <p>
              Education is a fundamental pillar of personal and societal
              development, providing individuals with the knowledge, skills, and
              critical thinking necessary to navigate and contribute to the
              world. It fosters intellectual growth, cultural awareness, and
              ethical understanding.
            </p>
          </div>
        </div>
        <div className={styles.the_arrow}>
          <img src="./images/arrow.png" alt=""/>
        </div>
        <div className={styles.textbox_left}>
          <div className={styles.right_text}>
            <h3> Output </h3>
            <p>
              Education equips individuals with knowledge, skills, and critical
              thinking, fostering personal and societal growth, intellectual
              development, cultural awareness, and ethical understanding.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Link to="/Question">
          <button className={`btn_1 ${styles.startnow_btn} `}>
            {" "}
            Start Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Slider;
