import React, {Component} from 'react';
import './SearchBar.css';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state={
      term: 'term'
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  search(){
    console.log('inside searchbar search method');
    this.props.onSearch(this.state.term);

  }

  handleTermChange(e){
    
     const newValue = e.target.value;
     this.setState({term: newValue});
  }

  render(){

    return(
      <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
      <a onClick={this.search}>SEARCH</a>
    </div>
  );

  }
}

export default SearchBar;
