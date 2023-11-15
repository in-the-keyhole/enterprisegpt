// codeDetection.js

const codeRegex = new RegExp([
    /;$/.source,
    /\w+\([^)]*\)/.source,
    /\w+(\.|->)\w+/.source,
    /{[^}]*}/.source,
    /(\/\*|\*\/|\/\/|#)/.source,
    /(\*\*|&&|\|\||<=|>=|==|!=|<<|>>|::|__|\*|\||<|>)/.source,
    /\([^(]*\([^(]*\)/.source,
    /\b(WHILE|ELSE|IF|LOOP|BREAK)\b/.source,
    /\$\w+/.source,
    /\b(SELECT|FROM|WHERE|DISTINCT|IS NOT NULL)\b/.source
  ].join('|'), 'g');
  
  const CODE_MATCH_THRESHOLD = 0.02;
  const SHORT_LINE_THRESHOLD = 0.5;
  const MIN_LINE_COUNT = 3;
  const MAX_LINE_LENGTH = 40;
  
  export const isCodeDetected = (chatPrompt) => {
    const matches = chatPrompt.match(codeRegex) || [];
    const percentageOfCode = matches.length / chatPrompt.length;
  
    let shortLinePercentage = 0;
  
    const lines = chatPrompt.split('\n');
    if (lines.length > MIN_LINE_COUNT && matches.length > 0) {
      const shortLines = lines.filter(line => line.length < MAX_LINE_LENGTH);
      shortLinePercentage = shortLines.length / lines.length;
    }
  
    return percentageOfCode > CODE_MATCH_THRESHOLD || shortLinePercentage > SHORT_LINE_THRESHOLD;
  };
  