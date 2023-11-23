// Dependencies
import './Nav.css';
import Icon from '@components/Icon';
import Button from '@components/Button';

/**
 * Navigation component responsible for displaying global navigation.
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Nav(): JSX.Element {
    return (
        <nav className="nav">
            <Button type="link" to="/chat" title="Start a Chat">
                <Icon type="CHATS" />
            </Button>

            <Button
                type="link"
                to="/settings"
                title="View application settings">
                <Icon type="SETTINGS" />
            </Button>

            <Button type="link" to="/style-guide" title="Application styles">
                <Icon type="STYLE" />
            </Button>

            <Button type="link" to="/" title="Log t user out">
                <Icon type="LOGOUT" />
            </Button>
        </nav>
    );
}
