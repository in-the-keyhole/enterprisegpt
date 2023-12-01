// Lib Dependencies
import { ReactNode } from 'react';

// Dependencies
import './Header.css';
import Logo from './Logo';

/**
 * Props for the Header component.
 *
 * @interface HeaderProps
 * @property {ReactNode} children - The child elements to be rendered in header.
 */
interface HeaderProps {
    children: ReactNode;
}

/**
 * Header component representing root header that contains the root logo, nav
 * theme toggle and user.
 *
 * @param {HeaderProps} props - The properties for the Header component.
 * @returns {JSX.Element} JSX element representing the Header component.
 */
export default function Header({ children }: HeaderProps): JSX.Element {
    return (
        <header className="header-container">
            <Logo />

            {children}
        </header>
    );
}
