import { readFile } from 'fs';
import { promisify } from 'util';
import express from 'express';

const app = express();

// Get the backend port from the environment variables
const backendPort = process.env.BACKEND_PORT || 5000;

const readFileAsync = promisify(readFile);

// Define a GET route for the root path
app.get('/', async (request, response) => {
  try {
    const html = await readFileAsync('./home.html', 'utf-8');
    response.send(html);
  } catch (error) {
    console.error('Failed to read home.html:', error);
    response.status(500).send('Sorry, Server Error');
  }
});

app.listen(backendPort, () => 
  console.log(`\n\nNode.js server is now running at http://localhost:${backendPort}\n`)
);
