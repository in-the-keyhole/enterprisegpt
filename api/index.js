import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { readFile } from 'fs';
import { promisify } from 'util';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config'


const app = express();
app.use(express.json());

// Get the api port from the environment variables
const apiPort = process.env.API_PORT || 5001;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const readFileAsync = promisify(readFile);

// Allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    const html = await readFileAsync('./home.html', 'utf-8');
    res.send(html);
  } catch (error) {
    console.error('Failed to read home.html:', error);
    res.status(500).send('Sorry, Server Error');
  }
});

app.post('/createChatCompletion', async (req, res) => {
  const { chatPrompt } = req.body;

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

    res.json({ message });
  } catch (error) {
    console.error('Failed to generate response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

app.listen(apiPort, () => 
  console.log(`\n\nNode.js server is now running at http://localhost:${apiPort}\n`)
);