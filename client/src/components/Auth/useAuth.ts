// Lib Dependencies
import { useContext } from 'react';

// Dependencies
import AuthStore from './authStore';
import { AuthContext } from './AuthContext';

/**
 * Hook for accessing the auth store from the AuthContext.
 * 
 * @returns {AuthStore}
 */
export function useAuth(): AuthStore {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within a AuthProvider');

    return context
}