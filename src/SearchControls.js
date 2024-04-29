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
                            page,
                            triggerFetch
                        }) {
    function handleInputChange(e) {
        setQuery(e.target.value);
        triggerFetch();
    }

    function handlePerPageChange(e) {
        setPerPage(Number(e.target.value));
        triggerFetch();
    }

    function handleOrderChange(e) {
        setOrderBy(e.target.value);
        triggerFetch();
    }

    return (
        <div className="search-controls">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search for photos"
                className="search-input"
                name="photoSearch"
                id="photoSearch"
            />
            <select className="search-select" value={orderBy} onChange={handleOrderChange} name="orderBy" id="orderBy">
                <option value="relevant">Relevant</option>
                <option value="latest">Latest</option>
            </select>

            <select className="search-select" value={perPage} onChange={handlePerPageChange} name="perPage"
                    id="perPage">
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="15">15 per page</option>
                <option value="20">20 per page</option>
                <option value="25">25 per page</option>
            </select>

            <button className="search-btn" onClick={nextPage}>Next</button>
            <button className="search-btn" disabled={page === 1} onClick={previousPage}>Prev</button>
            <button className="search-btn clear-btn" onClick={clearSearch}>Clear</button>
        </div>
    );
}

export default SearchControls;