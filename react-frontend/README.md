# EnterpriseGPT React Front-end
The front-end application for EnterpriseGPT has been developed using Vite, React, and TypeScript. This provides a robust and high-performance web application interface.

While it's possible to run and debug the front-end application independently, it's generally recommended to use the Docker commands provided in the root README.md, as this approach ensures both the front-end and the back-end are properly set up and integrated.

## Prerequisites

Before running the frontend application, make sure you have the following:

- Node.js version 18.16.0 or higher installed on your machine.

## Running the whole Application with Docker (Back-end & Front-end)
In most cases, you'll want to run both the back-end and front-end together. The git cloning and Docker commands provided make this process straightforward.

Follow the steps in the [Starting the application](../README.md#starting-the-application) section of the main [README](../README.md).md.

## Independent Front-end Development and Debugging
For local development or debugging, the front-end can be run independently from the back-end.

### Starting the React application

The front-end is automatically started by the Docker configuration, but it can also be run independently. Here are the steps to do so:

1. Clone the repository: 
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
2. Navigate to the react-frontend directory: `cd react-frontend`
3. Install dependencies with `npm install`.
4. For running the front-end independently, you'll need to set up a `.env` file in the `react-frontend` directory. You can copy the root-level `.env.template` file and place it in `react-frontend`. This step is only necessary if you intend to run the front-end outside the Docker environment.
5. Update the `.env` file with the `FRONTEND_PORT` setting. You should ensure this port is available for use on your system.
6. Save the changes to the `.env` file.
7. Start the application with `npm start`.

The front-end application will now be running on port 3000. It's possible it starts on another port if you have another process already on port 3000.

*Please remember to remove this local `.env` file from the `react-frontend` once you're done with your independent front-end development to avoid confusion with the Docker setup which uses the root-level `.env` file.</span>*

*While it's possible to run each part of the application independently, we generally recommend running the entire application stack with Docker for most development purposes. This approach ensures seamless integration, though you might find it useful to run components independently for isolated debugging or development.*

*Remember, to fully experience the application locally, the back-end needs to be operational as well. You can start it by following the [Starting the Node.js application](../express-backend/README.md#starting-the-nodejs-application) steps detailed in the express-backend [README.md](../express-backend/README.md).*

## Available Scripts
In the react-frontend project directory, you can run: 

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
This project uses Node.js version 18.16.0. The application is Dockerized, and the Docker images for both the frontend and backend are built on top of the Node.js Docker image tagged with 18.16.0, which comes pre-installed with this Node.js version.

When you run the Dockerized application using Docker or Docker Compose, you do not need to worry about installing Node.js on your host system. Docker ensures that the Node.js version inside the running containers is 18.16.0, providing a consistent environment that's isolated from your host system.

## Custom Startup Message for the React Frontend
In Docker, the standard output (stdout) and standard error (stderr) of a container are crucial for conveying information. However, it can be challenging to provide custom information or messages in the midst of other logs, especially when a container starts.

To handle this for our front-end service, we've employed a workaround: a bash script `docker_start.sh` that provides a custom startup message. This script starts up the NGINX server, then outputs a custom message after a small delay to ensure NGINX has successfully started.

```bash
#!/bin/bash

# Start nginx
nginx -g "daemon off;" &

# Wait for a few seconds to ensure nginx has started successfully
sleep 5

# Echo the message
echo -e "\n\nReact Frontend is ready! Access it on your browser at http://localhost:3000\n\n"

# Keep script running
tail -f /dev/null
```

This script is copied into the Docker container during the build stage and is then executed instead of directly starting NGINX. It allows us to provide a helpful message to the user indicating that the application is ready for use.

Here's how the Dockerfile commands for react-frontend look like:
```docker
# Copy the start script
COPY docker_start.sh /docker_start.sh

# Give permissions to execute the script
RUN chmod +x /docker_start.sh

# Run the start script
CMD ["/docker_start.sh"]
```

This approach helps to provide a pleasant user experience, providing useful information right when the application starts, while demonstrating a common pattern for customizing startup behavior in Docker containers.
