// Dependencies
import './ChatHistoryHeader.css';
import ChatHistoryHeaderNewChat from './ChatHistoryHeaderNewChat';

/**
 * Display for the chat history header that manages the overall actions a user
 * can take on the chat history.
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ChatHistoryHeader(): JSX.Element {
    return (
        <header className="chat-history-header">
            <h2
                style={{
                    fontSize: 'var(--font-size-4)',
                    whiteSpace: 'nowrap'
                }}>
                Chat Sessions
            </h2>

            <ul
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 'var(--size-2)',
                    listStyle: 'none'
                }}>
                <li>
                    <ChatHistoryHeaderNewChat />
                </li>
            </ul>
        </header>
    );
}
