# Refer to the root README.md "Project Structure & Deployment" section if you're curious why this approach was used.

## Build stage ##
# Use node version 18.16.0 as build environment.
FROM node:14-alpine AS build

# Set the working directory inside the container to /app.
# Any command that is run will now run from within this directory.
WORKDIR /app

# Copy package.json and package-lock.json (if available) into the workdir in the Docker container.
# These files define the Node.js app and its dependencies.
# The reason why COPY package*.json ./ is needed here before COPY . . is to leverage the Docker layer caching mechanism. Docker builds an image by creating layers 
# for each instruction in the Dockerfile. Each layer is cached and reused if the instruction does not change. This can speed up the build process and save disk space.
# In this case, the RUN npm install instruction depends on the package*.json files, which contain the dependencies for the Node.js app. If these files change, 
# the RUN npm install instruction will be executed again and create a new layer. However, if these files do not change, but some other files in the app directory do, 
# then the RUN npm install instruction will be skipped and use the cached layer.By copying only the package*.json files before running npm install, you can avoid 
# running npm install unnecessarily when other files change. This can save time and bandwidth, especially if you have a lot of dependencies. If you copy all the files 
# before running npm install, then any change in any file will trigger a new npm install, which is inefficient and wasteful.
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

# Run the docker_start script.
CMD ["/docker_start.sh"]
