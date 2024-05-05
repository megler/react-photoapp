import {useState, useEffect} from 'react';

/**
 * A custom React hook that manages the theme of the application (light or dark).
 * It initializes the theme based on the value stored in localStorage and provides
 * a function to toggle between light and dark themes. The selected theme is also
 * applied to the document body and persisted in localStorage.
 *
 * @returns {Array} Returns an array with the current theme and the toggle function.
 */
export const useTheme = () => {
    // State initialization from localStorage, defaulting to 'light' if not previously set
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || 'light';
    });

    // Effect to apply the current theme to the body of the document and save it to localStorage
    useEffect(() => {
        document.body.className = theme; // Apply theme class to body
        localStorage.setItem("theme", theme); // Persist theme in localStorage
    }, [theme]); // Re-run effect when theme changes

    // Toggle between 'light' and 'dark' themes
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return [theme, toggleTheme];
};
