import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import { readFile } from 'fs';
import { promisify } from 'util';
import express from 'express';

const app = express();
config();

const apiPort = process.env.API_PORT || 5000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const readFileAsync = promisify(readFile);

app.use(express.json());

app.get('/', async (request, response) => {
  try {
    const html = await readFileAsync('./home.html', 'utf-8');
    response.send(html);
  } catch (error) {
    console.error('Failed to read home.html:', error);
    response.status(500).send('Sorry, Server Error');
  }
});

app.post('/createChatCompletion', async (request, response) => {
  const { chatPrompt } = request.body;
  
  try {
    const completionResponse = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user', // Required
          content: chatPrompt, // Required
        },
      ],
      temperature: 1, // Optional - Defaults to 1,
      top_p: 1, // Optional - Defaults to 1,
      n: 1, // Optional - Defaults to 1,
    });
  
    const message = completionResponse.data.choices[0].message.content;
  
    response.json({ message });
  } catch (error) {
    console.error('Failed to generate response:', error);
    response.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(apiPort, () => {
  console.log(`Node.js server is now running at http://localhost:${apiPort}`);
});








// import { config } from 'dotenv';
// import { Configuration, OpenAIApi } from "openai";
// import { readFile } from 'fs';
// import { promisify } from 'util';
// import express from 'express';

// // Documentation for starting the express app object.
// const app = express();

// // Loads .env file contents into process.env by default.
// config();
// // Get the api port from the environment variables
// const apiPort = process.env.API_PORT || 5000;

// // Creates the OpenAI configuration and passes that into the OpenAIApi object.
// const configuration = new Configuration({
//     // organization: "Andy Link", // Get Keyhole Software Organization ID
//     apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// //  Reads the home.html using readFile and promisify.
// const readFileAsync = promisify(readFile);
// // Define a GET route for the root path.
// app.get('/', async (request, response) => {
//   try {
//     const html = await readFileAsync('./home.html', 'utf-8');
//     response.send(html);
//   } catch (error) {
//     console.error('Failed to read home.html:', error);
//     response.status(500).send('Sorry, Server Error');
//   }
// });

// // Listens on the api port and displays a message in the terminal to open the webpage.
// app.listen(apiPort, () => 
//   console.log(`\n\nNode.js server is now running at http://localhost:${apiPort}\n`)
// );

// // // Reference the documentation here (https://platform.openai.com/docs/api-reference/models/list)
// // openai.listModels().then(response => {
// //   console.log(response.data);
// // });

// // Reference the documentation here (https://platform.openai.com/docs/api-reference/chat/create)
// openai.createChatCompletion({
//   model: 'gpt-3.5-turbo', // Required
//   messages: [
//     { 
//       role: "user", // Required
//       // content: "Hello ChatGPT!", // Required 
//       content: "Is Kansas in the USA?", // Required
//       // content: "What are some of the benefits of coffee?", // Required
//       // content: "Is React or Vue a better client framework?", // Required
//       // name: "Andy Link", // Optional
//     }
//   ],
//   temperature: 1, // Optional - Defaults to 1,
//   top_p: 1, // Optional - Defaults to 1
//   n: 1, // Optional - Defaults to 1
// }).then(response => {
//   console.log(response.data.choices[0].message?.content);
// });

// // // Reference the documentation here (https://platform.openai.com/docs/api-reference/edits/create)
// // openai.createEdit({
// //   model: 'text-davinci-edit-001', // Required, you can use the 'text-davinci-edit-001' or 'code-davinci-edit-001' model with this endpoint
// //   input: 'Whet dey of the wek is it?',
// //   instruction: 'Fix the spelling mistakes', // Required
// //   temperature: 0.2, // Optional - Defaults to 1,
// //   top_p: 1, // Optional - Defaults to 1
// // }).then(response => {
// //   console.log(response.data.choices[0].text);
// // });


// // OLD POST CODE MIGHT STILL USE BELOW

// // // Define a POST route for chat completion
// // app.post('/chatcompletion', async (request, response) => {
// //   try {
// //     // Read the chat prompt from the request body
// //     const chatPrompt = request.body.chatPrompt;

// //     // Make a request to the OpenAI Image Generation API
// //     // Reference the documentation here for Request body information (https://platform.openai.com/docs/api-reference/completions/create)
// //     const openaiResponse = await axios.post('https://api.openai.com/v1/completions', {
// //       model: 'gpt-3.5-turbo', // Required
// //       prompt: chatPrompt, // Optional - Defaults to <|endoftext|>
// //       suffix: null, // Optional - Defaults to null
// //       max_tokens: 16, // Optional - Defaults to 16
// //       temperature: 1, // Optional - Defaults to 1
// //       top_p: 1, // Optional - Defaults to 1
// //       n: 1, // Optional - Defaults to 1
// //       stream: false, // Optional - Defaults to false
// //       logprobs: null, // Optional - Defaults to null
// //       echo: false, // Optional - Defaults to false
// //       stop: null, // Optional - Defaults to null
// //       presence_penalty: 0, // Optional - Defaults to 0
// //       frequency_penalty: 0, // Optional - Defaults to 0
// //       best_of: 1, // Optional - Defaults to 1
// //       logit_bias: null, // Optional - Defaults to null
// //       user: 'Andy Link' // Optional
// //     }, {
// //       headers: {
// //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use the environment variable in the .env file for the API key
// //         'Content-Type': 'application/json',
// //       },
// //     });

// //     // Retrieve the generated image URL from the API response
// //     // const chatResponse = openaiResponse.data.data.find(item => item.url)?.url;
// //     const chatResponse = openaiResponse.data.data.find(item => item).value; // THIS NEEDS UPDATED STILL. DEBUG THE RESPONSE TO SEE WHAT I NEED TO REFERENCE

// //     // Return the generated image URL to the client
// //     response.json({ chatResponse: chatResponse });
// //   } catch (error) {
// //     console.error('Failed to generate response:', error);
// //     if (error.response && error.response.data && error.response.data.error) {
// //       console.error('Error details:', error.response.data.error);
// //     }
// //     response.status(500).send('Sorry, Server Error');
// //   }
// // });
