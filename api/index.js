import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import { readFile } from 'fs';
import { promisify } from 'util';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

import LdapStrategy from 'passport-ldapauth';

import session from 'express-session';


//import 'dotenv/config'
import * as dotenv from "dotenv";
dotenv.config({ path: '.env' });

const app = express();
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


const ensureAuthenticated = (req, res, next) =>{
  
  if (req.user) {
    return next();
  }

  res.redirect('/login');
}



let username = "dpitt";


// Get the api port from the environment variables
const apiPort = process.env.API_PORT || 5001;
const ldapUrl = process.env.LDAP_URL;
const ldapCredentials = process.env.LDAP_CREDENTIALS;

 
let OPTS = {
  server: {
    url: ldapUrl,
    bindDN: 'cn=KeyholeRootUser,cn=Root DNs,cn=config',
    bindCredentials: ldapCredentials,
    searchBase: 'ou=users,dc=keyholesoftware,dc=com',
    searchFilter: '(uid={{username}})'
  }
};
 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const readFileAsync = promisify(readFile);


passport.use(new LdapStrategy(OPTS));


app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});




// Allow cross-origin requests
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Parse incoming requests with URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', passport.authenticate('ldapauth', {session: true }), function(req, res) {
  res.send({status: 'ok'});
});


app.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const html = await readFileAsync('./home.html', 'utf-8');
    res.send(html);
  } catch (error) {
    console.error('Failed to read home.html:', error);
    res.status(500).send('Sorry, Server Error');
  }
});

app.post('/createChatCompletion', ensureAuthenticated,  async (req, res) => {
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
