const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Endpoint to get the movie list from JSON file
app.get('/api/movies', (req, res) => {
    const movies = JSON.parse(fs.readFileSync('path/to/your/movies.json', 'utf-8'));
    res.json(movies);
});

// Endpoint to serve movie files
app.get('/movies/:filename', (req, res) => {
    const moviePath = path.join(__dirname, 'movies', req.params.filename);
    res.sendFile(moviePath);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
