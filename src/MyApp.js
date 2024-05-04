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

function MyApp() {
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [orderBy, setOrderBy] = useState('latest');
    const [contentFilter, setContentFilter] = useState('low');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const {photos, setFetchPhotos, loading} = useFetchPhotos(query, page, perPage, orderBy, contentFilter);
    const [theme, toggleTheme] = useTheme();

    function clearSearch() {
        setQuery('');
        setPage(1);
        setOrderBy('latest');
        setContentFilter('low');
        setPerPage(20);
        triggerFetch();
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

    const handleImageClick = photo => {
        setSelectedImage(photo);
        setLightboxOpen(true);
    };

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
