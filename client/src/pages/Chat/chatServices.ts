// Lib Dependencies
import axios from 'axios';

/**
 * Represents the response format for chat completion.
 *
 * @interface ChatCompletionResponse
 * @property {string} message - The completed chat message.
 */
export interface ChatCompletionResponse {
    message: string;
}

/**
 * Represents the request format for chat completion.
 *
 * @interface ChatCompletionRequest
 * @property {string[]} prompts - List of prompts to guide the chat completion.
 * @property {string} chatPrompt - The main prompt for generating the chat completion.
 */
export interface ChatCompletionRequest {
    prompts: string[];
    chatPrompt: string;
    sessionId: string;
}

/**
 * Creates a chat completion using the provided request.
 *
 * @function createChatCompletion
 * @param {ChatCompletionRequest} request - The request object for chat completion.
 * @returns {Promise<ChatCompletionResponse>} A Promise that resolves to the chat completion response.
 * @throws {Error} If the HTTP request fails or if the response data is not in the expected format.
 */
export function createChatCompletion(
    request: ChatCompletionRequest
): Promise<ChatCompletionResponse> {
    return axios
        .post('/api/createChatCompletion', request)
        .then(response => response.data as ChatCompletionResponse);
}
