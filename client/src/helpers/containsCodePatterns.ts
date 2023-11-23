// Named regex patterns
const endSemicolonPattern = /;$/;
const parenthesesPattern = /\w+\([^)]*\)/;
const dotArrowPattern = /\w+(\.|->)\w+/;
const curlyBracesPattern = /{[^}]*}/;
const commentSyntaxPattern = /(\/\*|\*\/|\/\/|#)/;
const uncommonOperatorsPattern =
    /(\*\*|&&|\|\||<=|>=|==|!=|<<|>>|::|__|\*|\||<|>)/;
const nestedParenthesesPattern = /\([^(]*\([^(]*\)/;
const allCapsKeywordsPattern = /\b(WHILE|ELSE|IF|LOOP|BREAK)\b/;
const dollarSignPattern = /\$\w+/;
const sqlLikeSyntaxPattern = /\b(SELECT|FROM|WHERE|DISTINCT|IS NOT NULL)\b/;

// Combine all patterns using OR ('|')
const codeRegex = new RegExp(
    [
        endSemicolonPattern.source,
        parenthesesPattern.source,
        dotArrowPattern.source,
        curlyBracesPattern.source,
        commentSyntaxPattern.source,
        uncommonOperatorsPattern.source,
        nestedParenthesesPattern.source,
        allCapsKeywordsPattern.source,
        dollarSignPattern.source,
        sqlLikeSyntaxPattern.source
    ].join('|'),
    'g'
);

// Configuration constants
const CONFIG = {
    MIN_LINE_COUNT: 3,
    MAX_LINE_LENGTH: 40,
    CODE_MATCH_THRESHOLD: 0.02,
    SHORT_LINE_THRESHOLD: 0.5
};

/**
 * Checks if the provided text contains code-like patterns.
 *
 * @param chatPrompt The text to be checked.
 * @returns True if code-like patterns are detected, otherwise false.
 */
export default function containsCodePatterns(chatPrompt: string): boolean {
    // Extracted matches using the regex
    const matches = new Set<string>(chatPrompt.match(codeRegex) || []);

    // Calculate percentage of code
    const percentageOfCode: number = matches.size / chatPrompt.length;

    let shortLinePercentage = 0;

    // Check for short line length only if there are some matches and more than MIN_LINE_COUNT lines.
    const lines: string[] = chatPrompt.split('\n');

    if (lines.length > CONFIG.MIN_LINE_COUNT && matches.size > 0) {
        const shortLines: string[] = lines.filter(
            line => line.length < CONFIG.MAX_LINE_LENGTH
        );

        shortLinePercentage = shortLines.length / lines.length;
    }

    return (
        percentageOfCode > CONFIG.CODE_MATCH_THRESHOLD ||
        shortLinePercentage > CONFIG.SHORT_LINE_THRESHOLD
    );
}
