import React,{Component} from 'react';
import './Track.css';

class Track extends Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    //this.props.onAdd();
  }
 addTrack() {
   //console.log(this.props.id);
    this.props.onAdd(this.props.id);
 }
 removeTrack(){
   this.props.onRemove(this.props.id);
 }



  
  render(){
    const style = {
      visibility: 'hidden'
    }
    const style1 = {
      visibility: 'show'
    }
    
    if(this.props.isRemoval){
      style.visibility = 'hidden';
      style1.visibility = 'show';
    }else{
      style1.visibility = 'hidden';
      style.visibility='show'
    }
    return(
      <div className="Track">
      <div className="Track-information">
        <h3> {this.props.name} </h3>
        <p> {this.props.artist} | {this.props.album} | {this.props.id} </p>
      </div>
      <a className="Track-action">
        <button type="button" onClick = {this.addTrack}> + </button>
        <button type="button" onClick = {this.removeTrack}> - </button>
        
     </a>
      
    </div>
  )

  }
}


export default Track;
