// Dependencies
import { useCallback } from 'react';

// Dependencies
import Icon from '@components/Icon';
import Button from '@components/Button';
import './ChatHistoryHeaderNewChat.css';
import { useChat } from '@/pages/Chat/useChat';

/**
 * Chat history new chat action allows the user to interact with to create a
 * brand new chat session.
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ChatHistoryHeaderNewChat(): JSX.Element {
    const chatStore = useChat();

    const handleAddNew = useCallback(
        () => chatStore.clearCurrentSession(),
        [chatStore]
    );

    return (
        <Button
            type="button"
            title="Start a New Chat Session"
            onClick={handleAddNew}>
            <Icon type="ADD" />
        </Button>
    );
}
