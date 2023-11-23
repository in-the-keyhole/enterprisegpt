// Lib Dependencies
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { reaction } from 'mobx';

// Dependencies
import './ChatConsoleMessages.css';
import { useChat } from '../../useChat';
import ChatConsoleMessage from './ChatConsoleMessage';
import ChatConsoleMessagesEmpty from './ChatConsoleMessagesEmpty';

/**
 * Chant console messages handles the display of the chat thread and how the
 * thread should scroll , as well as the empty state for the list.
 *
 * @export
 * @returns {JSX.Element}
 */
const ChatConsoleMessages: React.FC = observer(() => {
    const chatStore = useChat();
    const messagesRef = useRef<HTMLDivElement>(null);
    const session = chatStore.getSession(chatStore.currentSession);

    useEffect(
        () =>
            reaction(
                () => chatStore.currentSession,
                id =>
                    id &&
                    requestAnimationFrame(
                        () =>
                            (messagesRef.current.scrollTop =
                                messagesRef.current.scrollHeight)
                    )
            ),
        [chatStore]
    );
    return (
        <section className="chat-console-messages" ref={messagesRef}>
            <div className="chat-console-messages-scroll">
                {session?.messages.length ? (
                    session?.messages.map(message => (
                        <ChatConsoleMessage
                            key={message.id}
                            message={message}
                        />
                    ))
                ) : (
                    <ChatConsoleMessagesEmpty />
                )}
            </div>
        </section>
    );
});

export default ChatConsoleMessages;
