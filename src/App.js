import React, {useState, useEffect} from 'react';
import SearchControls from './SearchControls';
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

    function nextPage() {
        setPage(prevPage => prevPage + 1);
        setFetchPhotos(true);
    }

    function previousPage() {
        setPage(prevPage => prevPage - 1);
        setFetchPhotos(true);
    }

    function triggerFetch() {
        setFetchPhotos(true);
    }


    return (
        <div className={`app-container ${theme}`}>
            <div className="theme-toggle-container">
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
                </button>
            </div>
            <SearchControls
                query={query} setQuery={setQuery}
                orderBy={orderBy} setOrderBy={setOrderBy}
                perPage={perPage} setPerPage={setPerPage}
                nextPage={nextPage} previousPage={previousPage}
                clearSearch={clearSearch} page={page}
                triggerFetch={triggerFetch}
            />
            <div className="photo-grid">
                {photos.length > 0 ? (
                    photos.map(photo => (
                        <img key={photo.id} src={`${photo.urls.raw}&w=300&dpr=2`} alt={photo.description}
                             className="photo"/>
                    ))
                ) : (
                    <p className="no-photos">All clear!</p>
                )}
            </div>
        </div>
    );
}

export default App;
