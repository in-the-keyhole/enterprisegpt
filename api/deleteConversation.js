import { getAllConversationsForUser, insertChatEntry } from './database/db-functions.js';
import { removeMessagesByConversationId } from './database/conversation-functions.js';

export const handler = async (event) => {
    try {
        const { currentUser, sessionId } = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body);

        const existingConversations = await getAllConversationsForUser('jgreen');

        const updatedArray = removeMessagesByConversationId(existingConversations, sessionId);

        insertChatEntry('jgreen', updatedArray);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Conversation deleted successfully' }),
        };
    } catch (error) {
        console.error('Error handling request:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
