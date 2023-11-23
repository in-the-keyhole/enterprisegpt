// Lib Dependencies
import { useContext } from 'react';

// Dependencies
import { ColorSchemeContextProps, ColorSchemeContext } from './ColorSchemeContext';

/**
 * Hook for accessing the color mode and toggle function from the ColorSchemeContext.
 * @returns {ColoSchemeContextProps} An object containing the color mode and toggle function.
 */
export function useColorMode(): ColorSchemeContextProps {
    const { colorMode, toggleColorMode } = useContext(ColorSchemeContext);

    return { colorMode, toggleColorMode };
}