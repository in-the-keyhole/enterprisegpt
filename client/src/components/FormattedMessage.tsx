import React from "react";

interface FormattedMessageProps {
  text: string;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({ text }) => {
  const codeBlockPattern = '```[^```]*```';              // Code block (``` ... ```)
  const inlineCodePattern = '`[^`]*`';                   // Inline code (` ... `)
  const bulletListItemPattern = '^\\s*[-*]\\s*';         // Bulleted list item (- or *)
  const numberedListItemPattern = '^\\s*\\d+\\.\\s*';    // Numbered list item (e.g., 1., 2., ...)
  
  const regexPattern = new RegExp(
    `(${codeBlockPattern}|${inlineCodePattern}|${bulletListItemPattern}|${numberedListItemPattern})`,
    'gm' //(global, multiline) 
  );  

  const formattedText = text.split(regexPattern)
    .map((segment, index) => {
      if (segment.match(codeBlockPattern)) {
        return (
          <React.Fragment key={index}>
            <pre>
              <code className="code">{segment.slice(3, -3)}</code>
            </pre>
            <br />
          </React.Fragment>
        );
      } else if (segment.match(inlineCodePattern)) {
        return (
          <React.Fragment key={index}>
            {/* Remove backticks (`) before being displayed */}
            <code className="code">{segment.slice(1, -1)}</code>
          </React.Fragment>
        );
      } else if (segment.match(bulletListItemPattern)) {
        return (
          <React.Fragment key={index}>
            <br />
            {segment}
          </React.Fragment>
        );
      } else if (segment.match(numberedListItemPattern)) {
        return (
          <React.Fragment key={index}>
            <br />
            {segment}
          </React.Fragment>
        );
      }

      return segment; // Other text segments remain unchanged
    });

  return <>{formattedText}</>;
}


export const FormattedListMessage: React.FC<FormattedMessageProps> = ({ text }) => {
 

  let formattedText = text.length > 40 ? text.substring(0,40) + "..." : text;


return <>{formattedText}</>;
}
