import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
    }

    handleTermChange (e) {
        const handleTerm = e.target.value;
        this.setState({
            searchTerm: handleTerm 
        });
    }


    search () {
        this.props.onSearch(this.state.searchTerm)
    }

    render () {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist"  
                        onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.props.search}>SEARCH</button>
            </div>
        )
        
    }
};