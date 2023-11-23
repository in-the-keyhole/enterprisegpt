// Dependencies
import Icon from '@components/Icon';
import Button from '@components/Button';
import { ColorMode, useColorMode } from '.';
import './ColorScheme.css';

/**
 * Header component representing root header that contains the root logo, nav
 * theme toggle and user.
 *
 * @param {ThemeToggleProps} props - The properties for the Header component.
 * @returns {JSX.Element} JSX element representing the Header component.
 */
export default function ColorModeToggle(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDarkMode = colorMode === ColorMode.Dark;

    const title = isDarkMode
        ? 'Switch to light color scheme'
        : 'Switch to dark color scheme';

    const composeClassName = ['theme-toggle', isDarkMode && 'is-active']
        .filter(Boolean)
        .join(' ');

    return (
        <Button
            type="button"
            className={composeClassName}
            onClick={toggleColorMode}
            title={title}>
            <Icon type="SUN" />
        </Button>
    );
}
