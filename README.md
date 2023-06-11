# EnterpriseGPT
EnterpriseGPT is an open-source web application built on top of OpenAI's GPT-3.5. It's designed for enterprise IT organizations who wish to utilize the AI model while ensuring their source code isn't submitted for analysis. This is achieved through a custom filtering mechanism within the application.

EnterpriseGPT is dockerized for easy deployment and is built using Vite with React and TypeScript for the client and Node.js Express for the API.

> # **IMPORTANT**: Temporary Testing Setup in Place
>
> Due to a current challenge with the API call from the client container to the API container, we have implemented a temporary measure for testing. A set of files - `index.js`, `home.html`, `package.json`, and `package-lock.json` - have been included in the root directory. We've also included `"express": "^4.18.2"`, `"openai": "^3.2.1"`, `"cors": "^2.8.5"`, `"body-parser": "^1.20.2"`, and `"nodemon": "^2.0.22"` package dependencies in the root package.json. These should also be removed once the container communication is resolved. These package dependencies were only included to make the root `index.js` and `home.html` work temporarily.
>
> These files exist to provide a short-term solution that enables testing of the OpenAI chat completion endpoints, ensuring you can successfully interact with ChatGPT. To utilize this temporary testing environment, proceed with the following steps:
>
> 1. Navigate to the project's root directory.
> 2. Install the necessary dependencies by executing `npm install`.
> 3. Launch the application with `node index.js`.
> 
> Please be aware that this arrangement is temporary. The aforementioned files are intended to be removed from the root directory once the issues with the React and Node.js POST endpoint are resolved. At that time this documentation warning will stay in place.

## Prerequisites
Make sure you have the following installed on your machine before proceeding:

- Docker Desktop (version 4.11.0 or higher)

Docker / Docker Compose versioning information
This project uses Docker Compose to run multiple containers as a single service. `Docker Desktop` includes `Docker Compose` along with `Docker Engine` and `Docker CLI`, which are Compose prerequisites.

The `docker-compose.yml` file specifies the `version 3.8` of the Compose file format. This is the latest version of the format and provides a number of advantages such as support for secrets, configs, healthchecks, and more.

For more information on the Compose file format versions and compatibility, please refer to the official documentation.

If you encounter any issues with running this project, you may need to update your `Docker Desktop` to the latest version. You can check for updates by selecting "Check for updates" from the Docker menu.

## Starting the application
The root level `package.json` file has several scripts to simplify the process of starting the application with Docker.

1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
2. Start Docker Desktop: Before you start the application, ensure Docker Desktop is running. Docker Desktop is an application, so you can start it like any other application on your system. For Linux users, Docker service can be started with `sudo systemctl start docker` or `sudo service docker start`.
3. Setup Environment Variables: Copy the `.env.template` file and create a new file named `.env` in the root of the project. Update this new `.env` file with your specific values.
4. Install the root level project dependencies with `npm install`.
5. Run the application with Docker:
    ```bash
    docker-compose build && docker-compose up
    ```
    The above command will build the Docker images and start the Docker containers.
6. If you want to refresh your Docker containers completely, taking down existing containers, rebuilding the image, and starting the containers again, you can use the following command:
    ```bash
    docker-compose down && docker-compose build --no-cache && docker-compose up
    ```
    > **Caution:** This command will remove all existing containers for this project, along with any data stored within those containers. Use it with caution and make sure you have a backup of any important data.

Your application should now be running. You can access the client and API at the ports you specified in the `.env` file. By default, if you haven't made any changes in the .env file, you can access the client at `http://localhost:3000` and the API `http://localhost:5000`.

## Project Structure & Deployment
This project utilizes Docker to create and manage the application's environment. Both the client and API services are dockerized, enabling seamless deployment and scaling.

The API service, an Express server, is straightforward to dockerize: its [Dockerfile](../client/Dockerfile) simply sets up a Node.js environment, installs the necessary packages, and starts the server.

The client service, however, requires a slightly different approach due to its use of Vite. Vite provides a development server that optimizes module loading for faster feedback during development. However, it's not designed to be a production server.

To work around this, we use a multi-stage Docker build for the client. In this [Dockerfile](../client/Dockerfile) the first stage uses a Node.js environment to create a production-ready build of the React app with Vite. In the second stage, we use an NGINX server to serve this static build.

This approach allows the client service to be effectively dockerized and ensures robustness and performance in production. The [docker-compose.yml](../docker-compose.yml) correctly maps the ports, with the client container mapped to port 3000 on your host machine. 

For API calls from the client to the API, we use http://api:5000 as the base URL. This is because Docker compose creates a default network where containers can reach each other by their service names.

## API documentation
Refer to the `API` [README.md](./api/README.md).

## Client documentation
Refer to the `client` [README.md](./client/README.md).

## Custom Startup Message for the React Client
Refer to the `client` README.md [Custom Startup Message for the React Client](./client/README.md#custom-startup-message-for-the-client)

## Contributing
Created and maintained by Keyhole Software on [github](https://github.com/in-the-keyhole).

## License
Refer to the [LICENSE](./LICENSE) document.
