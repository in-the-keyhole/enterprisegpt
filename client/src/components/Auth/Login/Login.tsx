// Lib Dependencies
import { observer } from 'mobx-react-lite';
import { useState, useCallback, useRef } from 'react';

// Dependencies
import './Login.css';
import Icon from '@components/Icon';
import DotLoader from '@components/DotLoader';
import { useAuth } from '../useAuth';
import { AuthStoreStatus } from '../authStore';

/**
 * Application login/SignIn component that allows the user to enter their
 * user credentials to sign into the chat application
 *
 * @export
 * @returns {JSX.Element}
 */
const Login: React.FC = observer(() => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const authStore = useAuth();
    const authStatus = authStore.status;

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const statusClass = authStatus.toLowerCase();
    const activeClass = authStatus !== AuthStoreStatus.COMPLETE ? 'active' : '';

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            if (name === 'username') setUsername(value);
            if (name === 'password') setPassword(value);
        },
        []
    );

    const handleUserAuthentication = useCallback(
        (event: React.ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (username && password) authStore.login(username, password);
        },
        [username, password, authStore]
    );

    const handleInActivated = useCallback(
        (event: React.TransitionEvent<HTMLInputElement>) => {
            if (
                event.target === wrapperRef.current &&
                event.propertyName === 'scale'
            ) {
                setUsername('');
                setPassword('');
            }
        },
        []
    );

    return (
        <div className={`login-container ${activeClass} ${statusClass}`}>
            <div
                ref={wrapperRef}
                className="login-form-wrapper"
                onTransitionEnd={handleInActivated}>
                <form
                    className="login-form"
                    onSubmit={handleUserAuthentication}>
                    <span className="login-form-icons">
                        <Icon type="LOGO" />
                        <Icon type="ERROR" />
                    </span>

                    <label>
                        User Name
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            autoComplete="username"
                            required
                        />
                    </label>

                    <label>
                        Password
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            required
                        />
                    </label>

                    <span className="login-error">
                        Oops! Authentication fail. Give it another shot!
                    </span>

                    <button className="btn">
                        <span>Login</span>

                        <DotLoader />
                    </button>
                </form>
            </div>
        </div>
    );
});

export default Login;
