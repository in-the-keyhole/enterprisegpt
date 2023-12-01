export const modifyConversations = (conversations, newMessage) => {
    // Check if conversations array exists
    if (!conversations) {
        console.log("Invalid conversations object.");
        return null;
    }

    // Find the index of the conversation with the same conversationId
    const existingConversationIndex = conversations.findIndex(
        (conversation) => conversation.conversationId === newMessage.conversationId
    );

    // If the conversation with the same conversationId exists, add the message
    if (existingConversationIndex !== -1) {
        conversations[existingConversationIndex].messages.push(newMessage);
    } else {
        // If the conversation with the same conversationId doesn't exist, create a new one
        const newConversation = {
            conversationId: newMessage.conversationId,
            messages: [newMessage],
        };
        conversations.push(newConversation);
    }

    return conversations;
};