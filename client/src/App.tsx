import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { isCodeDetected } from './helpers/codeDetection';
import { FormattedMessage, FormattedListMessage } from './components/FormattedMessage';

interface IMessage {
  text: string;
  isUser: boolean;
  isLoading?: boolean;
  isWarning?: boolean; // This property will be true when the message includes source code and is a warning.
}

function App(): JSX.Element {
  const [loading,setLoading] = useState(false);
  const [chatResult, setChatResult] = useState<string>('');
  const [chatInput, setChatInput] = useState<string>('');
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

    setLoading(true);

    // Check if the message includes source code
    if (isCodeDetected(chatPrompt)) {

       setChatResult( 'Source code is restricted.'  );

    //  setMessages((prevMessages) => [
     //   ...prevMessages,
     //   { text: chatPrompt, isUser: true },
     //   { text: 'Source code is restricted.', isUser: false, isWarning: true } // Set isWarning to true
     // ]);

       setChatPrompt(''); // Reset the chat prompt
      return;
    }

    try {
      // Add the user's message to the conversation
      setMessages((prevMessages) => [...prevMessages, { text: chatPrompt, isUser: true }]);

      // Add a loading spinner
      setMessages((prevMessages) => [...prevMessages, { text: 'Loading...', isUser: false, isLoading: true }]);


       
      // Remove the loading spinner and add the AI's response to the conversation
      setMessages((prevMessages) => {
        const updatedMessages = prevMessages;
        updatedMessages.pop();
        updatedMessages.push({ text: chatResult, isUser: false });
        return [...updatedMessages];
      }); 




      // Port 5001 should match the API_PORT in .env file.
      const response = await axios.post('http://localhost:5001/createChatCompletion', {
        chatPrompt: chatPrompt,
      });


      setChatInput( chatPrompt);
      setChatResult( response.data.message );

       // Reset chat prompt
       setChatPrompt('');

       setLoading(false);

    } catch (error) {
      console.error('Failed to generate response:', error);
      setLoading(false);
      setChatResult("Error: "+error);

    }
  };

  // Effect to scroll to the end of the messages list whenever messages change
  React.useEffect(() => {
    if (messagesEndRef.current) {
      // Scroll smoothly to the end of the messages list
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Only re-run the effect if messages changes


 React.useState(   );


  return (
    <React.Fragment>
      <div className="header">
        <h1>ChatGPT: Source Code Restricted</h1>
        <p>Powered by EnterpriseGPT: A secure and intelligent chat assistant.</p>
    

      <div className="content">

        <div className="response-container">
        
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${message.isUser ? 'user-message' : 'response-message'} ${message.isWarning ? 'warning' : ''}`}
            >

              {message.isLoading ? <Spinner /> :  <FormattedListMessage text={message.text} /> }
            </div>
          ))}

          {/* A dummy div at the end of the list with our messagesEndRef ref */}
          <div className="   " ref={messagesEndRef} />


        </div>


       <div className="response-container">
       
            <div className="user-message">

             { <FormattedMessage text={chatInput} />} 
            </div>

            <div className="response-message">

                  {loading ? <Spinner/> : ""} 

                 { chatResult != '' ? <FormattedMessage text={chatResult} /> : ""} 
          </div>


        

       </div>




      </div>

     </div>       

      <div className="footer">
        <div className="input-container">
          <textarea
            id="chatPromptInput"
            placeholder="Enter a detailed message or question. Source code is restricted."
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
