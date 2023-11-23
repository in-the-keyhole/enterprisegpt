// Lib Dependencies
import { observer } from 'mobx-react-lite';
import { computed } from 'mobx';
import { useCallback } from 'react';

// Dependencies
import './ChatHistorySession.css';
import { useChat } from '@pages/Chat/useChat';
import truncateString from '@helpers/truncateString';
import { ChatSession } from '@pages/Chat/chatStoreTypes';
import { formatRelativeDateTime } from '@helpers/formatRelativeDateTime';
import Icon from '@components/Icon';
import Button from '@/components/Button';

interface ChatHistorySessionProps {
    session: ChatSession;
}

/**
 * Display and interaction for a single chat session. Allows the user to view
 * a brief title and summary of the session, as well as deleting and viewing.
 *
 * @type {React.FC<ChatHistorySessionProps>}
 */
const ChatHistorySession: React.FC<ChatHistorySessionProps> = observer(
    ({ session }) => {
        const chatStore = useChat();
        const sessionId = session.id;
        const bookMarked = session.bookmarked;

        // Computed active prop to prevent re-renders due to the current session
        // changing, value no longer needs to re-render unless its output changes
        const active = computed(
            () => chatStore.currentSession === sessionId
        ).get();

        // Load the selected session the user made
        const handleLoadSession = useCallback(
            () => chatStore.updateCurrentSession(sessionId),
            [sessionId, chatStore]
        );

        // Delete and confirm the session the user is trying to delete
        const handleDeleteSession = useCallback(
            () =>
                confirm('Are you sure you want to delete this session?') &&
                chatStore.removeSession(sessionId),
            [chatStore, sessionId]
        );

        // Enable/disable the session bookmark state.
        const handleBookmarkSession = useCallback(
            () => chatStore.toggleSessionBookmark(sessionId),
            [chatStore, sessionId]
        );

        return (
            <li
                className={`chat-history-session-container ${
                    active ? 'active' : ''
                }`}>
                <h6 className="chat-history-session-title">
                    {truncateString(session.messages[0].text || '')}
                </h6>

                <time
                    className="chat-history-session-date"
                    dateTime={session.createdDate.toISOString()}>
                    {formatRelativeDateTime(session.createdDate)}
                </time>

                <p className="chat-history-session-summary">
                    {truncateString(
                        session.messages.map(m => m.text).join(''),
                        15
                    )}
                </p>

                <div className="chat-history-session-actions">
                    <Button
                        type="button"
                        title="Delete sessions"
                        onClick={handleDeleteSession}>
                        <Icon type="DELETE" />
                    </Button>

                    <Button
                        type="button"
                        onClick={handleBookmarkSession}
                        title={
                            bookMarked
                                ? 'Remove from saved sessions'
                                : 'Add to saved sessions'
                        }>
                        <Icon
                            type={bookMarked ? 'REMOVE_BOOKMARKS' : 'BOOKMARKS'}
                        />
                    </Button>
                </div>
                <button
                    className="chat-history-session-selector"
                    onClick={handleLoadSession}>
                    <span>Load selected session</span>
                </button>
            </li>
        );
    }
);

export default ChatHistorySession;
