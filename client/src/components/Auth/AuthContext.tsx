// Lib Dependencies
import { useState, ReactNode, createContext } from 'react';

// Dependencies
import Login from './Login';
import AuthStore, { createAuthStore } from './authStore';

/**
 * Context for managing authentication state.
 *
 * @type {React.Context<AuthStore | null>}
 */
export const AuthContext = createContext<AuthStore | null>(null);

/**
 * Props for the AuthProvider component.
 *
 * @interface
 * @property {ReactNode} children - The child elements to be wrapped by AuthProvider.
 */
export interface AuthProviderProps {
    children: ReactNode;
}

/**
 * Provides authentication context to the application.
 *
 * @param {AuthProviderProps} props - The props for the AuthProvider component.
 * @returns {JSX.Element} The JSX element representing the AuthProvider.
 */
export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const [authStore] = useState(() => createAuthStore());

    return (
        <AuthContext.Provider value={authStore}>
            <Login />
            {children}
        </AuthContext.Provider>
    );
}
