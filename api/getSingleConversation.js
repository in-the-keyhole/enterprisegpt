import { getAllConversationsForUser } from './database/db-functions.js';

export const handler = async (event) => {
    try {
        const { currentUser, sessionId } = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body);

        // TODO update to get user from event
        const existingConversations = await getAllConversationsForUser('jgreen');

        // Check if conversations include the provided sessionId as a conversationId
        const filteredConversations = existingConversations.map(conversationGroup =>
            conversationGroup.filter(conversation => conversation.conversationId === sessionId)
        );

        const jsonString = JSON.stringify(filteredConversations, null, 2);

        return {
            statusCode: 200,
            body: jsonString,
        };
    } catch (error) {
        console.error('Error handling request:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};