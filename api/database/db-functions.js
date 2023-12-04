import pkg from 'aws-sdk';
const { DynamoDB } = pkg;
import AWS from 'aws-sdk';

const documentClient = new DynamoDB.DocumentClient({ region: "us-east-1" });

const dynamoDB = new AWS.DynamoDB({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY

})

const tableName = "enterprise-gpt-chat-history";

export const createTable = () => {
    dynamoDB.createTable({
        AttributeDefinitions: [
            {
                AttributeName: "usr",
                AttributeType: "S",
            }
        ],
        KeySchema: [
            {
                AttributeName: "usr",
                KeyType: "HASH", // Partition key
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
        },
        TableName: tableName,
    })
        .promise()
        .then((data) => console.log("Success!", data))
        .catch(console.error);
}

export const insertChatEntry = async (user, newMessage) => {
    try {
        // Ensure newMessage has the expected structure{
        const params = {
            TableName: tableName,
            Item: {
                'usr': user,
                'conversations': JSON.stringify([newMessage]) // Convert newMessage to a JSON string
            }
        };

        await documentClient.put(params).promise();
        console.log("Insertion successful");
    } catch (error) {
        console.error("Error during insertion", error);
    }
};

export const getAllConversationsForUser = async (usr) => {
    try {
        const response = await documentClient
            .get({
                TableName: tableName,
                Key: {
                    'usr': usr,
                },
                ProjectionExpression: 'conversations', // Include the attribute you want to retrieve
            })
            .promise();

        if (response.Item && response.Item.conversations) {
            const conversations = JSON.parse(response.Item.conversations); // Parse the conversations
            console.log("Conversations found:", conversations);
            return Array.isArray(conversations) ? conversations : [conversations];
        } else {
            console.log("No conversations found for the specified user.");
        }
    } catch (error) {
        console.error(`Failed to fetch data from DynamoDB. Error: ${JSON.stringify(error, null, 2)}`);
        // You can handle the error here or throw it instead of returning an empty array.
    }
};