import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import Spinner from './components/Spinner';
import { isCodeDetected } from './helpers/codeDetection';
import { FormattedMessage, SelectedListMessage } from './components/FormattedMessage';
import { MdAccountCircle, MdExitToApp, MdClearAll, MdCopyAll, MdAdd } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { htmlToText } from 'html-to-text';
import ListComponent from './components/ListComponent';
import ChatThread from './components/ChatThread';

interface IChat {
    id: string;
    messages: IMessage[];
    user: string;
    datetime: Date;
    isUser: boolean;
    isLoading?: boolean;
    isWarning?: boolean;
    currentIndex: number; // This property will be true when the message includes source code and is a warning.
}

interface IMessage {
    text: string;
    response: string;

}


let currentChat: IChat;

function Chat(): JSX.Element {

    const location = useLocation();


    const load = () => {

        const s: string | null = localStorage.getItem("chats");


        if (s) {
            const a: IChat[] | null = JSON.parse(s);
            if (a) {
                return a;
            }
        }

        return [];
    }


    const isUpVisible = () => {

        if (currentChat == null) {return false}

        return currentChat.currentIndex > 0; 

    }

    const isDownVisible = () => {

        if (currentChat == null) {return false}

        return currentChat.currentIndex < currentChat.messages.length-1; 

    }


    const clearAll = () => {


        if (confirm("Clear All Prompts?")) {
            setChats([]);
            save();
        }


    }

    const copy = () => {

        const divContent = document.getElementById("chat-response");
        if (divContent != null) {

            const text = htmlToText(divContent.innerHTML);
            navigator.clipboard.writeText(text);
        }


    }

    const downClicked = () => {

       currentChat.currentIndex = currentChat.currentIndex + 1;
       save();

       setChatInput(currentChat.messages[currentChat.currentIndex].text);
       setChatResult(currentChat.messages[currentChat.currentIndex].response );
      
        
    }

    const prompts = () => {

        const results: string[] = [];

        if (currentChat != null) {

          currentChat.messages.forEach( (m) => results.push(m.text));  
        
        }

        return results;

    }
    const upClicked = () => {

        currentChat.currentIndex = currentChat.currentIndex - 1;
        save();
        setChatInput(currentChat.messages[currentChat.currentIndex].text);
        setChatResult(currentChat.messages[currentChat.currentIndex].response );


    }

    const newChat = () => {

        setChatPrompt("");
        setChatResult("");
        setChatInput("");
        setSelectedIndex(-1);
        const element = document.getElementById("chatPromptInput");
        element?.focus();

        const id = crypto.randomUUID();
        const d = new Date();
        currentChat = null;

    //    currentChat = { id: id, datetime: d, messages: [], user: location.state.userid, isUser: true };
    //    chats.push(currentChat);


    }


    const remove = () => {


        if (confirm("Delete?")) {
            chats.splice(selectedIndex, 1);
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
    const [chats, setChats] = useState<IChat[]>(load());
    const messagesEndRef = React.useRef<HTMLDivElement>(null); // Define a ref for the end of the messages list
    const divref = React.useRef<HTMLDivElement>(null);
    const textAreaEl = React.useRef<HTMLTextAreaElement>(null);
    const [refreshKey, setRefreshKey] = useState(0);


    const lastMessage = (chatIndex: number) => {

        const n = chats[chatIndex].messages.length;
        return chats[chatIndex].messages[n - 1];

    }

    const select = (index: number, user: string, response: string) => {

        setChatInput(user);
        setChatResult(response);

        const element = document.getElementById("" + index);
        const ele = element?.getAttribute("id");
        if (ele) {
            setSelectedIndex(index);
            setChatPrompt(lastMessage(index).text);

            textAreaEl.current?.focus();
            textAreaEl.current?.select();
            currentChat = chats[index];
       
            setChatInput(currentChat.messages[currentChat.currentIndex].text);
            setChatResult(currentChat.messages[currentChat.currentIndex].response);



        }


    }


    const save = () => {
        localStorage.setItem("chats", JSON.stringify(chats));
    }


    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        const { value } = event.target;
        setChatPrompt(value);
    };

    const handleSendMessage = async (): Promise<void> => {
        // If chatPrompt is empty return without sending message
        if (chatPrompt.trim() === '') return;

        setLoading(true);

        if (currentChat == null) {
            setSelectedIndex(chats.length);
        }

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

            const prompts = [];

            if (currentChat != null) {
             currentChat.messages.forEach( (m) => { prompts.push( m.text ) } );
            }

            prompts.push(chatPrompt);


            // Port 5001 should match the API_PORT in .env file.
            const response = await axios.post('/api/createChatCompletion', {
                chatPrompt: chatPrompt,
                prompts: prompts
            });


            const id = crypto.randomUUID();
            const d = new Date();

            if (currentChat == null) {

                currentChat = { id: id, datetime: d, messages: [], user: location.state.userid, currentIndex: 0, isUser: true };
                chats.push(currentChat);
              

            } else {

                currentChat.currentIndex = currentChat.currentIndex + 1;

            }


            currentChat.messages.push({ text: userInput, response: response.data.message });
         //   setSelectedIndex(selectedIndex + 1);



            // }

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


    load();

    return (
        <React.Fragment>
            <div className="header">

                <div key="refreshKey" className="left">
                    <div className="toolbar">  <div className="tooltip">  <span className="tooltiptext"> Clear All </span> <MdClearAll onClick={() => clearAll()} /> </div>  </div>

                    {chats.map((message, index) => (

                        <div className="response-select">
                            <div
                                ref={divref}
                                id={"" + index}
                                onClick={() => select(index, message.messages[0].text, message.messages[0].response)}
                                key={index}
                                className={index == selectedIndex ? 'selected-message' : 'user-message'}>

                                {index == selectedIndex ? <SelectedListMessage text={ message.messages[message.currentIndex].text  } remove={() => remove()} copy={() => copy()} ></SelectedListMessage> : <ListComponent text={message.messages[message.currentIndex].text} ></ListComponent>}
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


                <div key={refreshKey} className="right">


                    <div className="user-message">

                       <div className="left-toolbar">{<FormattedMessage text={chatInput} />} </div>

                        <div className="right-toolbar"> <ChatThread upVisible={isUpVisible()} downVisible={isDownVisible()} up={upClicked} down={downClicked} prompts={prompts()}   />  </div>

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
                            <div className="tooltip">
                                <span className="tooltiptext"> New </span> <MdAdd onClick={() => newChat()} />
                            </div>
                        </div>
                    </div>





                </div>

            </div>


        </React.Fragment>
    );
}

export default Chat;
