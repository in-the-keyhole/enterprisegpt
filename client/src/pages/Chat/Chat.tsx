// Lib Dependencies
import './Chat.css';
import ChatConsole from './ChatConsole';
import ChatHistory from './ChatHistory';
import { ChatProvider } from './ChatContext';

/**
 * Chat component that makes up the chat sessions and current session the user
 * is currently having. Responsible for providing the chat store context to the
 * entire page of components that make up the chat
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ChatPage(): JSX.Element {
    return (
        <section className="chat-container">
            <ChatProvider>
                <ChatHistory />
                <ChatConsole />
            </ChatProvider>
        </section>
    );
}
