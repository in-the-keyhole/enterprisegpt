#!/bin/bash

# Start nginx
nginx -g "daemon off;" &

# Wait for a few seconds to ensure nginx has started successfully
sleep 5

# Echo the message
echo -e "\nReact Frontend is ready! Access it on your browser at http://localhost:${FRONTEND_PORT}\n"

# Keep script running
tail -f /dev/null
