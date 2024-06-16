import React, { useState, useRef } from "react";
import styles from "./chat.module.css";
import Header from "../HomePage/components/header/header";
import ReactMarkdown from 'react-markdown';

function Chat({ theme, setTheme }) {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);

  const formatSummaryText = (summary) => {
    const modelResponse = summary.find(text => text.includes('model:'));
    if (modelResponse) {
      return modelResponse.replace(/model:/i, '').trim()
    }
    return '';

  };


  const chatAnything = async () => {
    const prompt = inputText;
    const newMessages = [...messages, { sender: 'user', text: prompt }];
    setMessages(newMessages);
    setInputText('');

    const response = await fetch('http://127.0.0.1:5000/Chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: prompt })
    });

    if (response.ok) {
      const data = await response.json();
      const botMessage = { sender: 'bot', text: formatSummaryText(data.summary) };
      setMessages([...newMessages, botMessage]);
    } else {
      console.error('Error getting response');
      setMessages([...newMessages, { sender: 'bot', text: 'Error getting response' }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents the newline insertion
      chatAnything(); // Calls the function to send the message
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
            <img src="./images/online-chat.png" alt="Person" />
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
              <p> Hi, how can I help you today?</p>
            </div>
            <div className={styles.robotmessage_box} style={{ width: "250px", height: "130px" }}>
              <p>
                Photosynthesis is the process by which plants convert sunlight,
                carbon dioxide, and water into glucose and oxygen.
              </p>
            </div>
          </div>
          <div className={styles.robot_img}>
            <img src="./images/ai.png" alt="Robot" />
          </div>
        </div>
        <div className={styles.chat_space}>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${message.sender === 'user' ? styles.user_message : styles.bot_message}`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            ))}
          </div>
          <div className={styles.chat_input}>
            <textarea
              placeholder="Ask me anything .... "
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => handleKeyPress(e)}
              ref={textareaRef}
              className={styles.input_textarea}
            ></textarea>
            <div className={styles.send_arrow}>
              <button className={styles.send_button} onClick={chatAnything} >
                <img src="./images/send.png" alt="Send" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
