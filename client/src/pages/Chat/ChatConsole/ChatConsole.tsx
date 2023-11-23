// Dependencies
import './ChatConsole.css';
import ChatConsoleForm from './ChatConsoleForm';
import ChatConsoleHeader from './ChatConsoleHeader';
import ChatConsoleMessages from './ChatConsoleMessages';

/**
 * Chat console is the root component that organizes the chat console header,
 * messages and chat entry form.
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ChatConsole(): JSX.Element {
    return (
        <article className="chat-console-container">
            <ChatConsoleHeader />
            <div className="chat-console-content">
                <ChatConsoleMessages />
                <ChatConsoleForm />
            </div>
        </article>
    );
}
