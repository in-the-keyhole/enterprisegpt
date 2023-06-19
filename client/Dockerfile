## Build stage ##
# Use node version 18.16.0 as build environment.
FROM node:14-alpine AS build
# Set the working directory inside the container to /app.
WORKDIR /app
# Copy package.json and package-lock.json (if available) into the workdir in the Docker container.
COPY package*.json ./
# Install dependencies.
RUN npm install
# Copy all files from your local filesystem into the workdir of the Docker container.
COPY . .
# Run the build script defined in package.json within the Docker container.
RUN npm run build

## Production stage ##
# Start a new build stage using nginx for serving the built app
FROM nginx:1.24.0 AS production
# Copy the built app from the previous stage into nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the nginx default.conf file into nginx's configuration folder
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Copy the start script
COPY docker_start.sh /docker_start.sh
# Give permissions to execute the script
RUN chmod +x /docker_start.sh
# Run the docker_start script.
CMD ["/docker_start.sh"]
