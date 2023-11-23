import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { configure } from 'mobx';
import './styles/index.css';

// Check if the environment is development
if (process.env.NODE_ENV === 'development') {
    configure({
        enforceActions: 'always', // Enforce that state modifications should occur within MobX actions
        disableErrorBoundaries: true, // Disable MobX error boundaries for better debugging
        computedRequiresReaction: true, // Enforce that computed values should only be accessed within MobX reactions
        reactionRequiresObservable: true, // Enforce that reactions should only be tracked if they access an observable
        observableRequiresReaction: true // Enforce that observables should only be accessed within MobX reactions
    });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
