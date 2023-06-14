// I've added as many scenarios as I can think of. Please add more if you can think of any good additions. Keep in mind adding certain checks can have a lot of false positives and false negatives.
// A good online resource I used was this stack overflow resource. The accepted answer and comments below were helpful (https://softwareengineering.stackexchange.com/questions/87611/simple-method-for-reliably-detecting-code-in-text)
const codeRegex = new RegExp([
  /;$/.source,                              // 1. Semi-colons at the end of a line
  /\w+\([^)]*\)/.source,                    // 2. Parentheses directly following text with or without content inside
  /\w+(\.|->)\w+/.source,                   // 3. A dot or arrow between two words
  /{[^}]*}/.source,                         // 4. Presence of curly braces
  /(\/\*|\*\/|\/\/|#)/.source,              // 5. Presence of "comment" syntax
  /(\*\*|&&|\|\||<=|>=|==|!=|<<|>>|::|__|\*|\||<|>)/.source, // 6. Uncommon characters/operators
  /\([^(]*\([^(]*\)/.source,                // 7. Nested parentheses
  /\b(WHILE|ELSE|IF|LOOP|BREAK)\b/.source,  // 8. Specific all-caps keywords
  /\$\w+/.source,                           // 9. Usage of $ before non numeric words
  /\b(SELECT|FROM|WHERE|DISTINCT|IS NOT NULL)\b/.source // 10. SQL-like syntax
].join('|'), 'g'); // Combine all patterns using OR ('|')

// Configuration constants
const CODE_MATCH_THRESHOLD = 0.02; // Threshold for percentage of text that matches code-like patterns. Above this value, the message will be rejected.
const SHORT_LINE_THRESHOLD = 0.5; // Threshold for percentage of lines that are shorter than MAX_LINE_LENGTH. Above this value, the message will be rejected.
const MIN_LINE_COUNT = 3; // Minimum number of lines in a message to consider the short line check. Short line check is skipped if the number of lines in a message is below this value.
const MAX_LINE_LENGTH = 40; // Maximum length of a line to consider it short. If a line's length is below this value, it is considered short.

export const isCodeDetected = (chatPrompt: string): boolean => {
  const matches = chatPrompt.match(codeRegex) || [];
  const percentageOfCode = matches.length / chatPrompt.length;
  
  let shortLinePercentage = 0;
  
  // Check for short line length only if there are some matches and more than MIN_LINE_COUNT lines.
  const lines = chatPrompt.split('\n');
  if (lines.length > MIN_LINE_COUNT && matches.length > 0) {
    const shortLines = lines.filter(line => line.length < MAX_LINE_LENGTH);
    shortLinePercentage = shortLines.length / lines.length;
  }
  
  return percentageOfCode > CODE_MATCH_THRESHOLD && shortLinePercentage > SHORT_LINE_THRESHOLD;
}
