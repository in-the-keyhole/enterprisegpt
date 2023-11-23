// Lib Dependencies
import {
    useState,
    useCallback,
    ChangeEvent,
    KeyboardEvent,
    FormEvent
} from 'react';

// Dependencies
import './ChatConsoleForm.css';
import Icon from '@components/Icon';
import Button from '@components/Button';
import { useChat } from '../../useChat';
import containsCodePatterns from '@helpers/containsCodePatterns';
import ChatConsoleFormPrompt from './ChatConsoleFormPrompt';

/**
 * Overall chat interface to enter the user prompt. Manages the submission and
 * validation
 *
 * @returns {JSX.Element} The rendered ChatConsoleForm component.
 */
const ChatConsoleForm = (): JSX.Element => {
    const store = useChat();
    const [prompt, setPrompt] = useState<string>('');
    const [error, setError] = useState<string>('');

    const clear = useCallback(() => setPrompt(''), []);

    // Send message to store, check for code in the prompt or it being empty
    // before sending
    const sendMessage = useCallback(() => {
        if (containsCodePatterns(prompt)) {
            setError(
                'Code snippets are not valid. Please remove before trying again.'
            );
        } else {
            if (prompt.length) {
                store.addMessage(prompt);
                clear();
            }
        }
    }, [clear, store, prompt]);

    // Form submission send the message
    const handleSubmit = useCallback(
        (event: FormEvent) => {
            event.preventDefault();
            sendMessage();
        },
        [sendMessage]
    );

    // Set prompt value when changing text value
    const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        setError('');
        setPrompt(e.target.value);
    }, []);

    // Allow user to submit message when using "enter"
    const handlePromptKeyDown = useCallback(
        (e: KeyboardEvent<HTMLTextAreaElement>) => {
            if (!e.shiftKey && e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        },
        [sendMessage]
    );

    return (
        <form className="chat-console-form" onSubmit={handleSubmit}>
            <ChatConsoleFormPrompt
                name="prompt"
                value={prompt}
                onChange={handleChange}
                onKeyDown={handlePromptKeyDown}
                placeholder="Ask questions. Source code may be restricted."
            />
            <Button type="button" disabled={!prompt || !prompt.trim().length}>
                <Icon type="SEND" />
            </Button>

            <p className={`chat-console-form-error ${error ? 'active' : ''}`}>
                {error}
            </p>
        </form>
    );
};

export default ChatConsoleForm;
