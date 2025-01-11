import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function loadElements() {
    let maindiv = document.getElementById("maindiv");
    maindiv.style.opacity = "1";
}

const Main = () => {
    const [artistName, setArtistName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadElements();
    }, []);

    const handleInputChange = (e) => {
        setArtistName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            navigate("/card", { state: { artistName } });
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="App" id="maindiv">
            <header className="App-header">
                <h1><span className="logo-spot">Spotify®</span> Card Maker</h1>
                <form className="form-artist" onSubmit={handleSubmit}>
                    <input type="text" id="artist-name" className="artist-input"
                           placeholder="Which artist you want to make card of?" value={artistName}
                           onChange={handleInputChange} required/>
                    <input type="submit" id="button-get" className="artist-button" value="MAKE"/>
                </form>
            </header>
            <footer className="App-footer">
                All rights belong to Spotify AB, Regeringsgatan 19, 111 53, Stockholm, Sweden
            </footer>
        </div>
    );
}

export default Main;
