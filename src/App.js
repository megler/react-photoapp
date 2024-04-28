import React, { useState, useEffect } from 'react';

function App() {
    const [photos, setPhotos] = useState([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('relevant');
    const [contentFilter, setContentFilter] = useState('low');
    const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

    useEffect(() => {
        if (query !== '') {
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

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for photos"
            />
            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                <option value="relevant">Relevant</option>
                <option value="latest">Latest</option>
            </select>
            <select value={contentFilter} onChange={(e) => setContentFilter(e.target.value)}>
                <option value="low">Low</option>
                <option value="high">High</option>
            </select>
            <button onClick={() => setPage(prev => prev + 1)}>Next Page</button>
            <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1}>Previous Page</button>
            <div>
                {photos.length > 0 ? (
                    photos.map(photo => (
                        <img key={photo.id} src={photo.urls.regular} alt={photo.description || 'Unsplash photo'} />
                    ))
                ) : (
                    <p>No photos found.</p>
                )}
            </div>
        </div>
    );
}

export default App;
