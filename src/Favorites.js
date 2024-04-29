import React from 'react';

function Favorites() {
    const [favorites, setFavorites] = React.useState(() => JSON.parse(localStorage.getItem("favorites")) || []);

    const removeFavorite = (photoId) => {
        if (window.confirm("Do you want to remove this image from your favorites?")) {
            const updatedFavorites = favorites.filter(photo => photo.id !== photoId);
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    return (
        <>
            {favorites.map(photo => (
                <img key={photo.id}
                     src={`${photo.urls.raw}&w=300&dpr=2`}
                     alt={photo.description || "Favorite photo"}
                     className="photo"
                     onClick={() => removeFavorite(photo.id)}/>
            ))}
            {favorites.length === 0 && <p>No favorites yet!</p>}
        </>
    );
}

export default Favorites;
