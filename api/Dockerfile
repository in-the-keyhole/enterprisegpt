# Start from a base image with Node.js installed. In this case, we're using version 18.16.0 of the official Node.js Docker image.
FROM node:14-alpine

# Set the working directory in the Docker container to /app. 
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

# This will install all dependencies defined in the package.json file.
RUN npm install

# Copy all files from your local filesystem into the workdir of the Docker container. 
# In this case, it would be everything in the current directory (expressed as .) into /app
COPY . . 

# The CMD command provides defaults for executing the Docker container. 
# These can include executable, or they can omit the executable, in which case you must specify an ENTRYPOINT command. 
# In this case, it's running the "start" script defined in your package.json.
CMD [ "npm", "run", "start" ]
