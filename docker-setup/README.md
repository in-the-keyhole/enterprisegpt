# EnterpriseGPT (Docker Setup)
EnterpriseGPT is an open-source web application built on top of OpenAI's GPT-3.5. It's designed for enterprise IT organizations who wish to utilize the AI model while ensuring their source code isn't submitted for analysis. This is achieved through a custom filtering mechanism within the application.

EnterpriseGPT is dockerized for easy deployment and is built using Vite with React and TypeScript for the client and Node.js Express for the API.

> ### **IMPORTANT**: Due to an issue with Docker network communication between the API and Client, we recommend using the [non-docker-setup](../non-docker-setup/) for now.
>
> Specifically, the `client` container fails to communicate with the `api` container over the Docker network when calling `http://api:5001/createChatCompletion` (see [App.tsx](../docker-setup/client/src/App.tsx)). As a workaround, we've set up a non-dockerized version of the project available [here](../non-docker-setup/). We hope to resolve this Docker issue soon.


## Prerequisites
Make sure you have the following installed on your machine before proceeding:

- Docker Desktop (version 4.11.0 or higher)

## Starting the application
1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt/docker-setup
    ```
1. Ensure Docker Desktop is running. For Linux, start Docker service with `sudo systemctl start docker` or `sudo service docker start`.
1. Set up Environment Variables: Copy `docker-setup/.env.template` to a new file named `.env` in the same `docker-setup` folder. Update the `.env` file with your values, including the `OPENAI_API_KEY`. 

    > *To obtain the OpenAI API key, please refer to the [OpenAI documentation](https://platform.openai.com/account/api-keys).*
    >
    > *Note: The API runs on port 5001 and the Client on port 3000 by default. If these ports aren't available, specify different ones in `docker-setup/.env` at `API_PORT` and `CLIENT_PORT` respectively.*
1. Install the project dependencies with `npm install`.
1. Start the application with Docker:
    ```bash
    npm run start
    ```
    Check the [package.json](../docker-setup/package.json) for the corresponding Docker command. This command builds the Docker images and starts the Docker containers.
1. To rebuild and refresh Docker containers completely, use:
    ```bash
    npm run start:no-cache
    ```
    Check the [package.json](../docker-setup/package.json) for the corresponding Docker command.
    > **Caution:** This removes all existing containers for this project and any data within them. Backup important data before using. It also turns off docker image caching during the docker build which can be useful for debugging caching issues but also makes the build slower.

Your application should now be running on the ports specified in the `.env` file. By default, the client is at `http://localhost:3000` and the API at `http://localhost:5001`.

## Project Structure & Deployment
Docker manages the application's environment, encapsulating the client and API services for a smooth deployment.

- The API service (Express server) is containerized using a [Dockerfile](../docker-setup/api/Dockerfile) that sets up Node.js, installs required packages, and runs the server.

- The client service uses Vite for a development server. For production, we use a two-stage Docker build defined in the [Dockerfile](../docker-setup/client/Dockerfile). Stage one creates a production build of the React app in a Node.js environment. Stage two uses an NGINX server to serve the build.

This solution optimizes the client service for production robustness and performance. Ports are mapped in the [docker-compose.yml](../docker-setup/docker-compose.yml), with the client container on port 3000 which comes from the `.env` file.

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

## Contributing
Created and maintained by Keyhole Software on [github](https://github.com/in-the-keyhole).

## License
Refer to the [LICENSE](./LICENSE) document.
