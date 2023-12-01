// Lib Dependencies
import { action, observable, makeObservable } from 'mobx';

// Dependencies
import { authorizeUser } from './authServices';
import { AxiosError } from 'axios';

/**
 * Enumeration representing different states of the AuthStore.
 * - IDLE: The store is in an idle state.
 * - ERROR: The store encountered an error.
 * - LOADING: The store is in a loading state.
 * - COMPLETE: The store completed an operation successfully.
 */
export enum AuthStoreStatus {
    IDLE = 'IDLE',
    ERROR = 'ERROR',
    LOADING = 'LOADING',
    COMPLETE = 'COMPLETE'
}

/**
 * Auth store manages the overall authorization state and the current user
 * signed in.
 */
export default class AuthStore {
    constructor() {
        makeObservable(this, {
            user: observable,
            setUser: action,

            status: observable,
            setStatus: action
        });
    }

    /**
     * Status of the store, used to determine if the store is loading, complete
     * idle or in an error state. Helpful to be able to reflect this status the
     * ui.
     *
     * @type {AuthStoreStatus}
     */
    status: AuthStoreStatus = AuthStoreStatus.IDLE;

    /**
     * Set the stores status.
     *
     * @param {AuthStoreStatus} status - New status to set.
     */
    setStatus(status: AuthStoreStatus) {
        this.status = status;
    }

    /**
     * Currently sign in users user name
     *
     * @type {string}
     */
    user: string = null;

    /**
     * Set the current user that was authorized.
     *
     * @param {string | undefined} user
     */
    setUser(user: string | undefined) {
        this.user = user;
    }

    /**
     * Initiates the login process  by posting the user credentials and either
     * resolving the login process or fails the process..
     *
     * @param {string} username - User's username.
     * @param {string} password - User's password.
     */
    login(username: string, password: string) {
        this.setStatus(AuthStoreStatus.LOADING);

        authorizeUser(username, password)
            .then(() => this.handleLoginSuccess(username))
            .catch(error => this.handleLoginFailure(error));
    }

    /**
     * Handles the successful login by setting the stores status to COMPLETE
     * and updating the current user.
     *
     * @param {string} username - User's username.
     */
    handleLoginSuccess(username: string) {
        this.setStatus(AuthStoreStatus.COMPLETE);
        this.setUser(username);
    }

    /**
     * Handles login failure by logging the error to the console and setting the
     * stores status to ERROR.
     *
     * @param {AxiosError} error - Axios error object.
     */
    handleLoginFailure(error: AxiosError) {
        console.error(error.message);
        this.setStatus(AuthStoreStatus.ERROR);
    }

    /**
     * Logs out the current user by clearing the stores COMPLETE status and
     * the user.
     */
    logout() {
        this.setUser(undefined);
        this.setStatus(AuthStoreStatus.IDLE);
    }
}

/**
 * Factory function to create an instance of AuthStore.
 *
 * @returns {AuthStore} - A new instance of AuthStore.
 */
export function createAuthStore(): AuthStore {
    return new AuthStore();
}
