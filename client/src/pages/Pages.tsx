// Lib Dependencies
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Dependencies
import ChatPage from './Chat';
import StyleGuide from './StyleGuide';
import PageLayout from './PageLayout';
import NoMatchPage from './NoMatch';
import MasterLayout from './MasterLayout';
import SettingsPage from './Settings';

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
                    <Route element={<PageLayout />}>
                        <Route index path="/" element={<ChatPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/style-guide" element={<StyleGuide />} />
                        <Route path="*" element={<NoMatchPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
