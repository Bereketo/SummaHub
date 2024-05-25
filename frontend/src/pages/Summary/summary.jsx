import React from "react";
import styles from "./summary.module.css";
import Header from "../HomePage/components/header/header";

function Summary() {
  return (
    <div>
     <Header />
    <div className={styles.summary_wrapper}>
      <h1> ✨Find The Best Summaries Here✨</h1>
      <div className={styles.top_bar}>
      <input type="radio" id="hard" value="paragraph" />
            <em> Paragraph</em>
      <input type="radio" id="hard" value="bulletPoint" />
            <em> BulletPoint</em>
      <div className={styles.para_range}>
      <em> short </em>
      <input type='range' id = 'length'  min = '0' max = '100'/>
      <em> long</em>
      </div>
      </div>
      <div className={styles.summary_area}>
        <div className={styles.summary_input}>
        <textarea
            className={styles.summinput_textarea} placeholder="Enter or Paste your text here....">
          </textarea>
          <p> 0 words </p>
          <button className={styles.summary_btn}> Summarize </button>
        </div>
        <div className={styles.summary_output}> 
        <textarea
            className={styles.summoutput_textarea}>
          </textarea>
          <p>  0 words </p>
          </div>
      </div>
      </div>
    </div>
  );
}

export default Summary;
