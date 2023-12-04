import { getAllConversationsForUser } from './database/db-functions.js';

export const handler = async (event) => {
    try {
        const { currentUser } = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body);

        // TODO update to get user from event
        const existingConversations = await getAllConversationsForUser('jgreen');

        const jsonString = JSON.stringify(existingConversations, (key, value) => {
            if (key === 'messages') {
                // Customize the output for the "messages" array
                return value.map(message => {
                    return {
                        timestamp: message.timestamp,
                        prompt: message.prompt,
                        reply: message.reply,
                    };
                });
            }
            return value;
        }, 2);

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
