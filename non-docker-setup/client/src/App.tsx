import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { isCodeDetected } from './helpers/codeDetection';

interface IMessage {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  isWarning?: boolean; // This property will be true when the message includes source code and is a warning.
}

function App(): JSX.Element {
  const [chatPrompt, setChatPrompt] = useState<string>('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null); // Define a ref for the end of the messages list

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setChatPrompt(value);
  };

  const handleSendMessage = async (): Promise<void> => {
    // If chatPrompt is empty return without sending message
    if (chatPrompt.trim() === '') return;

    // Check if the message includes source code
    if (isCodeDetected(chatPrompt)) {
      setMessages((prevMessages) => [
        ...prevMessages, 
        { text: chatPrompt, isUser: true }, 
        { text: 'Source code is not permitted.', isUser: false, isWarning: true } // Set isWarning to true
      ]);

      setChatPrompt(''); // Reset the chat prompt
      return;
    }

    try {
      // Add the user's message to the conversation
      setMessages((prevMessages) => [...prevMessages, { text: chatPrompt, isUser: true }]);

      // Add a loading spinner
      setMessages((prevMessages) => [...prevMessages, { text: 'Loading...', isUser: false, isLoading: true }]);

      // Port 5001 should match the API_PORT in .env file.
      const response = await axios.post('http://localhost:5001/createChatCompletion', {
        chatPrompt: chatPrompt,
      });

      // Reset chat prompt
      setChatPrompt('');

      // Remove the loading spinner and add the AI's response to the conversation
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages;
        updatedMessages.pop();
        updatedMessages.push({ text: response.data.message, isUser: false });
        return [...updatedMessages];
      });
    } catch (error) {
      console.error('Failed to generate response:', error);
    }
  };

  // Effect to scroll to the end of the messages list whenever messages change
  React.useEffect(() => {
    if (messagesEndRef.current) {
      // Scroll smoothly to the end of the messages list
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Only re-run the effect if messages changes

  return (
    <React.Fragment>
      <div className="header">
        <h1>ChatGPT: Source Code Restricted</h1>
        <p>Powered by EnterpriseGPT: A secure and intelligent chat assistant.</p>
      </div>

      <div className="content">
        <div className="response-container">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${message.isUser ? 'user-message' : 'response-message'} ${message.isWarning ? 'warning' : ''}`}
            >
              {message.isLoading ? <Spinner /> : message.text}
            </div>
          ))}
          {/* A dummy div at the end of the list with our messagesEndRef ref */}
          <div ref={messagesEndRef} />
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
            onKeyDown={async (event) => {
              // Allows the user to send a message with the Enter key. Shift + Enter moves the cursor to the next line.
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                await handleSendMessage();
              }
            }}
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
