import axios from "axios";
import {fetchAccessToken} from "./tokenFetch.js";

export const fetchArtistID = async (token, artistName) => {
    token = await fetchAccessToken()
    try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: { 'Authorization': `Bearer ${token}` },
            params: {
                q: artistName,
                type: 'artist',
                limit: 1,
            },
        });

        const artists = response.data.artists.items;
        if (artists.length > 0) {
            return artists[0].id;
        } else {
            console.error('No artist found for the given name.');
        }
    } catch (error) {
        console.error('Error fetching artist ID:', error);
    }
};
