import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import showdown from 'showdown';
import Spinner from './components/Spinner';
import { isCodeDetected } from './helpers/codeDetection';
import { FormattedMessage, FormattedListMessage, SelectedListMessage } from './components/FormattedMessage';
import { MdAccountCircle, MdExitToApp, MdClearAll, MdCopyAll } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {htmlToText} from 'html-to-text';

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

        const s: string | null = localStorage.getItem("chats");


        if (s) {
            const a: IMessage[] | null = JSON.parse(s);
            if (a) {
                return a;
            }
        }

        return [];
    }


    const clearAll = () => {


        if (confirm("Clear All Prompts?")) {
            setMessages([]);
            save();
        }


    }


    const convertMarkdownToText = ( markdown:string  ) => {
        const converter = new showdown.Converter();
        const text = converter.makeHtml(markdown);
        return text; // This will be the converted plain text
      }; 

    const copy = () => {

        const divContent = document.getElementById("chat-response");
        if (divContent != null) {
         
         const text = htmlToText( divContent.innerHTML );
         navigator.clipboard.writeText( text );
        }


    }


    const remove = () => {


        if (confirm("Delete?")) {    
         messages.splice(selectedIndex, 1);
         save();

         setRefreshKey(refreshKey + 1);
       

         //select(0, messages[0].text, messages[0].response);
        // setMessages(messages);
        // load();
         //setSelectedIndex(0);
        
        }


    }


    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [chatResult, setChatResult] = useState<string>('');
    const [chatInput, setChatInput] = useState<string>('');
    const [chatPrompt, setChatPrompt] = useState<string>('');
    const [messages, setMessages] = useState<IMessage[]>(load());
    const messagesEndRef = React.useRef<HTMLDivElement>(null); // Define a ref for the end of the messages list
    const divref = React.useRef<HTMLDivElement>(null);
    const textAreaEl = React.useRef<HTMLTextAreaElement>(null);
    const [refreshKey, setRefreshKey] = useState(0);


    // const generateKey = (pre: string) => {
    //     return `${pre}_${new Date().getTime()}`;
    // }


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

      //  const element = divref.current;
        const element = document.getElementById( ""+index);
        const ele = element?.getAttribute("id");
        if (ele) {
            setSelectedIndex(index);
            setChatPrompt(messages[index].text);

            textAreaEl.current?.focus();
            textAreaEl.current?.select();


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

            const userInput = chatPrompt.substring(0, 1).toUpperCase() + chatPrompt.substring(1);

            setChatInput(userInput);
            setChatResult("");

            // Port 5001 should match the API_PORT in .env file.
            const response = await axios.post('/api/createChatCompletion', {
                chatPrompt: chatPrompt,
            });


            if (!exists(chatPrompt)) {

                setMessages((prevMessages) => [...prevMessages, { text: userInput, response: response.data.message, isUser: true }]);

                setSelectedIndex(selectedIndex + 1);

            }

            setChatResult(response.data.message);




            // Reset chat prompt
           // setChatPrompt('');

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
    }); // Only re-run the effect if messages changes



    return (
        <React.Fragment>
            <div className="header">

                <div key="refreshKey" className="left">
                    <div className="toolbar">  <div className="tooltip">  <span className="tooltiptext"> Clear All </span> <MdClearAll onClick={() => clearAll()} /> </div>  </div>

                    {messages.map((message, index) => (

                        <div className="response-select">
                            <div
                                ref={divref}
                                id={"" + index}
                                onClick={() => select(index, message.text, message.response)}
                                key={index}
                                className={index == selectedIndex ? 'selected-message' : 'user-message'}>

                                {index == selectedIndex ? <SelectedListMessage text={message.text} remove={() => remove()} copy={()=> copy()} ></SelectedListMessage> : <FormattedListMessage text={message.text} ></FormattedListMessage>}
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

                    <div id="chat-response" className="response-message">
                        <div className="toolbar"> <div className="tooltip">  <span className="tooltiptext"> Copy </span> <MdCopyAll onClick={() => copy()} /> </div>  </div>

                        {loading ? <Spinner /> : ""}

                        {chatResult != '' ? <ReactMarkdown>{chatResult}</ReactMarkdown> : ""}

                    </div>


                    <div className="footer">
                        <div className="input-container">
                            <textarea
                                id="chatPromptInput"
                                placeholder="Enter a detailed message or question. Source code is restricted."
                                rows={1}
                                ref={textAreaEl}
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
