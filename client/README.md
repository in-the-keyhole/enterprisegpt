# EnterpriseGPT React Client
The Client application for EnterpriseGPT has been developed using Vite, React, and TypeScript. This provides a robust and high-performance web application interface.

While it's possible to run and debug the client application independently, it's generally recommended to use the Docker commands provided in the root README.md, as this approach ensures both the client and the API are properly set up and integrated.

## Prerequisites

Before running the client application, make sure you have the following:

- Node.js version 18.16.0 or higher installed on your machine.

## Running the whole Application with Docker (API & Client)
In most cases, you'll want to run both the API and client together. The git cloning and Docker commands provided make this process straightforward.

Follow the steps in the [Starting the application](../README.md#starting-the-application) section of the main [README](../README.md).md.

## Independent Client Development and Debugging

Running the client independently from the API can be useful for local development or debugging purposes. However, it requires additional setup as it circumvents the Docker environment. Consider whether the need for isolated testing outweighs the effort of this setup before proceeding.

### Starting the React application

The client is automatically started by the Docker configuration, but it can also be run independently. Follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
2. Navigate to the `client` directory: `cd client`.
3. Install dependencies with `npm install`.
4. By default, the client application runs on port 3000. This default is defined within the client's application code, like so: `const clientPort = process.env.CLIENT_PORT || 3000;`.
   
   If port 3000 is not available on your system, you will need to specify a different port. This can be done by updating the default port value in the client's application code.
   
   For example, if you wanted to change the client port to 3001, you would change the line in the client's code to: `const clientPort = process.env.CLIENT_PORT || 3001;`.

   > **Important:** If you made changes to the default port settings in order to run the application independently, ensure these changes are not committed to the git repository. These changes are specific to your local environment and should not affect the Docker configuration or other environments.
5. Start the application with `npm start`.

The client application will now be running on port 3000.

*Please remember to remove this local `.env` file from the `client` once you're done with your independent client development to avoid confusion with the Docker setup which uses the root-level `.env` file. Also please be mindful not to commit the changes related to the installation of `dotenv` and the updating of files for environment variables in the `client` folder. These changes are meant for local development and debugging purposes outside the Docker environment and should not be part of the main repository*

*While it's possible to run each part of the application independently, we generally recommend running the entire application stack with Docker for most development purposes. This approach ensures seamless integration, though you might find it useful to run components independently for isolated debugging or development.*

*Remember, to fully experience the application locally, the API needs to be operational as well. You can start it by following the [Starting the Node.js application](../api/README.md#starting-the-nodejs-application) steps detailed in the API [README.md](../api/README.md).*

## Available Scripts
In the client project directory, you can run: 

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

## Node.js Version
This project uses Node.js version 18.16.0. The application is Dockerized, and the Docker images for both the client and API are built on top of the Node.js Docker image tagged with 18.16.0, which comes pre-installed with this Node.js version.

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
