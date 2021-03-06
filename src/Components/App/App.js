import React from 'react';
import { SearchBar } from  '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';



export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.state = { 
      searchResults: [],
  playlistName: 'My playlist1',
  playlistTracks:[],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }


  addTrack (track) {
    if (this.state.playlistTracks.find(playlistTrack => track.id === playlistTrack.id)) {
      return;
    } else {
      let playlistTracks = [...this.state.playlistTracks, track]
      this.setState( playlistTracks)
    }
  }
  
  removeTrack (track) {
    if (this.state.playlistTracks.find(playlistTrack => track.id === playlistTrack.id)){
      
      const playlistTracks = this.state.playlistTracks.splice(track)
      this.setState({
          playlistTracks
        })
    }
  }

  updatePlaylistName (name) {
    this.setState(
      {
        playlistName: name
      }
    )
  }

  savePlaylist () {
    let trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri)
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search (searchTerm){
    Spotify.search(searchTerm)
            .then((searchResults) => {
              this.setState({searchResults: searchResults})
            });
  }

  render() {

    return (
  
       <div>
            <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                  <SearchBar onSearch={this.search} />
                  <div className="App-playlist">
                    <SearchResults 
                                    searchResults={this.state.searchResults}
                                    onAdd={this.addTrack} />
                    <Playlist 
                        playlistName={this.state.playlistName} 
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
                                                        />
                  </div>
                </div>
        </div>
      
    )
  }

} 


