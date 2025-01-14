import {fetchAccessToken} from "./tokenFetch";
import {fetchArtistID} from "./artistIDFetch";

import axios from "axios";
const token = await fetchAccessToken();

export const fetchArtistInfo = async (artistName) => {

    if (!token) return;

    const artistID = await fetchArtistID(token, artistName);
    if (!artistID) return;

    const totalFolID = document.getElementById("totalFol");
    const artistImageID = document.getElementById("artImage");
    const artistNameID = document.getElementById("artistNameID");
    const genresListID = document.getElementById("genresList");
    const tracksListID = document.getElementById("tracksList");

    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        const totalFollowers = response.data.followers?.total || 0;
        const artistImageURL = response.data.images[0]?.url || '';
        const artistNameReal = response.data.name;
        const genres = response.data.genres || [];

        totalFolID.textContent = `${totalFollowers.toLocaleString(["ban", "id"])}`;
        artistNameID.textContent = artistNameReal;
        artistImageID.src = artistImageURL;

        if (genres.length > 0) {
            const limitedGenres = genres.slice(0, 3);
            genresListID.innerHTML = limitedGenres
                .map((genre) => `<li>${genre}</li>`)
                .join('');
        } else {
            genresListID.innerHTML = `<li>No genres available</li>`;
        }

        const responseTracks = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const topTracks = responseTracks.data.tracks || [];
        if (topTracks.length > 0) {
            const topFiveTracks = topTracks.slice(0, 3);
            tracksListID.innerHTML = topFiveTracks
                .map((track) => `<li>
                                                    <img src="${track.album.images[0].url}" alt="Track image"/>
                                                    <div>
                                                        <p>${track.name}</p>
                                                        <p>${track.artists[0].name}</p>
                                                    </div>     
                                               </li>`)
                .join('');
        } else {
            tracksListID.innerHTML = `<li>No tracks available</li>`;
        }


    } catch (error) {
        console.error('Error fetching artist info:', error);
    }
};