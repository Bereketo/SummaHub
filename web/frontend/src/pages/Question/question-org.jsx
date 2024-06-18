import React from "react";
import Header from "../HomePage/components/header/header";
import styles from "./question.module.css";

function Question({theme , setTheme}) {
  return (
    <div>
      <Header useButtons={false} theme = {theme} setTheme = {setTheme} />
      <div className={styles.question_wrapper}>
      <div className={styles.textarea_wrapper}>
        <div className={styles.left_menu}>
          <h1> Difficulty</h1>
          <form className={styles.question_form}>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> Hard</em><br></br>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> Medium</em><br></br>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> Easy</em>
          </form>
          <br></br>
          <h1> Type</h1>
          <form className={styles.question_form}>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> True / False</em><br></br>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> Choose </em><br></br>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> Fill in the blank</em><br></br>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em> Discussion</em><br></br>
            <input type="radio" id="hard" name="fav_language" value="Hard" />
            <em>All</em><br></br>
      
          </form>
        </div>
        <div className={styles.left_textarea}>
        <h1> Text input for question generation</h1>
        <br></br>
          <textarea
            placeholder="Enter your text here ... "
            className={styles.input_textarea}>
          </textarea>
          <button className={styles.generate_btn}> Generate </button>
        </div>
        <div className={styles.right_textarea}>
        <h1> Generated Question from Input</h1>
        <br></br>

          <textarea
            className={styles.output_textarea}
          >
          </textarea>
        </div>
      </div>
    </div>
    </div>
  );
}
export default Question;
