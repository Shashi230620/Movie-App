import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Player from "./Website/Player"
import Fetching from './Website/Fetching';
import "./Website/Website.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Fetching />} />
        <Route path="/player" element={<Player />} />
      </Routes>
    </>
  );
}

export default App;
