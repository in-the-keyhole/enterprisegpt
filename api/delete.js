import { deleteConversationById } from './database/db-functions.js';

export const handler = async (event) => {
    try {
        const { currentUser, sessionId } = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body);

        await deleteConversationById(currentUser, sessionId, compositeConversationId);

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
