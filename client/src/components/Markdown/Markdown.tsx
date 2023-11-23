// Lib Dependencies
import ReactMarkdown from 'react-markdown';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ColorMode, useColorMode } from '../ColorScheme';

/**
 * Props for the MarkdownRenderer component.
 *
 * @export
 * @interface MarkdownRendererProps
 * @typedef {MarkdownRendererProps}
 */
export interface MarkdownRendererProps {
    source: string;
}

/**
 * A React component for rendering Markdown content with syntax highlighting support.
 * This component uses ReactMarkdown for rendering Markdown and integrates with
 * react-syntax-highlighter for syntax highlighting of code blocks.
 *
 * @export
 * @param {MarkdownRendererProps} param0
 * @param {string} param0.source
 * @returns {JSX.Element}
 */
export default function MarkdownRenderer({
    source
}: MarkdownRendererProps): JSX.Element {
    const { colorMode } = useColorMode();
    const colorModeStyle = colorMode === ColorMode.Dark ? oneDark : oneLight;

    return (
        <ReactMarkdown
            components={{
                code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');

                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={colorModeStyle}
                            PreTag="div"
                            language={match[1]}
                            children={String(children).replace(/\n$/, '')}
                            {...props}
                        />
                    ) : (
                        <code className={className ? className : ''} {...props}>
                            {children}
                        </code>
                    );
                }
            }}>
            {source}
        </ReactMarkdown>
    );
}
