import React from 'react';
import {Link} from 'react-router-dom';

/**
 * Top navigation component that provides links to the Home and Favorites pages,
 * along with a button to toggle the theme of the application between light and dark.
 *
 * @component
 * @param {Function} toggleTheme - Function to toggle the theme between light and dark.
 * @param {string} theme - Current theme setting ('light' or 'dark').
 * @returns {React.ReactElement} - The TopNav component as a React element.
 */
function TopNav({toggleTheme, theme}) {
    return (
        <div className="top-nav">
            <div className="nav-controls">
                <Link to="/" className="nav-btn">Home</Link>
                <Link to="/favorites" className="nav-btn">Favorites</Link>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </div>
        </div>
    );
}

export default TopNav;
