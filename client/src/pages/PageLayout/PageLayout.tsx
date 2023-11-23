// Lib Dependencies
import { Outlet } from 'react-router-dom';

// Dependencies
import './PageLayout.css';

/**
 * Page layout component.
 *
 * @param {PageLayoutProps} props - The properties for the Page component.
 * @returns {JSX.Element} JSX element representing the Page component.
 */
export default function PageLayout(): JSX.Element {
    return (
        <div className="page-layout">
            <Outlet />
        </div>
    );
}
