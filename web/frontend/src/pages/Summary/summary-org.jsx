import React, { useState } from "react";
import styles from "./summary.module.css";
import Header from "../HomePage/components/header/header";
import ReactMarkdown from 'react-markdown';


function Summary({ theme, setTheme }) {

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [format, setFormat] = useState('paragraph');
  const [length, setLength] = useState(50);

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const formatSummaryText = (summary) => {
    return summary.map(text => {
      if (text.includes('user:')) {
        return `**user:**\n\n${text.replace(/user:/i, '').trim()}`;
      } else if (text.includes('model:')) {
        return `**model:**\n\n${text.replace(/model:/i, '').trim()}`;
      }
      return text;
    }).join('\n\n');
  };

  const summarizeText = async () => {
    const summaryPrompt = `Summarize this text in ${format} format and ${length < 33 ? 'short' : length < 66 ? 'medium' : 'long'} length: ${inputText}`;

    const response = await fetch('http://127.0.0.1:5000/Summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: summaryPrompt })
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
      <Header theme={theme} setTheme={setTheme} />
      <div className={styles.summary_wrapper}>
        <h1> ✨Find The Best Summaries Here✨</h1>
        <div className={styles.top_bar}>
          <input
            type="radio"
            id="paragraph"
            value="paragraph"
            checked={format === 'paragraph'}
            onChange={handleFormatChange}
          />
          <em> Paragraph</em>
          <input
            type="radio"
            id="bulletPoint"
            value="bulletPoint"
            checked={format === 'bulletPoint'}
            onChange={handleFormatChange}
          />
          <em> BulletPoint</em>
          <div className={styles.para_range}>
            <em> short </em>
            <input
              type='range'
              id='length'
              min='0'
              max='100'
              value={length}
              onChange={handleLengthChange}
            />
            <em> long</em>
          </div>
        </div>
        <div className={styles.summary_area}>
          <div className={styles.summary_input}>
            <textarea
              className={styles.summinput_textarea} placeholder="Enter or Paste your text here...."
              value={inputText}
              onChange={e => setInputText(e.target.value)}>
            </textarea>
            <p> {inputText.split(' ').length} words </p>
            <button className={styles.summary_btn} onClick={summarizeText}> Summarize </button>
          </div>
          <div className={styles.summary_output}>
            <div className={styles.summoutput_textarea} readOnly>

              <div className={styles.markdown_output}>
                <ReactMarkdown>{outputText}</ReactMarkdown>
              </div>

            </div>

            <p> {outputText.split(' ').length} words </p>
          </div>
        </div>
      </div>
      {/* <hr></hr> */}

      <img />


    </div>
  );
}

export default Summary;
