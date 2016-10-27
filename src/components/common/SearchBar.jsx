import React, { Component } from 'react';
import Avatar from '../common/PersonAvatar';

const SearchBar = ({ SearchBar }) =>{

    return (
        <form action="#">
            <div className="SearchBar-container mdl-textfield mdl-js-textfield">
                <input className="mdl-textfield__input" type="text" id="searchBar" />
                <label className="SearchBar-label mdl-textfield__label" htmlFor="searchBar">Search...</label>
            </div>
        </form>
    );
}

export default SearchBar;