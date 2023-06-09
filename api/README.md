# EnterpriseGPT Node.js (Express) API

This is the API piece for the EnterpriseGPT application. It is built with Node.js (Express) and serves as the server-side component that interacts with OpenAIs API endpoints.

The API application exposes API endpoints that the [React client application](../client/) utilizes to send requests for chat excluding source code.

## Prerequisites

Before running the API application, make sure you have the following:

- Node.js version 18.16.0 or higher installed on your machine.
- An OpenAI API key. Please refer to the OpenAI documentation on how to obtain an API key.

## Running the whole Application with Docker (API & Client)
In most cases, you'll want to run both the API and client together. The git cloning and Docker commands provided make this process straightforward.

Follow the steps in the [Starting the application](../README.md#starting-the-application) section of the main [README](../README.md).md.

## Independent API Development and Debugging

Running the API application independently from the client can be beneficial for local development or debugging purposes. However, it requires additional setup since it circumvents the Docker environment. Consider whether the need for isolated testing outweighs the effort of this setup before proceeding.

Sure, I can update the API section to match your new requirements:

### Starting the Node.js application

The API is automatically started by the Docker configuration, but it can also be run independently with the following steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
2. Navigate to the `api` directory: `cd api`.
3. Install dependencies with `npm install`.
4. By default, the API runs on port 5000. This default is defined within the API's application code, like so: `const apiPort = process.env.API_PORT || 5000;`.
   
   If port 5000 is not available on your system, you will need to specify a different port. This can be done by updating the default port value in the API's application code.
   
   For example, if you wanted to change the API port to 3001, you would change the line in the API's code to: `const apiPort = process.env.API_PORT || 5001;`.

   > **Important:** If you make changes to the default port settings to run the application independently, ensure these changes are not committed to the git repository. These changes are specific to your local environment and should not affect the Docker configuration or other environments.
5. Start the application with `npm run dev`.

The API server will now be running on port 5000.

*Please remember to remove this local `.env` file from the `api` once you're done with your independent API development to avoid confusion with the Docker setup which uses the root-level `.env` file. Also please be mindful not to commit the changes related to the installation of `dotenv` and the updating of files for environment variables in the `api` folder. These changes are meant for local development and debugging purposes outside the Docker environment and should not be part of the main repository*

*While each piece of the application can run independently, it's generally recommended to run the entire application stack with Docker for most development purposes. This ensures seamless integration, but independently running each component can be useful for isolated debugging or development.*

*To fully leverage the application locally, you'll also need the client running. Follow the [Starting the React application](../client/README.md#starting-the-react-application) steps in the client [README.md](../client/README.md) to get it started.*

*Remember, the `.env` file is included in the `.gitignore` file to prevent accidental commits. Despite this precaution, it's important to stay vigilant and ensure that the file is not inadvertently committed to your version control system. Always double-check your changes before committing to protect your API key.*

## Available Scripts
In the `api` project directory, you can run:

- `npm run dev`
    
    Starts the app in the development mode using Nodemon. The server will start running on http://localhost:5000 and will automatically restart if you make edits to the codebase.

- `npm start`
    
    Starts the app in the production mode. The server will start running on http://localhost:5000.

## Node.js Version
This project uses Node.js version 18.16.0. The application is Dockerized, and the Docker images for both the client and API are built on top of the Node.js Docker image tagged with 18.16.0, which comes pre-installed with this Node.js version.

When you run the Dockerized application using Docker or Docker Compose, you do not need to worry about installing Node.js on your host system. Docker ensures that the Node.js version inside the running containers is 18.16.0, providing a consistent environment that's isolated from your host system.
