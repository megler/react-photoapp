import React from 'react';
import {Link} from 'react-router-dom';

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
