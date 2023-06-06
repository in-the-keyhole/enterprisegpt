#!/bin/bash

# Start nginx
nginx -g "daemon off;" &

# Wait for a few seconds to ensure nginx has started successfully
sleep 5

# Echo the message
echo -e "\n\nReact Frontend is ready! Access it on your browser at http://localhost:3000\n"

# Keep script running
tail -f /dev/null
