
let userAccessToken ; 
const clientID = '0f1cc4ac9f46414d8c00196d8417fd63';
const redirectURI = 'http://localhost:3000/'

const Spotify = {
    getAccessToken () {
        if (userAccessToken) {
            return userAccessToken ;
        }
            // check for an access token 
            const userAccessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&*])/);
        
            if (userAccessTokenMatch && expiresInMatch) {
                userAccessToken = userAccessTokenMatch[1]
                const expiresIn = Number(expiresInMatch[1])
                // This clears the parameters , allowing us to grab a new access token when it expires.
                window.setTimeout(() => userAccessToken = '',expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                
            } else {
                window.location = `https://accounts.4spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
            }
    },
    search (userSearchTerm) {
        fetch(`https://api.spotify.com/v1/search?type=track&q=${userSearchTerm}`,{
            
            headers: {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
                    .then((response) => {
                        console.log(response)
                        if (!response.ok){
                            throw Error('could not fetch the data for that resource')
                        }
                        return response.json();
                    })
                    .then((jsonResponse) => {
                        if(!jsonResponse.tracks) {
                            return [];
                        }
                        return jsonResponse.tracks.items.map(track => ({
                            id:track.id,
                            name: track.name,
                            artist: track.artist[0].name,
                            album: track.album.name,
                            uri: track.uri
                        }));
                    })
                    .catch((error) => {
                        console.log(error.message);
                    })
    },

    // Created method to save plaist unto Spotify using fetch() 
    savePlaylist (playlistName,trackURIs) {
        if (!playlistName || trackURIs.length ) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let usersID;
        fetch('https://api.spotify.com/v1/me', {headers: headers,})
                .then((response) => {
                    console.log(response)
                    if (!response.ok){
                        throw Error('could not fetch the data for that resource')
                    }
                    response.json()
                })
                .then(jsonResponse =>  {
                    usersID = jsonResponse.id
                    return fetch(`https://api.spotify.com/v1/users/${usersID}/playlists`,
                    {   header: headers,
                        method: 'POST',
                        body: JSON.stringify({name: playlistName })
                    })
                })
                .then((response) => {
                    if (!response.ok){
                        throw Error('Could not fetch the data for that resource')
                    }
                    response.json()
                    })
                .then(jsonResponse => {
                    const playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${usersID}/playlist/${playlistID}/tracks`,{
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackURIs})
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                })
                

    }
}




export default Spotify 