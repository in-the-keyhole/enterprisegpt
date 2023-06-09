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
