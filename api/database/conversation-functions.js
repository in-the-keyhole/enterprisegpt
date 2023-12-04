export const modifyConversations = (conversations, newMessage) => {
    // Check if newMessage is defined and has the expected properties
    if (!newMessage || !newMessage.conversationId || !newMessage.messages || !Array.isArray(newMessage.messages)) {
        console.error("Invalid newMessage object. Unable to process.");
        return conversations;
    }

    // Find the index of the conversation with the same conversationId
    const existingConversationIndex = conversations.findIndex(
        (conversation) => conversation.conversationId === newMessage.conversationId
    );

    // Create a new array to avoid modifying the original conversations array
    const updatedConversations = [...conversations];

    // If the conversation with the same conversationId exists, add the message
    if (existingConversationIndex !== -1) {
        // Create a new object for the existing conversation to avoid mutating it
        const updatedConversation = {
            ...updatedConversations[existingConversationIndex],
            messages: [
                ...updatedConversations[existingConversationIndex].messages,
                ...newMessage.messages,
            ],
        };

        // Update the array with the modified conversation
        updatedConversations[existingConversationIndex] = updatedConversation;
    } else {
        // If the conversation with the same conversationId doesn't exist, create a new one
        const newConversation = {
            conversationId: newMessage.conversationId,
            messages: newMessage.messages, // Keep the message structure
        };

        // Add the new conversation to the array
        updatedConversations.push(newConversation);
    }

    return updatedConversations;
};

export function conversationsChanged(existingConversations, updatedConversations) {
    // Check if the lengths of conversations are different
    return JSON.stringify(existingConversations) !== JSON.stringify(updatedConversations);
}
