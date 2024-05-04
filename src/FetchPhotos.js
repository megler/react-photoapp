import {useState, useEffect} from 'react';

const useFetchPhotos = (query, page, perPage, orderBy, contentFilter) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchPhotos, setFetchPhotos] = useState(true);

    useEffect(() => {
        if (fetchPhotos) {
            setLoading(true);
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
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setPhotos([]);
                    setLoading(false);
                });
            setFetchPhotos(false);
        }
    }, [query, page, perPage, orderBy, contentFilter, fetchPhotos]);

    return {photos, loading, setFetchPhotos};
};

export default useFetchPhotos;
