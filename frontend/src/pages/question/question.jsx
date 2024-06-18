import React from "react";
import Header from "../HomePage/components/header/header";
import styles from "./question.module.css";

function Question({theme , setTheme}) {
  return (
    <div>
      <Header useButtons={true} theme = {theme} setTheme = {setTheme}  />
      <div>
        <div className={styles.quepage_title}>
        <img src="images/bulb.png" width={50}/>
          <h1> Enhance Your Study Effectiveness with More <strong>Questions</strong></h1>
        </div>

        <div className={styles.textarea_wrapper}>
          <div className={styles.left_menu}>
            <h1> Difficulty</h1>
            <form>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> Hard</em>
              <br></br>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> Medium</em>
              <br></br>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> Easy</em>
            </form>
            <br></br>
            <h1> Type</h1>
            <form>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> True / False</em>
              <br></br>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> Choose </em>
              <br></br>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> Fill in the blank</em>
              <br></br>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em> Discussion</em>
              <br></br>
              <input type="radio" id="hard" name="fav_language" value="Hard" />
              <em>All</em>
              <br></br>
            </form>
          </div>

          <div className={styles.left_textarea}>
            <h1> Text input</h1>
            
            {/* <br></br> */}
            <textarea
              placeholder="Enter your text here ... "
              className={styles.input_textarea}
            ></textarea>
            <button className={styles.generate_btn}> Generate </button>
          </div>
          <div className={styles.right_textarea}>
            <h1> Generated Question</h1>
            <div className={styles.output_textarea}>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
export default Question;
