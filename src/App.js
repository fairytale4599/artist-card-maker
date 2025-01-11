import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './Main';
import Card from './Card';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/card" element={<Card />} />
        </Routes>
    );
}

export default App;
