# EnterpiseGPT
EnterpriseGPT is an open-source web application that provides an easy to use ChatBot web application that organizations can deploy providing access to there user base via there 
OpenAI's GPT-3.5 and GTP-4.0 API Key.

<screen shot here>

It's designed for enterprise IT organizations who wish to utilize the AI model while ensuring their source code isn't submitted for analysis. This is achieved through a custom filtering mechanism within the application.  This feature can be enabled or disabled.  

Organizations can deploy the web app as a docker container, in a servless mode, or as a standard node.js based SPA. See instructions below. 

Additionaly, it can be configured to accept user credentials and authenticate these credentials via multipe authentication mechanisms. 




# Node Setup 

Follow the steps below to run EnterpriseGPT from a Node.js environment

1. Clone the repository
2. Install and run client
   ```bash
   $ cd client
   $ npm install 
   $ npm run dev
3. Install api dependencies
   ```bash
   $ cd api client
   $ npm install
   $ npm run start
4. Open [http://localhost:5173](http://localhost:5173/) in a browser

# Docker Setup

EnterpriseGPT is dockerized for easy deployment and is built using Vite with React and TypeScript for the client and Node.js Express for the API.

## Prerequisites
Make sure you have the following installed on your machine before proceeding:

- Docker Desktop (version 4.11.0 or higher)

## Starting the application
1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
1. Ensure Docker Desktop is running. For Linux, start Docker service with `sudo systemctl start docker` or `sudo service docker start`.
1. Set up Environment Variables: Copy `.env.template` to a new file named `.env` in the same root folder. Update the `.env` file with your values, including the `OPENAI_API_KEY`. 

    > *To obtain the OpenAI API key, please refer to the [OpenAI documentation](https://platform.openai.com/account/api-keys).*
    >
    > *Note: The API runs on port 5001 and the Client on port 3000 by default. If these ports aren't available, specify different ones in `.env` at `API_PORT` and `CLIENT_PORT` respectively.*
1. Install the project dependencies with `npm install`.
1. Start the application with Docker:
    ```bash
    npm run start
    ```
    Check the [package.json](./package.json) for the corresponding Docker command. This command builds the Docker images and starts the Docker containers.
1. To rebuild and refresh Docker containers completely, use:
    ```bash
    npm run start:no-cache
    ```
    Check the [package.json](./package.json) for the corresponding Docker command.
    > **Caution:** This removes all existing containers for this project and any data within them. Backup important data before using. It also turns off docker image caching during the docker build which can be useful for debugging caching issues but also makes the build slower.

Your application should now be running on the ports specified in the `.env` file. By default, the client is at `http://localhost:3000` and the API at `http://localhost:5001`.

## Project Structure & Deployment
Docker manages the application's environment, encapsulating the client and API services for a smooth deployment.

- The API service (Express server) is containerized using a [Dockerfile](./api/Dockerfile) that sets up Node.js, installs required packages, and runs the server.

- The client service uses Vite for a development server. For production, we use a two-stage Docker build defined in the [Dockerfile](./client/Dockerfile). Stage one creates a production build of the React app in a Node.js environment. Stage two uses an NGINX server to serve the build.

This solution optimizes the client service for production robustness and performance. Ports are mapped in the [docker-compose.yml](docker-compose.yml), with the client container on port 3000 which comes from the `.env` file.

API calls from the client use http://api:5001 as the base URL, leveraging Docker compose's default network for inter-container communication.

## Docker / Docker Compose versioning information
This project uses Docker Compose to run multiple containers as a single service. `Docker Desktop` includes `Docker Compose` along with `Docker Engine` and `Docker CLI`, which are Compose prerequisites.

The `docker-compose.yml` file specifies the `version 3.8` of the Compose file format. This is the latest version of the format and provides a number of advantages such as support for secrets, configs, healthchecks, and more.

For more information on the Compose file format versions and compatibility, please refer to the official documentation.

If you encounter any issues with running this project, you may need to update your `Docker Desktop` to the latest version. You can check for updates by selecting "Check for updates" from the Docker menu.

## Node.js Version
This project uses Node.js version 14. The application is Dockerized, and the Docker images for both the client and API are built on top of the Node.js Docker image tagged with 14, which comes pre-installed with this Node.js version.

When you run the Dockerized application using Docker or Docker Compose, you do not need to worry about installing Node.js on your host system. Docker ensures that the Node.js version inside the running containers is 18.16.0, providing a consistent environment that's isolated from your host system.

## Custom Startup Message for the React Client
In Docker, the standard output (stdout) and standard error (stderr) of a container are crucial for conveying information. However, it can be challenging to provide custom information or messages in the midst of other logs, especially when a container starts.

To handle this for our client service, we've employed a workaround: a bash script `docker_start.sh` that provides a custom startup message. This script starts up the NGINX server, then outputs a custom message after a small delay to ensure NGINX has successfully started.

```bash
#!/bin/bash

# Set the clientPort as the environment variable CLIENT_PORT and if not found uses a default value of 3000
export clientPort=${CLIENT_PORT:-3000}

# Start nginx
nginx -g "daemon off;" &

# Wait for a few seconds to ensure nginx has started successfully
sleep 5

# Echo the message
echo -e "\nReact client is ready! Access it on your browser at http://localhost:${clientPort}\n"

# Keep script running
tail -f /dev/null
```

This script is copied into the Docker container during the build stage and is then executed instead of directly starting NGINX. It allows us to provide a helpful message to the user indicating that the application is ready for use.

Here's how the Dockerfile commands for client look like:
```docker
# Copy the start script
COPY docker_start.sh /docker_start.sh

# Give permissions to execute the script
RUN chmod +x /docker_start.sh

# Run the start script
CMD ["/docker_start.sh"]
```

This approach helps to provide a pleasant user experience, providing useful information right when the application starts, while demonstrating a common pattern for customizing startup behavior in Docker containers.

## Flow of Calls within the Docker setup

> **Note:** The following steps outline the flow of calls within the Docker setup using `localhost` as the host example and the `createChatCompletion` API endpoint as the endpoint example.

The following steps outline the flow of calls within the Docker setup:

1. The user opens a web browser and navigates to `http://localhost:3000` on their host machine.
2. The request is sent to the client container running the React application.
3. Nginx, running inside the client container, receives the HTTP GET request on port 80. It serves the static files (HTML, JavaScript, CSS) from the `/usr/share/nginx/html` directory, which includes the React application.
4. The React application is loaded in the user's browser. It provides a user interface for interacting with the application.
5. The user enters a chat prompt and clicks the **"Send Message"** button.
6. The React application makes an HTTP POST request to `http://localhost:3000/api/createChatCompletion` using the `axios` library. This request is made to the same host and port (3000) as the client application.
7. Nginx, running inside the client container, receives the HTTP POST request on port 80. It matches the request URL against the configured `location` blocks in the `default.conf` file.
8. Nginx identifies that the request URL starts with `/api` based on the `location /api` block in the `default.conf` file.
9. Nginx rewrites the URL from `http://localhost:3000/api/createChatCompletion` to `/createChatCompletion` (removing the `/api` prefix) using the `rewrite` directive.
10. Nginx proxies the request to the API server at `http://api:5001/createChatCompletion` using the `proxy_pass` directive. This means Nginx forwards the request to the API container on port 5001.
11. The API container, running the Node.js application, receives the request on port 5001 and processes it based on your API implementation. It performs the necessary actions and generates a response.
12. The API container sends the response back to Nginx on port 5001.
13. Nginx receives the response from the API container.
14. Nginx sends the response back to the React application running in the user's browser.
15. The React application updates the user interface with the received response, and the user sees the result of their request displayed on the page.

This flow allows communication between the client container, the API container, and the user's browser through the use of Nginx as a reverse proxy. Nginx handles the routing of requests and acts as an intermediary between the client and API containers, enabling seamless interaction between the different components of your application.

## Contributing
Created and maintained by Keyhole Software on [github](https://github.com/in-the-keyhole).

## License
Refer to the [LICENSE](./LICENSE) document.
