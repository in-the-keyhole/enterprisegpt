// Dependencies
import './ChatHistory.css';
import ChatHistoryHeader from './ChatHistoryHeader';
import ChatHistorySessions from './ChatHistorySessions';

/**
 * Chat sessions handles the display of the applications historical chat sessions
 * to view and select.
 *
 * @export
 * @returns {JSX.Element}
 */
function ChatHistory(): JSX.Element {
    return (
        <aside className="chat-history-container">
            <ChatHistoryHeader />
            <ChatHistorySessions />
        </aside>
    );
}

export default ChatHistory;
