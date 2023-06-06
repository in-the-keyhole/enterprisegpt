import { readFile } from 'fs';
import { promisify } from 'util';
import express from 'express';

const app = express();
const port = 5000;

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

app.listen(5000, () => 
  console.log(`Node.js server is now running on port:${port}\n\n`)
)


