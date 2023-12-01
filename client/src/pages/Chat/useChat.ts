// Lib Dependencies
import { useContext } from 'react';

// Dependencies
import ChatStore from './chatStore';
import { ChatContext } from './ChatContext';

/**
 * Hook for accessing the chat state from the ChatContext.
 * 
 * @returns {ChatStore}
 */
export function useChat(): ChatStore {
    const context = useContext(ChatContext);

    if (!context)
        throw new Error('useChat must be used within a ChatProvider');

    return context
}