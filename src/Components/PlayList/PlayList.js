import React ,{Component} from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';


class playlist extends Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

onSave1(){
  this.props.onSave(this.props.listname,this.props.playlist);
}

onRemove(){
  this.props.onRemove();
}
handleNameChange(e) {
    const newName = e.target.value;
    this.props.onChange(newName);
 }

 
render(){ 
   
        return(
            <div className="Playlist">
            <input placeholder="New Playlist" onChange = {this.handleNameChange} value={this.props.listname}/>
            <TrackList tracks = {this.props.playlist } onRemove = {this.props.onRemove} isRemoval = {true}/>
            <a className="Playlist-save" onClick = {this.onSave1}>SAVE TO SPOTIFY</a>
          </div>


        );
    
}
}

export default playlist;
