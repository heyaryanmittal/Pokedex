import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, suggestions }) => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (query.length > 0) {
            const filtered = suggestions.filter(s =>
                s.name.toLowerCase().startsWith(query.toLowerCase())
            ).slice(0, 5);
            setFilteredSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setFilteredSuggestions([]);
            setShowSuggestions(false);
        }
    }, [query, suggestions]);

    const handleSelect = (name) => {
        setQuery(name);
        setShowSuggestions(false);
        onSearch(name);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setShowSuggestions(false);
            onSearch(query);
        }
    }

    return (
        <div className="search-bar-container" ref={wrapperRef}>
            <div className="input-group">
                <input
                    type="text"
                    className="search-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Pokemon..."
                />
                <button className="search-button" onClick={() => onSearch(query)}>
                    Search
                </button>
            </div>
            {showSuggestions && filteredSuggestions.length > 0 && (
                <ul className="suggestions-list">
                    {filteredSuggestions.map((s) => (
                        <li key={s.name} onMouseDown={() => handleSelect(s.name)}>
                            {s.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
