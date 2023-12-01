// Lib Dependencies
import { useState, ReactNode, createContext } from 'react';

// Dependencies
import ChatStore, { createChatStore } from './chatStore';

/**
 * Chat store context
 */
export const ChatContext = createContext<ChatStore | null>(null);

/**
 * Chat providers prop structure.
 *
 * @export
 * @interface ChatProviderProps
 * @typedef {ChatProviderProps}
 */
export interface ChatProviderProps {
    children: ReactNode;
}

/**
 * A provider component that wraps the application with the ChatContext.
 * Allows child component to have access to chat sessions and ability to
 * dispatch actions.
 *
 * @export
 * @param {ChatProviderProps} param0
 * @param {ReactNode} param0.children
 * @returns {JSX.Element}
 */
export function ChatProvider({ children }: ChatProviderProps): JSX.Element {
    const [chatStore] = useState(() => createChatStore());

    return (
        <ChatContext.Provider value={chatStore}>
            {children}
        </ChatContext.Provider>
    );
}
