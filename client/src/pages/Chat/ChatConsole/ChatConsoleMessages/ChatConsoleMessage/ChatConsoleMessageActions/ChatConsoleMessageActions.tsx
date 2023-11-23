// Lib Dependencies
import { htmlToText } from 'html-to-text';
import { useCallback, RefObject } from 'react';

// Dependencies
import Icon from '@components/Icon';
import Button from '@components/Button';
import './ChatConsoleMessageActions.css';

/**
 * Props for the ChatConsoleMessageActions component.
 *
 * @typedef {Object} ChatConsoleMessageActionsProp
 * @property {RefObject<HTMLDivElement>} sourceRef - Reference to the source HTML div element.
 */
export interface ChatConsoleMessageActionsProp {
    sourceRef: RefObject<HTMLDivElement>;
}

/**
 * Individual chat sessions actions they can take on it, these action include and
 * are not limited to: like, dislike and copy
 *
 * @param {ChatConsoleMessageActionsProp} props - Props for the ChatConsoleMessageActions component.
 * @returns {JSX.Element} JSX representation of the ChatConsoleMessageActions component.
 */
export default function ChatConsoleMessageActions({
    sourceRef
}: ChatConsoleMessageActionsProp): JSX.Element {
    const handleLikeResponse = useCallback(
        () => alert('TODO: Like response'),
        []
    );

    const handleDislikeResponse = useCallback(
        () => alert('TODO: Dislike response'),
        []
    );

    const handleCopySender = useCallback(
        () =>
            navigator.clipboard.writeText(
                htmlToText(sourceRef.current?.innerHTML)
            ),
        [sourceRef]
    );

    return (
        <div className="chat-message-actions">
            <Button type="button" onClick={handleLikeResponse}>
                <Icon type="THUMB_UP" />
            </Button>

            <Button type="button" onClick={handleDislikeResponse}>
                <Icon type="THUMB_DOWN" />
            </Button>

            <Button type="button" onClick={handleCopySender}>
                <Icon type="COPY" />
            </Button>
        </div>
    );
}
