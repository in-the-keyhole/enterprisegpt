/**
 * Truncate a given string by a word count.
 *
 * @export
 * @param {string} inputString
 * @param {number} [numWords=5]
 * @returns {string}
 */
export default function truncateString(
    inputString: string,
    numWords = 5
): string {
    // Split the input string into an array of words
    const words = inputString.split(/\s+/);

    // Check if the number of words is less than or equal to the specified limit
    if (words.length <= numWords) {
        // If the string has equal or fewer words, return the original string
        return inputString;
    } else {
        // If the string has more words, truncate and add an ellipsis
        const truncatedWords = words.slice(0, numWords);
        return truncatedWords.join(' ') + '...';
    }
}
