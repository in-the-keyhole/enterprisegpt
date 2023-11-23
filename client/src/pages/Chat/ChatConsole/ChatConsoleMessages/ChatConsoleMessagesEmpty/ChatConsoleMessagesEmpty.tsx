import './ChatConsoleMessagesEmpty.css';

/**
 * Chat consoles empty state that presents to the user a playful illustration
 * and animation about how there are no sessions at this time.
 *
 * @export
 * @returns {JSX.Element}
 */
export default function ChatConsoleMessagesEmpty(): JSX.Element {
    return (
        <div className="empty-state-container">
            <div className="empty-state-illustrations">
                <div className="empty-state-illustrations-container">
                    <div className="empty-state-illustration">
                        <div className="empty-state-illustration-icon"></div>
                        <div className="empty-state-illustration-line"></div>
                    </div>

                    <div className="empty-state-illustration">
                        <div className="empty-state-illustration-icon"></div>
                        <div className="empty-state-illustration-line"></div>
                    </div>

                    <div className="empty-state-illustration">
                        <div className="empty-state-illustration-icon"></div>
                        <div className="empty-state-illustration-line"></div>
                    </div>
                </div>
            </div>

            <h5 className="empty-state-title">
                Start by adding the first question
            </h5>

            <p>
                Your conversation canvas is ready! Dive into an immersive chat
                experience with our AI. Ask questions, share thoughts, and
                unlock the power of intelligent dialogue.
            </p>
        </div>
    );
}
