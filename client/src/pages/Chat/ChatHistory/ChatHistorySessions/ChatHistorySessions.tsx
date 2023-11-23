// Dependencies
import { observer } from 'mobx-react-lite';

// Dependencies
import './ChatHistorySessions.css';
import { useChat } from '../../useChat';
import { ChatSession } from '../../chatStoreTypes';
import ChatHistorySession from './ChatHistorySession';
import { Tabs, TabsList, TabTrigger, TabContent } from '@components/Tabs';
import Icon from '@components/Icon/Icon';
import ChatHistorySessionsEmpty from './ChatHistorySessionsEmpty';

/**
 * Chat history sessions handles the display of the users historical chat
 * sessions as well as an additional list of sessions they have book marked.
 *
 * @export
 * @returns {JSX.Element}
 */
const ChatHistorySessions: React.FC = observer(() => {
    const chatStore = useChat();

    return (
        <div className="chat-history-sessions-container">
            <Tabs defaultValue="ALL_CHATS">
                <TabsList>
                    <TabTrigger
                        value="ALL_CHATS"
                        title="View all chat sessions">
                        <Icon type="CHAT" />
                        Chats
                        <span>{chatStore.sessions?.length}</span>
                    </TabTrigger>
                    <TabTrigger
                        value="SAVED_CHATS"
                        title="View saved chat sessions">
                        <Icon type="BOOKMARKS" />
                        Saved
                        <span>{chatStore.bookmarkedSessions?.length}</span>
                    </TabTrigger>
                </TabsList>
                <TabContent value="ALL_CHATS">
                    {chatStore.sessions.length ? (
                        <ol className="chat-history-sessions">
                            {chatStore.sessions.map((session: ChatSession) => (
                                <ChatHistorySession
                                    key={session.id}
                                    session={session}
                                />
                            ))}
                        </ol>
                    ) : (
                        <ChatHistorySessionsEmpty message="No conversations yet! Tap the '+' to begin chatting and connect with others. Your next great conversation is just a message away!" />
                    )}
                </TabContent>
                <TabContent value="SAVED_CHATS">
                    {chatStore.bookmarkedSessions.length ? (
                        <ol className="chat-history-sessions">
                            {chatStore.bookmarkedSessions.map(
                                (session: ChatSession) => (
                                    <ChatHistorySession
                                        key={session.id}
                                        session={session}
                                    />
                                )
                            )}
                        </ol>
                    ) : (
                        <ChatHistorySessionsEmpty message="No saved messages yet! Tap the bookmark to begin saving and organizing important chats. " />
                    )}
                </TabContent>
            </Tabs>
        </div>
    );
});

export default ChatHistorySessions;
