import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      searchResults: [{
      name: '',
      artist: '',
      album: '',
      id: ''
    }],
    playlistName: '',
    playlistTrack: [{
      name: '',
      album: '',
      artist: '',
      id: ''
    }],
    
  }
}
  

  addTrack = (track) => {
    if(this.state.playlistTrack.find(sTrack => sTrack.id === track)){
      return;
    }else{
      const newTrack = this.state.playlistTrack;
      var temp_track = this.state.searchResults.find(sTrack => {
        if(sTrack.id === track)
            return sTrack;
          });
      newTrack.push(temp_track);
      this.setState({playlistTrack: newTrack});
    }
  }

  removeTrack = (track) =>{
    if(this.state.playlistTrack.find(sTrack => sTrack.id === track)){
      const newTrack = this.state.playlistTrack;
      const idx = this.state.playlistTrack.indexOf(track);
      newTrack.splice(idx,1);
      this.setState({playListTrack: newTrack});
    }
  }

  updatePlaylistName = (name) =>{
   
    var newName = name;
    this.setState({playlistName: newName});
  }
  
  savePlayList = ( newplaylist) =>{
     Spotify.savePlaylist(newplaylist);
     this.setState({
       playlist: '',
       playListTrack: []
     });
  }

  search=(newItem) =>{
    
    
    this.setState({srchRes: Spotify.search(newItem)});
     console.log('exit search'); 
    
  }
  
  

  render() {
    return (
      <div>
        
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
      <SearchBar onSearch={Spotify.search.bind(this)} />
    <div className="App-playlist">
      
      <SearchResults res = {this.state.searchResults} 
                     onAdd = {this.addTrack.bind(this)}/>
      <PlayList listname = {this.state.playlistName} 
                playlist ={this.state.playlistTrack} 
                onRemove ={this.removeTrack.bind(this)}
                onNameChange = {this.updatePlaylistName.bind(this)}
                onSave = {Spotify.savePlaylist.bind(this)}/>
      
    </div>
  </div>
      </div>
    );
  }
}

export default App;
