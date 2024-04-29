import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('latest');
    const [contentFilter, setContentFilter] = useState('low');
    const [theme, setTheme] = useState('light');
    const [fetchPhotos, setFetchPhotos] = useState(true);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);


    useEffect(() => {
        if (fetchPhotos) {
            const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
            const baseURL = 'https://api.unsplash.com/';
            let url = new URL(query === '' ? `${baseURL}photos` : `${baseURL}search/photos`);

            const params = {
                page,
                per_page: perPage,
                order_by: orderBy,
                client_id: accessKey
            };

            if (query !== '') {
                params.query = query;
                if (contentFilter) {
                    params.content_filter = contentFilter;
                }
            }
            console.log("Fetching URL:", url.href);
            console.log("With params:", params);

            url.search = new URLSearchParams(params).toString();

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const images = data.results ? data.results : data;
                    setPhotos(images);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setPhotos([]);
                });
        }
        setFetchPhotos(false);
    }, [query, page, perPage, orderBy, contentFilter, fetchPhotos]);

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    function clearSearch() {
        setQuery('');
        setPhotos([]);
        setPage(1);
        setOrderBy('latest');
        setContentFilter('low');
        setFetchPhotos(false);
    }

    function handleInputChange(e) {
        setQuery(e.target.value);
        if (e.target.value !== '') {
            setFetchPhotos(true);
        }
    }

    function handlePerPageChange(e) {
        const newPerPage = Number(e.target.value);
        setPerPage(newPerPage);
        setFetchPhotos(true);
    }


    function handleOrderChange(e) {
        setOrderBy(e.target.value);
        setFetchPhotos(true);
    }

    function nextPage() {
        setPage(prevPage => prevPage + 1);
        setFetchPhotos(true);
    }

    function previousPage() {
        setPage(prevPage => prevPage - 1);
        setFetchPhotos(true);
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
                    onChange={handleInputChange}
                    placeholder="Search for photos"
                    className="search-input"
                    name="photoSearch"
                    id="photoSearch"
                />
                <select className="search-select" value={orderBy} onChange={handleOrderChange} name="orderBy"
                        id="orderBy">
                    <option value="relevant">Relevant</option>
                    <option value="latest">Latest</option>
                </select>

                <select className="search-select" value={perPage} onChange={handlePerPageChange} name="perPage"
                        id="perPage">
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="15">15 per page</option>
                    <option value="20">20 per page</option>
                    <option value="25">25 per page</option>
                </select>


                <button className="search-btn" onClick={nextPage}>Next</button>
                <button className="search-btn" disabled={page === 1} onClick={previousPage}>Prev</button>
                <button className="search-btn clear-btn" onClick={clearSearch}>Clear</button>
            </div>
            <div className="photo-grid">
                {photos.length > 0 ? (
                    photos.map(photo => (
                        <img
                            key={photo.id}
                            src={`${photo.urls.raw}&w=300&dpr=2`}
                            alt={photo.description || 'Unsplash photo'}
                            className="photo"
                        />
                    ))
                ) : (
                    <p className="no-photos">All clear!</p>
                )}
            </div>

        </div>
    );
}

export default App;
