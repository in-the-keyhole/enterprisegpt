# Refer to the root README.md "Project Structure & Deployment" section if you're curious why this approach was used.

## Build stage ##
# Use node version 18.16.0 as build environment.
FROM node:18.16.0 AS build

# Set the working directory inside the container to /app.
# Any command that is run will now run from within this directory.
WORKDIR /app

# Copy package.json and package-lock.json (if available) into the workdir in the Docker container.
# These files define the Node.js app and its dependencies.
COPY package*.json ./

# Run the npm install command within the Docker container. 
# This will install all dependencies defined in the package.json file.
RUN npm install

# Copy all files from your local filesystem into the workdir of the Docker container. 
# In this case, it would be everything in the current directory (expressed as .) into /app.
COPY . .

# Run the build script defined in package.json within the Docker container.
RUN npm run build

## Production stage ##
# Start a new build stage using nginx for serving the built app
FROM nginx:1.24.0 AS production

# Copy the built app from the previous stage into nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the start script
COPY docker_start.sh /docker_start.sh

# Give permissions to execute the script
RUN chmod +x /docker_start.sh

# Documents that nginx listens on port 80. Purely for documentation doesn't actually effect anything if you update this. 
# In docker-compose.yml we'll port forward 80 to port 3000.
EXPOSE 80

# Run the docker_start script.
CMD ["/docker_start.sh"]
