import React from 'react';
import { useLocation } from 'react-router-dom';

const Card = () => {
    const location = useLocation();
    const artistName = location.state?.artistName || 'Unknown Artist';

    return (
        <div>
            <h1>Card Page</h1>
            <p>Artist Name: {artistName}</p>
        </div>
    );
}

export default Card;
