import React from 'react';
import './Track.css';


export class Track extends React.Component {
  constructor (props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.renderAction = this.renderAction(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  
  
  render() {
    return (


    <div class="Track">
        <div class="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist}  {this.props.track.album}</p>
          
        </div>
        {this.renderAction}
    </div>
    );
  }

  renderAction () {
    return (
      <div>
        {(this.props.isRemoval)
        ? <button className='Track-action' onClick={this.removeTrack}> - </button>
        : <button className='Track-action' onClick={this.addTrack}> + </button>
        }


      </div>
      
    );
  }

  addTrack() {
    return this.props.onAdd(this.props.track);
  }
  removeTrack () {
    return this.props.onRemove(this.props.track);
  }
};
