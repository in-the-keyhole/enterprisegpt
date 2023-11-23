// Lib Dependencies
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';

// Dependencies
import './Login.css';
import Icon from '@components/Icon';

/**
 * Application login/SignIn component that allows the user to enter their
 * user credentials to sign into the chat application
 *
 * @export
 * @returns {JSX.Element}
 */
export default function Login(): JSX.Element {
    const navigate = useNavigate();

    const [user, setUser] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleUserChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setUser(event.target.value),
        []
    );

    const handlePasswordChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(event.target.value),
        []
    );

    const handleUserAuthentication = useCallback(
        (event: React.ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();

            const params = new URLSearchParams();

            params.append('username', user);
            params.append('password', password);

            axios
                .post('/api/login', params)
                .then(() =>
                    navigate('/chat', { replace: true, state: { user } })
                )
                .catch(
                    error => (
                        setError('Invalid Credentials'), console.error(error)
                    )
                );
        },
        [user, password, navigate]
    );

    return (
        <div className="login-container">
            <form onSubmit={handleUserAuthentication}>
                <Icon type="LOGO" />

                <label>
                    User Name
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={user}
                        onChange={handleUserChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>

                <button className="btn" disabled={!(user && password)}>
                    Login
                </button>

                <strong>{error && error}</strong>
            </form>
        </div>
    );
}
