# EnterpriseGPT (Non-Docker Setup)

EnterpriseGPT is an open-source web application that leverages OpenAI's GPT-3.5. It's tailored for enterprise IT organizations aiming to exploit the AI model while ensuring their source code remains private. This is achieved using a custom filtering mechanism embedded within the application.

The application is built with Vite, React, TypeScript (client side), and Node.js Express (server side).

## Prerequisites

Ensure the following is installed on your system:

- Node.js (v14 or higher)
- An OpenAI API key for the API. Please refer to the OpenAI documentation on how to obtain an API key. This key will be inserted into the `.env` file later on.

## Setup and Running the Application

1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt/non-docker-setup
    ```
    To run the API and the client separately, keep two terminal windows open and follow the steps below for each.

    ### API Setup
    1. Ensure you're in the `enterprisegpt/non-docker-setup` directory.
    1. Navigate to the API directory `cd api`.
    1. Setup Environment Variables: Copy `non-docker-setup/.env.template` to a new file named `.env` in the same `non-docker-setup` folder. Update the `.env` with your values, including the `OPENAI_API_KEY`.
        
        > *To obtain the OpenAI API key, please refer to the [OpenAI documentation](https://platform.openai.com/account/api-keys).*
        >
        > *Note: The API runs on port 5001 and the Client on port 3000 by default. If these ports aren't available, specify different ones in `non-docker-setup/.env` at `API_PORT` and `CLIENT_PORT` respectively.*
    1. Install the dependencies with `npm install`.
    1. Start the server with `npm run dev` (nodemon) or `npm run start` (node).

    ### Client Setup
    1. Ensure you're in the `enterprisegpt/non-docker-setup` directory.
    1. Navigate to the client directory `cd client`.
    1. Install the dependencies with `npm install`.
    1. Start the client with `npm run dev` (Vite).
        
        > *By default, the Client runs on port 3000. If port 3000 is not available on your system, you will need to specify a different port. This can be done by updating the `non-docker-setup/client/vite.config.ts` file and the `server port` value*

    The API and Client components of the application should now be running independently. Note that both components must be running concurrently for the application to function properly. You can access them on the ports specified in the `.env` file. By default, if no changes were made in the `.env` file, the client is accessible at `http://localhost:3000` and the API at `http://localhost:5001`.

## Available Scripts

In the `api` directory, you can run: 

- `npm run dev`
  
    Runs the server in the development mode using nodemon.
    Nodemon will automatically restart the application when file changes are detected.

- `npm run start`

    Starts the server in production mode using node.

In the `client` directory, you can run: 

- `npm run dev`

    Runs the app in the development mode.
    Open http://localhost:3000 to view it in the browser.

    The page will reload if you make edits.
    You will also see any lint errors in the console.

- `npm run lint`

    Launches the ESLint tool for identifying and reporting on patterns in TypeScript/JavaScript.
    To fix issues automatically, use npm run lint -- --fix.

- `npm run build`
    
    Compiles the application and then builds the app for production to the dist folder using Vite.
    It correctly bundles React in production mode and optimizes the build for the best performance.

    The build is minified and the filenames include the hashes.
    Your app is ready to be deployed!

- `npm run preview`

    Allows you to preview the production build locally. It serves the files from the dist directory.

## Contributing
EnterpriseGPT is created and maintained by Keyhole Software. Visit the project on [GitHub](https://github.com/in-the-keyhole).

## License
For licensing details, see the [LICENSE](../LICENSE) document.

