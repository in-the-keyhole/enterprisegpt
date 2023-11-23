// Dependencies
import Icon from '@components/Icon';
import './ChatHistorySessionsEmpty.css';

/**
 * Chat history session empty state prop structure
 *
 * @export
 * @interface ChatHistorySessionsEmptyProps
 * @typedef {ChatHistorySessionsEmptyProps}
 */
export interface ChatHistorySessionsEmptyProps {
    title?: string;
    message: string;
}

/**
 * Empty state display for a user having no historical chat sessions.
 *
 * @export
 * @param {ChatHistorySessionsEmptyProps} param0
 * @param {string} [param0.title='Lets Get Started']
 * @param {string} param0.message
 * @returns {JSX.Element}
 */
export default function ChatHistorySessionsEmpty({
    title = 'Lets Get Started',
    message
}: ChatHistorySessionsEmptyProps): JSX.Element {
    return (
        <div className="chat-history-sessions-empty">
            <div className="chat-history-sessions-empty-icon">
                <Icon type="CHATS" />
            </div>
            <h5>{title}</h5>
            <p className="chat-history-sessions-empty-message">{message}</p>
        </div>
    );
}
