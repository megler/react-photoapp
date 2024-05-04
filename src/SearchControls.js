import React from 'react';

function SearchControls({
                            query,
                            setQuery,
                            orderBy,
                            setOrderBy,
                            perPage,
                            setPerPage,
                            nextPage,
                            previousPage,
                            clearSearch,
                            triggerFetch
                        }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        triggerFetch();
    };

    return (
        <form onSubmit={handleSubmit} className="search-controls">
            <input
                type="text"
                placeholder="Search photos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
            />
            <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)} className="search-select">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
            </select>
            <select value={perPage} onChange={(e) => setPerPage(e.target.value)} className="search-select">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
            <button type="submit" className="search-btn">Search</button>
            <button type="button" onClick={clearSearch} className="search-btn clear-btn">Clear</button>
            <button type="button" onClick={previousPage} className="nav-btn">Previous</button>
            <button type="button" onClick={nextPage} className="nav-btn">Next</button>
        </form>
    );
}

export default SearchControls;
