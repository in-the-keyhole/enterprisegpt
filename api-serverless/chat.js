import { Configuration, OpenAIApi } from 'openai';
import { isCodeDetected } from './code-detection.js';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const handler = async (event) => {

  const { chatPrompt } = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body);

  const isUserCode = isCodeDetected(chatPrompt);

  if (isUserCode) {
    console.log("Alert: Code is not allowed to be submitted as input."); 
    // If user input is detected as code, handle it accordingly
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: "Code is not allowed to be submitted as input."
        },
        null,
        2
      ),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }

  try {
    const completionResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You: You can format code using triple backticks (\`\`\`).\n\nAssistant: When providing the code response, please include an empty line before the code block and an empty line after it to separate it from the message.\n\nAssistant: To format a bulleted or numbered list, start each item on a new line. For a bulleted list, use a dash (-) or an asterisk (*). For a numbered list, use a number followed by a period (e.g., 1., 2.).`
        },
        {
          role: 'user',
          content: chatPrompt,
        },
      ],
      temperature: 1, // Optional - Defaults to 1,
      top_p: 1, // Optional - Defaults to 1,
      n: 1, // Optional - Defaults to 1,
    });

    const message = completionResponse.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: message
        },
        null,
        2
      ),
      headers: {
        "Content-Type": "application/json"
      }
    };

  } catch (error) {
    console.error('Failed to generate response:', error);

    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          error: error
        },
        null,
        2
      ),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
};



