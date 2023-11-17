# Keyhole EnterpriseGPT
EnterpriseGPT is an open-source web application that provides an easy-to-use ChatBot web application that organizations can deploy providing access to their user base via OpenAI's GPT-3.5 and GTP-4.0 API Key.

<screen shot here>

It's designed for enterprise IT organizations who wish to utilize the AI model while ensuring their source code isn't submitted for analysis. This is achieved through a custom filtering mechanism within the application.  This feature can be enabled or disabled.  

Additionally, it can be configured to accept user credentials and authenticate these credentials via multiple authentication mechanisms. 

## Prerequisites
Make sure you have the following installed on your machine before proceeding:

- Docker Desktop (version 4.11.0 or higher)

## Starting the application
1. Clone the repository:
    ```bash
    git clone https://github.com/in-the-keyhole/enterprisegpt
    cd enterprisegpt
    ```
1. Ensure Docker Desktop is running. For Linux, start Docker service with `sudo systemctl start docker` or `sudo service docker start`.
1. Set up Environment Variables: Copy `.env.template` in the `.devcontainer` directory to a new file named `.env` in the same folder. Update the `.env` file with your values, including the `OPENAI_API_KEY` and LDAP credentials. Then Rebuild the Dev Container. 
    > *Note: The API runs on port 5001 and the Client on port 3000 by default. If these ports aren't available, specify different ones in `.env` at `API_PORT` and `CLIENT_PORT` respectively.*
1. Install the project dependencies 
     ```bash
    cd client
    npm install
    ```

     ```bash
    cd api
    npm install
    ```
1. Start the application from the root directory:
    ```bash
    npm run start
    ```

Your application should now be running on the ports specified in the `.env` file. By default, the client is at `http://localhost:3000` and the API at `http://localhost:5001`.

## Node.js Version
This project uses Node.js version 14. 

## Contributing
Created and maintained by Keyhole Software on [github](https://github.com/in-the-keyhole).

## License
Refer to the [LICENSE](./LICENSE) document.
