import React from 'react';

/**
 * A React component for rendering search controls for a photo search application.
 * Includes input for search queries, selection for order and pagination, and navigation buttons.
 *
 * @component
 * @param {string} query - The current search query.
 * @param {Function} setQuery - Function to update the search query.
 * @param {string} orderBy - The current sorting order of the search results.
 * @param {Function} setOrderBy - Function to update the sorting order.
 * @param {number} perPage - The current number of items displayed per page.
 * @param {Function} setPerPage - Function to update the number of items per page.
 * @param {Function} nextPage - Function to navigate to the next page of results.
 * @param {Function} previousPage - Function to navigate to the previous page of results.
 * @param {Function} clearSearch - Function to clear the current search.
 * @param {Function} triggerFetch - Function to trigger a new search fetch based on current parameters.
 */
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
    /**
     * Handles the submit event of the search form, which triggers a new fetch.
     * @param {React.FormEvent} e - The event object.
     */
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
