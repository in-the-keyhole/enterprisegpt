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

export function removeMessagesByConversationId(array, targetConversationId) {
    // Iterate through the array in reverse to avoid index issues
    for (let i = array.length - 1; i >= 0; i--) {
      const element = array[i];
  
      // Check if the element is an array
      if (Array.isArray(element)) {
        // Recursively call the function for nested arrays
        removeMessagesByConversationId(element, targetConversationId);
  
        // Remove the nested array if it becomes empty after the recursive call
        if (element.length === 0) {
          array.splice(i, 1);
        }
      } else if (element.conversationId === targetConversationId) {
        // Remove the entire element if the conversationId matches the target
        array.splice(i, 1);
      }
    }
  
    // Flatten the array after removing elements
    return array.flat(Infinity);
  }