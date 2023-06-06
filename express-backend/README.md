# EnterpriseGPT Node.js (Express) Back-end

This is the backend piece for the EnterpriseGPT application. It is built with Node.js (Express) and serves as the server-side component that interacts with OpenAIs API endpoints.

The backend application exposes API endpoints that the [React front-end application](../react-frontend/) utilizes to send requests for chat excluding source code.

## Prerequisites

Before running the backend application, make sure you have the following:

- Node.js version 18.16.0 or higher installed on your machine.
- An OpenAI API key. Please refer to the OpenAI documentation on how to obtain an API key.

## Running the whole Application with Docker (Back-end & Front-end)
In most cases, you'll want to run both the back-end and front-end together. The git cloning and Docker commands provided make this process straightforward.

Follow the steps in the [Starting the application](../README.md#starting-the-application) section of the main [README](../README.md).md.

## Independent Back-end Development and Debugging
For local development or debugging, the back-end can be run independently from the front-end.

### Starting the Node.js application

The back-end is automatically started by the Docker configuration, but it can also be run independently. Follow these steps to do so:

1. Clone the repository: 
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
2. Navigate to the express-backend directory: `cd express-backend`
3. Install dependencies with `npm install`.
4. For running the back-end independently, you'll need to set up a `.env` file in the `express-backend` directory. You can copy the root-level `.env.template` file and place it in `express-backend`. This step is only necessary if you intend to run the back-end outside the Docker environment. 
5. Update the `.env` file with your [OpenAI API key](https://platform.openai.com/account/api-keys) and adjust the `BACKEND_PORT` setting if needed. Any other environment-specific configurations can also be added to this file.
6. Save the changes to the `.env` file.
7. Start the application with `npm run dev`.

The backend server will start running on port 5000.

*Please remember to remove this local `.env` file from the `express-backend` once you're done with your independent back-end development to avoid confusion with the Docker setup which uses the root-level `.env` file.*

*While each piece of the application can run independently, it's generally recommended to run the entire application stack with Docker for most development purposes. This ensures seamless integration, but independently running each component can be useful for isolated debugging or development.*

*To fully leverage the application locally, you'll also need the front-end running. Follow the [Starting the React application](../react-frontend/README.md#starting-the-react-application) steps in the react-frontend [README.md](../react-frontend/README.md) to get it started.*

*Remember, the `.env` file is included in the `.gitignore` file to prevent accidental commits. Despite this precaution, it's important to stay vigilant and ensure that the file is not inadvertently committed to your version control system. Always double-check your changes before committing to protect your API key.*

## Available Scripts
In the `express-backend` project directory, you can run:

- `npm run dev`
    
    Starts the app in the development mode using Nodemon. The server will start running on http://localhost:5000 and will automatically restart if you make edits to the codebase.

- `npm start`
    
    Starts the app in the production mode. The server will start running on http://localhost:5000.

## Node.js Version
This project uses Node.js version 18.16.0. The application is Dockerized, and the Docker images for both the frontend and backend are built on top of the Node.js Docker image tagged with 18.16.0, which comes pre-installed with this Node.js version.

When you run the Dockerized application using Docker or Docker Compose, you do not need to worry about installing Node.js on your host system. Docker ensures that the Node.js version inside the running containers is 18.16.0, providing a consistent environment that's isolated from your host system.
