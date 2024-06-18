import React, { useState } from "react";
import styles from "./chat.module.css";
import Header from "../HomePage/components/header/header";

function Chat({ theme, setTheme }) {

  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

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

  const chatAnything = async () => {
    const prompt = inputText;


    const response = await fetch('http://127.0.0.1:5000/Chat', {
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
      console.error('Error getting response');
      setOutputText('Error getting response');
    }
  };

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <div className={styles.chat_title}>
        <h1> Do you have questions? <strong> Ask me anything</strong></h1>
      </div>

      <div className={styles.chat_wrapper}>

        <div className={styles.info_space}>
          <div className={styles.person_img}>
            <img src="./images/online-chat.png" />
          </div>

          <div className={styles.personmessage_space}>
            <div className={styles.personmessage_box} style={{ width: "70px" }}>
              <p> Hello </p>
            </div>
            <div className={styles.personmessage_box} style={{ width: "250px" }}>
              <p> How does photosynthesis work?</p>
            </div>
          </div>
          <div className={styles.robotmessage_space}>
            <div className={styles.robotmessage_box} style={{ width: "250px" }}>
              <p> Hi , How can I help you today. </p>
            </div>
            <div
              className={styles.robotmessage_box}
              style={{ width: "250px", height: "130px" }}
            >
              <p>
                Photosynthesis is the process by which plants convert sunlight,
                carbon dioxide, and water into glucose and oxygen.{" "}
              </p>
            </div>
          </div>

          <div className={styles.robot_img}>
            <img src="./images/ai.png" />
          </div>
        </div>
        <div className={styles.chat_space}>
          <div className={styles.response_space}>
            <div className={styles.response_placeholder}>
              <div className={styles.chat_pic}>
                <img src="./images/ai-assistant.png" />
              </div>
              <h1> Curious about something? Let's explore!</h1>

            </div>

          </div>
          <div className={styles.chat_input}>
            <textarea
              placeholder="Ask me anything .... "
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            <div className={styles.send_arrow}>
              <button className={styles.send_button} onClick={chatAnything} >
                <img src="./images/send.png" alt="Send" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default Chat;
