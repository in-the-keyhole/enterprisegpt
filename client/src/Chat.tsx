import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { isCodeDetected } from './helpers/codeDetection';
import { FormattedMessage, FormattedListMessage } from './components/FormattedMessage';
import { MdDelete, MdChatBubbleOutline, MdAccountCircle, MdExitToApp } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import ReactDom from 'react-dom';
import remarkGfm from 'remark-gfm';


interface IMessage {
    text: string;
    response: string;
    isUser: boolean;
    isLoading?: boolean;
    isWarning?: boolean; // This property will be true when the message includes source code and is a warning.
}


function Chat(): JSX.Element {

    const location = useLocation();


    const load = () => {

        let s: string | null = localStorage.getItem("chats");


        if (s) {
            let a: IMessage[] | null = JSON.parse(s);
            if (a) {
                return a;
            }
        }

        return [];
    }


    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [chatResult, setChatResult] = useState<string>('');
    const [chatInput, setChatInput] = useState<string>('');
    const [chatPrompt, setChatPrompt] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>(load());
    const messagesEndRef = React.useRef<HTMLDivElement>(null); // Define a ref for the end of the messages list
    const divref = React.useRef<HTMLDivElement>(null);


    const generateKey = (pre: string) => {
        return `${pre}_${new Date().getTime()}`;
    }


    const exists = (prompt: string) => {

        for (let i = 0; i < messages.length; i++) {

            if (messages[i].text.toUpperCase() === prompt.toUpperCase()) {
                return true;
            }

        }

        return false;
    }


    const select = (index: number, user: string, response: string) => {

        setChatInput(user);
        setChatResult(response);

        const element = divref.current;

        let ele = element?.getAttribute("id");
        console.log("Clicked...." + ele);
        if (ele) {
            setSelectedIndex(index);
        }


    }


    const save = () => {
        localStorage.setItem("chats", JSON.stringify(messages));
    }


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

            setChatResult('Source code is restricted.');
            setChatPrompt(''); // Reset the chat prompt
            return;
        }

        try {

            let userInput = chatPrompt.substring(0,1).toUpperCase()+chatPrompt.substring(1);

            setChatInput(userInput);
            setChatResult("");

            // Port 5001 should match the API_PORT in .env file.
            const response = await axios.post('http://localhost:5001/createChatCompletion', {
                chatPrompt: chatPrompt,
            });


          if (!exists(chatPrompt)) {

            setMessages((prevMessages) => [...prevMessages, { text: userInput, response: response.data.message, isUser: true }]);

            setSelectedIndex(selectedIndex + 1);

          }

            setChatResult(response.data.message);

          


            // Reset chat prompt
            setChatPrompt('');

            setLoading(false);

            save();

        } catch (error) {
            console.error('Failed to generate response:', error);
            setLoading(false);
            setChatResult("Error: " + error);

        }
    };

    // Effect to scroll to the end of the messages list whenever messages change
    React.useEffect(() => {
        if (messagesEndRef.current) {
            // Scroll smoothly to the end of the messages list
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
        save();
    }, [messages]); // Only re-run the effect if messages changes



    return (
        <React.Fragment>
            <div className="header">

                <div className="left">
                    <div className="toolbar"> </div>

                    {messages.map((message, index) => (

                        <div className="response-select">
                            <div
                                ref={divref}
                                id={"" + index}
                                onClick={() => select(index, message.text, message.response)}
                                key={index}
                                className={index == selectedIndex ? 'selected-message' : 'user-message'}>

                                <FormattedListMessage text={message.text} />
                            </div>

                        </div>



                    ))}


                    <div className="user-profile">

                        <div className="profile-message">
                            <MdAccountCircle /> {location.state.userid}
                        </div>
                        <div className="profile-message">
                            <a href="/"> <MdExitToApp />  </a>
                        </div>


                    </div>




                </div>


                <div className="right">


                    <div className="user-message">

                        {<FormattedMessage text={chatInput} />}
                    </div>

                    <div className="response-message">

                        {loading ? <Spinner /> : ""}

                        {chatResult != '' ? <ReactMarkdown>{chatResult}</ReactMarkdown> : ""}

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
                                Ask
                            </button>
                        </div>
                    </div>





                </div>

            </div>


        </React.Fragment>
    );
}

export default Chat;
