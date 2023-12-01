// Lib Dependencies
import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 * Authorizes a user by sending a POST request to the login API.
 *
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<string>} A Promise that resolves to the authorization messaged.
 * @throws {AxiosError} Throws an AxiosError if the authorization fails.
 */
export function authorizeUser(
    username: string,
    password: string
): Promise<string> {
    const params: URLSearchParams = new URLSearchParams();

    params.append('username', username);
    params.append('password', password);

    return axios
        .post('/api/login', params)
        .then((response: AxiosResponse<string>) => response.data)
        .catch((error: AxiosError) => {
            throw error;
        });
}
