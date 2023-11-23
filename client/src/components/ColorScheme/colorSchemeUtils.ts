/**
 * Enumeration representing color modes.
 * 
 * @enum {string}
 */
export enum ColorMode {
    Light = 'light',
    Dark = 'dark',
}

/**
 * Gets the user's color preference from local storage or based on the system preference.
 * 
 * @returns {ColorMode} The user's color preference.
 */
export function getPreference(): ColorMode {
    const storedValue = localStorage.getItem('theme-preference');

    return storedValue === ColorMode.Light || storedValue === ColorMode.Dark
        ? storedValue
        : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? ColorMode.Dark
            : ColorMode.Light;
}

/**
 * Sets the user's color preference in local storage and reflects the preference in the UI.
 * 
 * @param {ColorMode} color - The color mode to set as the user's preference.
 */
export function setPreference(color: ColorMode) {
    localStorage.setItem('theme-preference', color);
    reflectPreference(color);
}

/**
 * Reflects the user's color preference in the UI by updating the color-scheme attribute.
 * 
 * @param {ColorMode} color - The color mode to reflect in the UI.
 */
export function reflectPreference(color: ColorMode) {
    document.firstElementChild.setAttribute('color-scheme', color);
}
