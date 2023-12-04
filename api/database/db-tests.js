import { createTable, insertChatEntry, getAllConversationsForUser } from './db-functions.js';

const conversationIdToCheck = "316016";
const user = "jgreen";

const conversationData = {
    "conversations": [
        {
            "conversationId": "123456789",
            "messages": [
                {
                    "prompt": "Can you provide information about your products?",
                    "reply": "Certainly! Our products include a wide range of electronics, home appliances, and gadgets. Is there a specific product you're interested in?",
                    "timestamp": "2023-12-01T10:15:30Z"
                },
                {
                    "prompt": "Tell me more about your electronics.",
                    "reply": "Our electronics range from smartphones and tablets to smart home devices. What specific information are you looking for?",
                    "timestamp": "2023-12-01T10:17:20Z"
                }
            ]
        },
        {
            "conversationId": "316016",
            "messages": [
                {
                    "prompt": "Can you provide information about your products?",
                    "reply": "Certainly! Our products include a wide range of electronics, home appliances, and gadgets. Is there a specific product you're interested in?",
                    "timestamp": "2023-12-01T10:15:30Z"
                },
                {
                    "prompt": "Tell me more about your electronics.",
                    "reply": "Our electronics range from smartphones and tablets to smart home devices. What specific information are you looking for?",
                    "timestamp": "2023-12-01T10:17:20Z"
                }
            ]
        }
    ]
};

// Check if there are enough command-line arguments
if (process.argv.length < 3) {
    console.error('Usage: node yourScript.js <functionNumber>');
    process.exit(1);
}

const functionNumber = parseInt(process.argv[2], 10);

switch (functionNumber) {
    case 1:
        createTable();
        break;

    case 2:
        insertChatEntry(user, conversationData);
        break;

    case 3:
        getConversationsForUser(user, conversationIdToCheck, (err, exists) => {
            if (err) {
                console.error("Error checking conversation ID existence:", err);
            } else {
                if (exists) {
                    console.log("Conversation ID already exists in the database");
                } else {
                    console.log("Conversation ID [" + conversationIdToCheck + "] does not exist in the database");
                }
            }
        });
        break;
    default:
        console.error('Invalid function number');
        process.exit(1);
}
