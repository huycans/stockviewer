import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type SearchBarType = {
  value: string;
  onChange: (event: React.ChangeEvent) => void;
  // onKeyUp: () => void;
  handleSearch: () => void;
  label: string;
  searchBarId: string;
  placeholder: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder,
  label,
  searchBarId,
  handleSearch
}: SearchBarType) {
  const handleKeyPressed = (event: React.KeyboardEvent) => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === "Enter" || event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      handleSearch();
    }
  };
  return (
    <div className="row searchBar">
      <div className="col-2 blank"></div>
      <div className="col-8">
        <label className="search-label" htmlFor={searchBarId}>
          {label}
        </label>
        <input
          value={value}
          id={searchBarId}
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          onKeyUp={handleKeyPressed}
        />
        <button className="searchBtn" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="col-2 blank"></div>
    </div>
  );
}
