import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

const searchresults = (props) =>{
   
        return(
            <div className="SearchResults">
            <h2>Results</h2>
            <TrackList tracks = {props.res} onAdd ={props.onAdd} isRemoval = {false}/>
          </div>
        );
    
}

export default searchresults;
