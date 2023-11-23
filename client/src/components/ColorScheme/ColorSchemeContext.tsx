// Lib Dependencies
import { createContext, useState, ReactNode, useEffect } from 'react';

// Dependencies
import { getPreference, setPreference, ColorMode } from './colorSchemeUtils';

/**
 * Props for the ColorModeProvider component.
 */
interface ColorSchemeProviderProps {
    children: ReactNode;
}

/**
 * Props for the ColorSchemeContext.
 */
export interface ColorSchemeContextProps {
    colorMode: ColorMode;
    toggleColorMode: () => void;
}

/**
 * Context for managing color schemes in the application.
 */
export const ColorSchemeContext = createContext<ColorSchemeContextProps>({
    colorMode: ColorMode.Light,
    toggleColorMode: () => console.warn('toggleColorMode is not implemented')
});

/**
 * Provider component for managing color schemes.
 *
 * @param {ColorSchemeProviderProps} props - The component props.
 * @returns {JSX.Element} The JSX element for the ColorModeProvider component.
 */
export function ColorModeProvider({
    children
}: ColorSchemeProviderProps): JSX.Element {
    // State to manage the current color mode
    const [colorMode, setColorMode] = useState<ColorMode>(getPreference());

    /**
     * Toggles between light and dark color modes.
     */
    const toggleColorMode = () => {
        setColorMode(prevMode =>
            prevMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
        );
    };

    // Effect to update the preference when the color mode changes
    useEffect(() => setPreference(colorMode), [colorMode]);

    // Effect to listen for changes in system color scheme preference
    useEffect(() => {
        // Media query to detect dark mode preference
        const mediaQueryList = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        // Listener for changes in the media query
        const listener = (event: MediaQueryListEvent) =>
            setColorMode(event.matches ? ColorMode.Dark : ColorMode.Light);

        // Add the listener to the media query
        mediaQueryList.addEventListener('change', listener);

        // Cleanup: remove the listener when the component unmounts
        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, []);

    // Render the ColorSchemeContext.Provider with the current color mode and toggle function
    return (
        <ColorSchemeContext.Provider value={{ colorMode, toggleColorMode }}>
            {children}
        </ColorSchemeContext.Provider>
    );
}
