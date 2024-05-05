import {useState, useEffect} from 'react';

/**
 * Custom React hook for fetching photos from the Unsplash API.
 * It allows querying by different parameters and manages the loading state and results.
 *
 * @param {string} query - The search term used to query photos. An empty string fetches random photos.
 * @param {number} page - The page number in the pagination of results.
 * @param {number} perPage - Number of photos per page.
 * @param {string} orderBy - Ordering criterion for the photos (e.g., 'latest', 'oldest', 'popular').
 * @param {string} contentFilter - Filter for the content type ('low', 'high'), optional.
 * @returns {object} Returns an object containing the array of photos, loading status, and a setter function to trigger a new fetch.
 *
 */
const useFetchPhotos = (query, page, perPage, orderBy, contentFilter) => {
    // State for storing the list of fetched photos
    const [photos, setPhotos] = useState([]);
    // State for tracking the loading status
    const [loading, setLoading] = useState(false);
    // State to control when to fetch photos
    const [fetchPhotos, setFetchPhotos] = useState(true);

    useEffect(() => {
        if (fetchPhotos) {
            setLoading(true);
            const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
            const baseURL = 'https://api.unsplash.com/';
            // Determine endpoint based on whether a query is provided
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

            // Fetch data from Unsplash API
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const images = data.results ? data.results : data; // Handle different data structure based on endpoint
                    setPhotos(images); // Update photos state with fetched data
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setPhotos([]); // Reset photos state on error
                    setLoading(false);
                });
            setFetchPhotos(false); // Prevent further fetches unless explicitly requested
        }
    }, [query, page, perPage, orderBy, contentFilter, fetchPhotos]);

    return {photos, loading, setFetchPhotos};
};

export default useFetchPhotos;
