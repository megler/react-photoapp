import React from 'react';

/**
* A React component that displays a grid of favorite photos stored in the browser's localStorage.
* Allows users to remove photos from the favorites list with confirmation.
*
* @component
*/
function Favorites() {

    /**
     * State hook for managing favorites. Initializes from localStorage or falls back to an empty array.
     * @type {[Array, Function]}
     */
    const [favorites, setFavorites] = React.useState(() => JSON.parse(localStorage.getItem("favorites")) || []);

    /**
     * Handles the removal of a photo from favorites after confirmation.
     * Updates the state and localStorage.
     *
     * @param {number} photoId - The unique identifier for the photo to remove.
     */
    const removeFavorite = (photoId) => {
        if (window.confirm("Do you want to remove this image from your favorites?")) {
            const updatedFavorites = favorites.filter(photo => photo.id !== photoId);
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    return (
        <div className="photo-grid">
            {favorites.map(photo => (

                <img key={photo.id}
                     src={`${photo.urls.raw}&w=300&dpr=2`}
                     alt={photo.description || "Favorite photo"}
                     className="photo"
                     onClick={() => removeFavorite(photo.id)}/>

            ))}
            {
                favorites.length === 0 && <p>No favorites yet!</p>}
        </div>
    );
}

export default Favorites;
