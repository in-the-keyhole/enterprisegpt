# Start from a base image with Node.js installed. In this case, we're using version 18.16.0 of the official Node.js Docker image.
FROM node:18.16.0 

# Set the working directory in the Docker container to /app. 
# Any command that is run will now run from within this directory.
WORKDIR /app 

# Copy package.json and package-lock.json (if available) into the workdir in the Docker container.
# These files define the Node.js app and its dependencies.
COPY package*.json ./ 

# Run the install script defined in package.json within the Docker container.
# This will install all dependencies defined in the package.json file.
RUN npm install 

# Copy all files from your local filesystem into the workdir of the Docker container. 
# In this case, it would be everything in the current directory (expressed as .) into /app
COPY . . 

# Informs Docker that the container listens on the specified network port at runtime. 
# This does not actually publish the port. It functions as a type of documentation between the person 
# who builds the image and the person who runs the container, about which ports are intended to be published.
EXPOSE 5000 

# The CMD command provides defaults for executing the Docker container. 
# These can include executable, or they can omit the executable, in which case you must specify an ENTRYPOINT command. 
# In this case, it's running the "start" script defined in your package.json.
CMD [ "npm", "run", "start" ]
