// Lib Dependencies
import { Outlet } from 'react-router-dom';

// Dependencies
import './MasterLayout.css';
import Nav from '@components/Nav';
import Header from '@components/Header';
import ThemeToggle from '@/components/ColorScheme';

/**
 * Root application layout responsible for the overall layout/positioning
 * of persistent components and the application route content.
 *
 * @returns {JSX.Element}
 */
export default function MasterLayout(): JSX.Element {
    return (
        <div className="master-layout-container">
            <Header>
                <Nav />
                <ThemeToggle />
            </Header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
