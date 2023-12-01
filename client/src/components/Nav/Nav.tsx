// Dependencies
import './Nav.css';
import Icon from '@components/Icon';
import Button from '@components/Button';
import { useAuth } from '../Auth/useAuth';
import { useCallback } from 'react';

/**
 * Navigation component responsible for displaying global navigation.
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Nav(): JSX.Element {
    const authStore = useAuth();
    const handleLogout = useCallback(() => authStore.logout(), [authStore]);

    return (
        <nav className="nav">
            <Button type="link" to="/" title="Start a Chat">
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

            <Button type="button" title="Log user out" onClick={handleLogout}>
                <Icon type="LOGOUT" />
            </Button>
        </nav>
    );
}
