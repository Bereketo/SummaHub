import React from "react";
import styles from "./slider.module.css";
import { Link } from "react-router-dom";

function Slider() {
  return (
    <div className={styles.slide_wrapper}>
      <h1> Optimize Your Text with Summaries: Get Results Like These </h1>
      <div  className = {` paddings innerwidth ${styles.demo_slider} `}>
        <div className={styles.textbox_left}>
          <div className={styles.left_text}>
            <h3> Input</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad
            </p>
          </div>
        </div>
        <div className={styles.the_arrow}>
          <img src="./images/arrow.png"/>
        </div>
        <div className={styles.textbox_left}>
          <div className={styles.right_text}>
            <h3> Output </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad
            </p>
          </div>
        </div>
      </div>
      <div>
      <Link to = '/Question'>
      <button  className = {`btn_1 ${styles.startnow_btn} `}>  Start Now</button>
      </Link>
        
      </div>
    </div>
  );
}

export default Slider;
