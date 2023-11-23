// Lib Dependencies
import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';

// Dependencies
import './ChatConsoleMessage.css';
import Markdown from '@components/Markdown';
import Icon from '@/components/Icon';
import { ChatSessionMessage } from '@pages/Chat/chatStoreTypes';
import ChatConsoleMessageActions from './ChatConsoleMessageActions';
import { formatRelativeDateTime } from '@helpers/formatRelativeDateTime';
import DotLoader from '@/components/DotLoader';
import { useChat } from '@pages/Chat/useChat';

/**
 * Chat console messages prop structure
 *
 * @interface ChatConsoleMessagesProps
 * @typedef {ChatConsoleMessagesProps}
 */
interface ChatConsoleMessagesProps {
    message: ChatSessionMessage;
}

/**
 * Intersection observer handler for the message itself to determine if it is
 * or not in view, based on this determination set a CSS custom prop that
 * reflects this so it can transition its visibility.
 *
 * @param {IntersectionObserverEntry[]} entries
 */
function handleClusterInView(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
        const targetElement = entry.target as HTMLDivElement;

        targetElement.style.setProperty(
            '--shown',
            entry.isIntersecting ? '1' : '0'
        );
    }
}

/**
 * Chat console message is a single conversation in a chat that is made up of
 * the senders question and the response to that question. Allows the user to
 * like,dislike and copy.
 *
 * @export
 * @returns {JSX.Element}
 */
const ChatConsoleMessage: React.FC<ChatConsoleMessagesProps> = observer(
    ({ message }) => {
        const chatStore = useChat();
        const clusterRef = useRef<HTMLDivElement>(null);
        const responseMarkdownRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(handleClusterInView);
            observer.observe(clusterRef.current);
            return () => observer.disconnect();
        }, []);

        return (
            <article ref={clusterRef} className="chat-message-cluster">
                <section className="chat-message">
                    <header className="chat-message-header">
                        <span className="chat-message-avatar">
                            <Icon type="PERSON" />
                        </span>

                        <h6 className="chat-message-title">You</h6>

                        <time>
                            {formatRelativeDateTime(message.createdDate)}
                        </time>
                    </header>

                    <div className="chat-message-content">
                        <Markdown source={message.text}></Markdown>
                    </div>
                </section>

                <section className="chat-message chat-message-response">
                    <header className="chat-message-header">
                        <span className="chat-message-avatar">
                            <Icon type="LOGO" />
                        </span>

                        <h6 className="chat-message-title">Response</h6>

                        <time>
                            {formatRelativeDateTime(message.createdDate)}
                        </time>
                    </header>

                    <div
                        ref={responseMarkdownRef}
                        className="chat-message-content">
                        {message.response ? (
                            <Markdown source={message.response}></Markdown>
                        ) : (
                            chatStore.status === 'LOADING' && <DotLoader />
                        )}
                    </div>

                    <ChatConsoleMessageActions
                        sourceRef={responseMarkdownRef}
                    />
                </section>
            </article>
        );
    }
);

export default ChatConsoleMessage;
