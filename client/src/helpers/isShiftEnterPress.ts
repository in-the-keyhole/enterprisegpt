/**
 * Checks if the user pressed the "Shift" and "Enter" keys simultaneously.
 *
 * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event.
 * @returns {boolean} - True if the "Shift" and "Enter" keys are pressed simultaneously; otherwise, false.
 *
 * @example
 * // Example usage in a React component's onKeyDown event handler
 * function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
 *   if (isShiftEnterPressed(event)) {
 *     // User pressed Shift + Enter
 *     console.log('Shift + Enter pressed!');
 *     // Add your custom logic here
 *   }
 * }
 */
export default function isShiftEnterPressed(event: React.KeyboardEvent<HTMLInputElement>): boolean {
    return event.key === 'Enter' && event.shiftKey;
}
