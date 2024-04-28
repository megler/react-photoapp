import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('relevant');
    const [contentFilter, setContentFilter] = useState('low');
    const [theme, setTheme] = useState('light');


    useEffect(() => {
        document.body.className = theme;
    }, [theme]);



    useEffect(() => {
        if (query !== '') {
            const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
            const url = new URL('https://api.unsplash.com/search/photos');
            const params = {
                query,
                page,
                per_page: perPage,
                order_by: orderBy,
                content_filter: contentFilter,
                client_id: accessKey
            };
            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data && data.results) {
                        setPhotos(data.results);
                    } else {
                        setPhotos([]);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    setPhotos([]);
                });
        }
    }, [query, page, perPage, orderBy, contentFilter]);

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    function clearSearch() {
        setQuery('');
        setPhotos([]);
        setPage(1);
        setOrderBy('relevant');
        setContentFilter('low');
    }

    return (
        <div className={`app-container ${theme}`}>
            <div className="theme-toggle-container">
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </div>
            <div className="search-controls">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for photos"
                    className="search-input"
                />
                <select className="search-select" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                    <option value="relevant">Relevant</option>
                    <option value="latest">Latest</option>
                </select>
                <select className="search-select" value={contentFilter}
                        onChange={(e) => setContentFilter(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="high">High</option>
                </select>
                <button className="search-btn" onClick={() => setPage(prev => prev + 1)}>Next</button>
                <button className="search-btn" disabled={page === 1} onClick={() => setPage(prev => prev - 1)}>Prev
                </button>
                <button className="search-btn clear-btn" onClick={clearSearch}>Clear</button>
            </div>
            <div className="photo-grid">
                {photos.length > 0 ? (
                    photos.map(photo => (
                        <img key={photo.id} src={photo.urls.small} alt={photo.description || 'Unsplash photo'}
                             className="photo"/>
                    ))
                ) : ( <p className="no-photos">No photos found.</p>

                )}
            </div>
        </div>
    );


}


export default App;
