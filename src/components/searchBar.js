import './searchBar.css';
import React from "react";

class SearchBar extends React.Component {
    constructor(props) {
        super(props)

        this.onInputCallback = props.inputCallback;
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {
        if (this.onInputCallback) this.onInputCallback(e.target.value);
    }
    render() {
        return (
            <input onChange={this.onChange} type="text" className="search-bar" placeholder="Search..." />
        );
    }
}

export default SearchBar;