import { useRef, useEffect } from 'react';

/**
 * Component props structure
 *
 * @interface ChatConsoleFormPromptProps
 * @typedef {ChatConsoleFormPromptProps}
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 */
interface ChatConsoleFormPromptProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string;
}

/**
 * Chat console textarea  that grows while a user types more lines.
 * @export
 * @param {ChatConsoleFormPromptProps} param0
 * @param {string} param0.value
 * @param {{}} param0....props
 * @returns {JSX.Element}
 */
export default function ChatConsoleFormPrompt({
    value,
    ...props
}: ChatConsoleFormPromptProps): JSX.Element {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';

            textAreaRef.current.style.height =
                (textAreaRef.current.scrollHeight < 200
                    ? textAreaRef.current.scrollHeight
                    : 200) + 'px';
        }
    }, [value]);

    return (
        <textarea
            ref={textAreaRef}
            value={value}
            rows={1}
            {...props}></textarea>
    );
}
