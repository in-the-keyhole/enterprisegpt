// Lib Dependencies
import { v4 as uuidv4 } from 'uuid';
import {
    toJS,
    action,
    autorun,
    computed,
    observable,
    runInAction,
    makeObservable,
    IObservableArray,
    IReactionDisposer
} from 'mobx';

// Dependencies
import { createChatCompletion } from './chatServices';
import { ChatSession, ChatSessionMessage, StoreStatus } from './chatStoreTypes';

// Locals
const STORAGE_KEY = 'CHAT_GPT_ENTERPRISE';

/**
 * Chat store handles the overall chat state from current chat session to
 * historical chat session management.
 *
 * @export
 * @class ChatStore
 * @typedef {ChatStore}
 */
export default class ChatStore {
    /**
     * Creates an instance of ChatStore.
     *
     * @constructor
     */
    constructor() {
        makeObservable(this, {
            status: observable,
            sessions: observable,
            currentSession: observable,
            bookmarkedSessions: computed,

            addMessage: action,
            getSession: action,
            updateStatus: action,
            createSession: action,
            removeSession: action,
            updateCurrentSession: action,
            toggleSessionBookmark: action,
            loadSessionsFromStorage: action
        });

        this.loadSessionsFromStorage();
        this.startSessionPersisting();
    }

    /**
     * Status of the store, used to determine if the store is loading, complete
     * idle or in an error state. Helpful to be able to reflect this status the
     * ui.
     *
     * @type {StoreStatus}
     */
    status: StoreStatus = StoreStatus.IDLE;

    /**
     * Update the current status of the store with a given new store status.
     *
     * @param {StoreStatus} [status=StoreStatus.IDLE]
     */
    updateStatus(status: StoreStatus = StoreStatus.IDLE) {
        this.status = status;
    }

    /**
     * List of historical chat sessions the store is currently managing. A
     * session represents a users chats with chat gpt in one sitting.
     *
     * @type {ChatSession[]}
     */
    sessions: IObservableArray<ChatSession> = observable([]);

    /**
     * Get current collection of bookmarked sessions.
     *
     * @readonly
     * @type {ChatSession[]}
     */
    get bookmarkedSessions(): ChatSession[] {
        return this.sessions.filter(session => session.bookmarked);
    }

    /**
     * Retrieve a chat session by its id.
     *
     * @param {string} id
     * @returns {ChatSession|undefined}
     */
    getSession(id: string): ChatSession | undefined {
        return this.sessions.find(session => session.id === id);
    }

    /**
     * Remove a session by session id.
     *
     * @param {string} id
     */
    removeSession(id: string) {
        if (id === this.currentSession) this.clearCurrentSession();

        this.sessions.remove(this.getSession(id));
    }

    /**
     * Clear all sessions and current session.
     */
    removeAllSessions() {
        this.sessions.clear();
        this.clearCurrentSession();
    }

    /**
     * Enable and disable a book mark status based on it current status and
     * setting it to the opposite.
     *
     * @param {string} id
     */
    toggleSessionBookmark(id: string) {
        const session = this.getSession(id);
        if (session) session.bookmarked = !session.bookmarked;
    }

    /**
     * Users current chat session they are having with GPT currently
     *
     * @type {?string}
     */
    currentSession?: string = null;

    /**
     * Clear the current chat session.
     */
    clearCurrentSession() {
        this.updateCurrentSession(undefined);
    }

    /**
     * Update the currently active session.
     *
     * @param {string} sessionId
     */
    updateCurrentSession(sessionId: string) {
        this.currentSession = sessionId;
    }

    /**
     * Create and add a new chat session to manage.
     *
     * @returns {ChatSession}
     */
    createSession(): ChatSession {
        const session: ChatSession = observable({
            id: uuidv4(),
            createdDate: new Date(),
            messages: [],
            bookmarked: false
        });

        this.sessions.unshift(session);

        return session;
    }

    /**
     * Create a chat session message with the give text as its message value
     *
     * @param {string} text
     * @returns {ChatSessionMessage}
     */
    createSessionMessage(text: string): ChatSessionMessage {
        return observable({ id: uuidv4(), createdDate: new Date(), text });
    }

    /**
     * Adds a new message to the current chat session, creates a new session
     * if no session is currently active.
     *
     * @param {string} text - The text of the message to be added.
     * @returns {void}
     */
    addMessage(text: string): void {
        const message = this.createSessionMessage(text);
        const session = this.currentSession
            ? this.getSession(this.currentSession)
            : this.createSession();

        this.updateStatus(StoreStatus.LOADING);

        this.updateCurrentSession(session.id);
        session.messages.push(message);

        createChatCompletion({
            prompts: session.messages.map(m => m.text),
            chatPrompt: text
        })
            .then(r => runInAction(() => (message.response = r.message)))
            .then(() => this.updateStatus(StoreStatus.COMPLETE))
            .catch(
                error => {
                    this.updateStatus(StoreStatus.ERROR);
                    console.error('Error in addMessage:', error);
                    if (error.response.status === 400) {
                        alert(error.response?.data.message || "Bad request");
                    }
                }
            );
    }

    /**
     * Disposer to the session changes reaction.
     *
     * @type {?IReactionDisposer}
     */
    sessionPersistDisposer?: IReactionDisposer = null;

    /**
     * Start watch the chat sessions for changes and when there are changes
     * persist those changes to local storage.
     *
     * @returns {void}
     */
    startSessionPersisting(): void {
        this.sessionPersistDisposer?.();
        this.sessionPersistDisposer = autorun(() =>
            this.persistSessionsToStorage()
        );
    }

    /**
     * Serialize the current session and save them to local storage.
     *
     * @returns {void}
     */
    persistSessionsToStorage(): void {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(toJS(this.sessions))
            );
        } catch (error) {
            console.error('Failed to persist');
        }
    }

    /**
     * Pull the saved sessions from local storage and try to load them into the
     * current collection of sessions
     *
     * @returns {void}
     */
    loadSessionsFromStorage(): void {
        const storedSessions = localStorage.getItem(STORAGE_KEY);
        const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

        try {
            this.sessions =
                JSON.parse(storedSessions, (_key, value) =>
                    typeof value === 'string' && isoDatePattern.test(value)
                        ? new Date(value)
                        : value
                ) || [];
        } catch (error) {
            console.error(
                'Failed to parse chat store state from local storage',
                error
            );
        }
    }
}

/**
 * Create and configure a chat store instance.
 *
 * @export
 * @returns {ChatStore}
 */
export function createChatStore(): ChatStore {
    return new ChatStore();
}
