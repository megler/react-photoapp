import React from 'react';

function TopNav({setFavoritesView, toggleTheme, theme}) {

    return (
        <div className="top-nav">
            <div className="nav-controls">
                <button onClick={() => setFavoritesView(false)} className="nav-btn">Home</button>
                <button onClick={() => setFavoritesView(true)} className="nav-btn">Favorites</button>
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </div>
        </div>
    )
}

export default TopNav;