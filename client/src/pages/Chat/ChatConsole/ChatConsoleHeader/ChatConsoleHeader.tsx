// Lib Dependencies
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';

// Dependencies
import './ChatConsoleHeader.css';
import Icon from '@components/Icon';
import Button from '@components/Button';
import { useChat } from '../../useChat';
import truncateString from '@helpers/truncateString';

/**
 * Chat console header handles the display of main chat going on header details,
 * these include: the current chat session title, chat search and more chat
 * actions.
 *
 * @export
 * @returns {JSX.Element}
 */
const ChatConsoleHeader: React.FC = observer(() => {
    const chatStore = useChat();
    const session = chatStore.getSession(chatStore.currentSession);

    const handleSearch = useCallback(
        () => alert('SEARCH CHAT FEATURE COMING SOON'),
        []
    );

    const handleMoreActions = useCallback(
        () => alert('MORE CHAT ACTIONS FEATURE COMING SOON'),
        []
    );

    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 'var(--size-3)',
                paddingInlineStart: 'var(--size-5)'
            }}>
            <h2
                style={{
                    fontSize: 'var(--font-size-4)',
                    textTransform: 'capitalize',
                    whiteSpace: 'nowrap'
                }}>
                {(session && truncateString(session?.messages[0].text)) ||
                    'New Chat'}
            </h2>

            <ul
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 'var(--size-2)',
                    listStyle: 'none'
                }}>
                <li>
                    <Button
                        onClick={handleSearch}
                        type="button"
                        title="Search Within this Thread">
                        <Icon type="SEARCH" />
                    </Button>
                </li>

                <li>
                    <Button
                        onClick={handleMoreActions}
                        type="button"
                        title="View More Thread Actions">
                        <Icon type="MORE" />
                    </Button>
                </li>
            </ul>
        </header>
    );
});

export default ChatConsoleHeader;
