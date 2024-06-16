import React, { useState } from "react";
import Header from "../HomePage/components/header/header";
import styles from "./question.module.css";
import ReactMarkdown from 'react-markdown';


function Question({ theme, setTheme }) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionType, setQuestionType] = useState('');

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const formatSummaryText = (summary) => {
    const modelResponse = summary.find(text => text.includes('model:'));
    if (modelResponse) {
      return modelResponse.replace(/model:/i, '').trim()
    }
    return '';

  };

  const handleGenerate = async () => {
    const prompt = `Generate a ${difficulty.toLowerCase()} difficulty ${questionType.toLowerCase()} questions based on: ${inputText}`;


    const response = await fetch('http://127.0.0.1:5000/Generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: prompt })
    });

    if (response.ok) {
      const data = await response.json();
      setOutputText(formatSummaryText(data.summary));
    } else {
      console.error('Error summarizing text');
      setOutputText('Error summarizing text');
    }
  };

  return (
    <div>
      <Header useButtons={false} theme={theme} setTheme={setTheme} />
      <div className={styles.question_wrapper}>
        <div className={styles.textarea_wrapper}>
          <div className={styles.left_menu}>
            <h1> Difficulty</h1>
            <form className={styles.question_form}>
              <input
                type="radio"
                id="hard"
                name="difficulty"
                value="Hard"
                checked={difficulty === 'Hard'}
                onChange={handleDifficultyChange}
              />
              <em> Hard</em><br></br>
              <input
                type="radio"
                id="medium"
                name="difficulty"
                value="Medium"
                checked={difficulty === 'Medium'}
                onChange={handleDifficultyChange}
              />
              <em> Medium</em><br></br>
              <input
                type="radio"
                id="easy"
                name="difficulty"
                value="Easy"
                checked={difficulty === 'Easy'}
                onChange={handleDifficultyChange}
              />
              <em> Easy</em>
            </form>
            <br></br>
            <h1> Type</h1>
            <form className={styles.question_form}>
              <input
                type="radio"
                id="trueFalse"
                name="questionType"
                value="True/False"
                checked={questionType === 'True/False'}
                onChange={handleQuestionTypeChange}
              />
              <em> True / False</em><br></br>
              <input
                type="radio"
                id="choose"
                name="questionType"
                value="Choose"
                checked={questionType === 'Choose'}
                onChange={handleQuestionTypeChange}
              />
              <em> Choose </em><br></br>
              <input
                type="radio"
                id="fillBlank"
                name="questionType"
                value="Fill in the blank"
                checked={questionType === 'Fill in the blank'}
                onChange={handleQuestionTypeChange}
              />
              <em> Fill in the blank</em><br></br>
              <input
                type="radio"
                id="discussion"
                name="questionType"
                value="Discussion"
                checked={questionType === 'Discussion'}
                onChange={handleQuestionTypeChange}
              />
              <em> Discussion</em><br></br>
              <input
                type="radio"
                id="all"
                name="questionType"
                value="All"
                checked={questionType === 'All'}
                onChange={handleQuestionTypeChange}
              />
              <em> All</em><br></br>
            </form>
          </div>
          <div className={styles.left_textarea}>
            <h1> Text input for question generation</h1>
            <br></br>
            <textarea
              placeholder="Enter your text here ... "
              className={styles.input_textarea}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className={styles.generate_btn} onClick={handleGenerate}> Generate </button>
          </div>
          <div className={styles.right_textarea}>
            <h1> Generated Question from Input</h1>
            <br></br>
            <div className={styles.question_output}>
              <div className={styles.questionoutput_textarea} readOnly>

                <div className={styles.markdown_output}>
                  <ReactMarkdown>{outputText}</ReactMarkdown>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
