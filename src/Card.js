import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

const Card = () => {
    const location = useLocation();
    const artistName = location.state?.artistName || 'Unknown Artist';

    const fetchAccessToken = async () => {
        try {
            const response = await axios.post(
                "https://accounts.spotify.com/api/token",
                qs.stringify({
                    grant_type: "client_credentials",
                    client_id: "4c855c87fd5348fcafba2d20ad0e855e",
                    client_secret: "c9b3f252305d4369bbb6f6c167400767"
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            console.log(response.data);
            return response.data.access_token;
        } catch (e) {
            console.error(e);
        }
    };

    const fetchArtistID = async () => {
        const token = await fetchAccessToken();
        if (token) {
            console.log('Access Token:', token);
            try {
                const response = await axios.get(`https://api.spotify.com/v1/search`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: {
                        q: artistName,
                        type: 'track',
                        limit: 5
                    }
                });

                const tracks = response.data.tracks.items;

                // Extracting the ID of the first artist
                if (tracks.length > 0) {
                    const artistID = tracks[0].artists[0].id;
                    console.log('Artist ID:', artistID);
                    return artistID;
                } else {
                    console.log('No tracks found for this artist.');
                }
            } catch (e) {
                console.error('Error fetching artist ID:', e);
            }
        }
    };


    useEffect(() => {
        fetchArtistID();
    }, []);

    return (
        <div>
            <h1>Card Page</h1>
            <p>Artist Name: {artistName}</p>
        </div>
    );
};

export default Card;
