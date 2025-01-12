import React, { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './Card.css';

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
                    client_secret: "c9b3f252305d4369bbb6f6c167400767",
                }),
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }
            );
            return response.data.access_token;
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };

    const fetchArtistID = async (token) => {
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

    const fetchArtistInfo = async () => {
        const token = await fetchAccessToken();
        if (!token) return;

        const artistID = await fetchArtistID(token);
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

            totalFolID.textContent = `${totalFollowers}`;
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
                                                    <p>${track.name}</p>
                                               </li>`)
                    .join('');
            } else {
                tracksListID.innerHTML = `<li>No tracks available</li>`;
            }


        } catch (error) {
            console.error('Error fetching artist info:', error);
        }
    };

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const initializeCard = async () => {
            await fetchArtistInfo();
            document.getElementById("card").classList.add("loaded");
        };
        initializeCard();
    }, []);

    return (
        <div className="main-card">
            <div className="card" id="card">
                <img id="artImage" src="#" alt="Artist image" className="artist-img"/>
                <p className="artist-name" id="artistNameID">{artistName}</p>
                <div className="artist-grids">
                    <div className="grid-1">
                        <p className="card-header">Total followers:</p>
                        <p id="totalFol" className="card-par"></p>
                    </div>
                    <div className="grid-2">
                        <p className="card-header">Artist genres:</p>
                        <ul id="genresList" className="genres-list"></ul>
                    </div>
                </div>
                <p className="card-header">Top tracks:</p>
                <ul id="tracksList" className="tracks-list"></ul>
                <h3><span className="logo-spot">Spotify®</span> Card Maker</h3>
            </div>
            <button className="return-button" onClick={handleSubmit}>Exit</button>
        </div>
    );
};

export default Card;
