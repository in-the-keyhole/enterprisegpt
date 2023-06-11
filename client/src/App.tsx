import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import './App.css';
import ChatCompletion from './ChatCompletion';

function App(): JSX.Element {
  const [chatPrompt, setChatPrompt] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setChatPrompt(value);
  };

  const handleSendMessage = async (): Promise<void> => {
    try {
      // Port 5001 should match the API_PORT in .env file.
      const response = await axios.post('http://api:5001/createChatCompletion', {
        chatPrompt: chatPrompt,
      });

      // Reset chat prompt
      setChatPrompt('');

      // Display the response message
      const responseMessage: string = response.data.message;
      console.log(responseMessage);
    } catch (error) {
      console.error('Failed to generate response:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="header">
        <h1>ChatGPT: Source Code Restricted</h1>
        <p>Powered by EnterpriseGPT: A secure and intelligent chat assistant.</p>
      </div>

      <div className="content">
        <div className="response-container">
          {/* User and response messages will be rendered here */}
          <ChatCompletion message="Sample user message" isUserMessage={true} />
          <ChatCompletion message="Sample response message" isUserMessage={false} />
        </div>
      </div>

      <div className="footer">
        <div className="input-container">
          <textarea
            id="chatPromptInput"
            placeholder="Enter a detailed message or question. Source code not permitted."
            rows={1}
            value={chatPrompt}
            onChange={handleInputChange}
          />
          <button id="sendButton" onClick={handleSendMessage}>
            Send Message
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
