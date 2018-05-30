import React,{Component} from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends Component{
   constructor(props){
       super(props);

   }  

   render(){
    //console.log('tracks in tacklist:'+this.props.tracks.length);
    if(this.props.tracks){
        //console.log('inside tracklist tracks');
        var resTrack = this.props.tracks.map((track) => {
            console.log("album in tracklist"+track.artist);
            return(
                <div>
                    <Track 
                    key={track.id}
                    name={track.name}
                    artist={track.artist}
                    album={track.album}
                    id={track.id}
                    onAdd = {this.props.onAdd}
                    onRemove = {this.props.onRemove}
                    isRemoval = {this.props.isRemoval}/>
                </div>    
            )
            
        })
        //console.log('restrack length'+resTrack.length);
    }


       return(
        
        <div className="TrackList">
           {resTrack}
      </div>
       )
   }
}



export default TrackList;