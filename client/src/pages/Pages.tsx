// Lib Dependencies
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Dependencies
import Login from './Login';
import ChatPage from './Chat';
import PageLayout from './PageLayout';
import NoMatchPage from './NoMatch';
import MasterLayout from './MasterLayout';
import SettingsPage from './Settings';
import StyleGuidePage from './StyleGuide';

/**
 * Applications pages component handles the global routing that produces a
 * different view when the browser navigates.
 *
 * @returns {JSX.Element}
 */
export default function Pages(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MasterLayout />}>
                    <Route path="/" index element={<Login />} />

                    <Route element={<PageLayout />}>
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route
                            path="/style-guide"
                            element={<StyleGuidePage />}
                        />

                        <Route path="*" element={<NoMatchPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
