// Importeren van de express module in node_modules
const express = require('express');
const Database = require('./classes/database.js')


// Aanmaken van een express app
const app = express();

const db = new Database();
db.getQuery('SELECT * FROM artists').then((rows) => {
    console.log(rows);
});

// Endpoints
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/artists', (req, res) => {
    const db = new Database();
    db.getQuery(`
        SELECT
            song_id, s.name AS songname, a.name AS artistname
        FROM 
            songs AS s
	            INNER JOIN
                    artists AS A
                        on s.artist_id = a.artist_id;`).then((songs) => {
        res.send(songs);
    });
});

// Starten van de server en op welke port de server moet luistere
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});