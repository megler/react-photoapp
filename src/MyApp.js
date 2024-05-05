import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useTheme} from './ThemeManager';
import useFetchPhotos from './FetchPhotos';
import SearchControls from './SearchControls';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import TopNav from "./TopNav";
import Favorites from "./Favorites";
import './MyApp.css';

/**
 * MyApp serves as the main module for the application. It coordinates the application's routing,
 * state management, and integrates with the Unsplash API for fetching photos. It manages user interactions
 * such as search, pagination, favorites, and theming. This module encompasses multiple components like TopNav,
 * SearchControls, Favorites, and uses Lightbox for displaying images.
 *
 *
 * @module MyApp
 * @returns {React.ReactElement} A React element representing the main user interface of the photo browsing application.
 */
function MyApp() {
    // State hooks for managing search parameters
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [orderBy, setOrderBy] = useState('latest');
    const [contentFilter, setContentFilter] = useState('low');

    // State hooks for managing lightbox display and the selected image
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Custom hook for fetching photos from the Unsplash API
    const {photos, setFetchPhotos, loading} = useFetchPhotos(query, page, perPage, orderBy, contentFilter);

    // Custom hook for theme management
    const [theme, toggleTheme] = useTheme();

    /**
     * Clears the current search parameters and re-triggers photo fetching.
     */
    function clearSearch() {
        setQuery('');
        setPage(1);
        setOrderBy('latest');
        setContentFilter('low');
        setPerPage(20);
        triggerFetch();
    }

    /**
     * Increments the page number to fetch the next set of photos.
     */
    function nextPage() {
        setPage(prevPage => prevPage + 1);
        setFetchPhotos(true);
    }

    /**
     * Decrements the page number to fetch the previous set of photos.
     */
    function previousPage() {
        setPage(prevPage => prevPage - 1);
        setFetchPhotos(true);
    }

    /**
     * Triggers a new fetch of photos.
     */
    function triggerFetch() {
        setFetchPhotos(true);
    }

    /**
     * Handles click events on individual photos to open them in a lightbox.
     * @param {Object} photo - The photo object to display in the lightbox.
     */
    const handleImageClick = photo => {
        setSelectedImage(photo);
        setLightboxOpen(true);
    };

    /**
     * Adds the selected photo to the favorites in localStorage.
     * @param {Object} photo - The photo object to add to favorites.
     */
    const addFavorite = (photo) => {
        if (window.confirm("Would you like to add this image to your favorites?")) {
            const currentFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
            const newFavorites = [...currentFavorites, photo];
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }
    };

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <TopNav toggleTheme={toggleTheme} theme={theme}/>
                <SearchControls
                    query={query} setQuery={setQuery}
                    orderBy={orderBy} setOrderBy={setOrderBy}
                    perPage={perPage} setPerPage={setPerPage}
                    nextPage={nextPage} previousPage={previousPage}
                    clearSearch={clearSearch} page={page}
                    triggerFetch={triggerFetch}
                />
                <Routes>
                    <Route path="/" element={
                        loading ?
                            <div className="loader"></div> :
                            photos.length > 0 ? (
                                <div className="photo-grid">
                                    {photos.map(photo => (
                                        <img key={photo.id} src={`${photo.urls.raw}&w=300&dpr=2`}
                                             alt={photo.description}
                                             className="photo" onClick={() => handleImageClick(photo)}/>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-photos">No images found</div>
                            )
                    }/>
                    <Route path="/favorites" element={<Favorites/>}/>
                </Routes>
                {selectedImage && (
                    <Lightbox
                        open={lightboxOpen}
                        close={() => setLightboxOpen(false)}
                        slides={[{src: selectedImage.urls.raw}]}
                        render={{
                            buttonPrev: () => null,
                            buttonNext: () => null
                        }}
                        toolbar={{
                            buttons: [
                                <button key="add-to-favorites" type="button" className="favorites-btn"
                                        onClick={() => addFavorite(selectedImage)}>
                                    Add to Favorites
                                </button>,
                                "close",
                            ],
                        }}
                    />
                )}
            </div>
        </Router>
    );
}

export default MyApp;
