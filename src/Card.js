import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Card.css';
import { fetchArtistInfo } from "./fetchArtistInfo.js";

const Card = () => {
    const location = useLocation();
    const artistName = location.state?.artistName || 'Unknown Artist';

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
            await fetchArtistInfo(artistName);
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
