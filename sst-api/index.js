// index.js

const express = require('express');
const genreRoutes = require('./tables/genre');


const app = express();

app.use(express.json()); // Middleware pour parser le corps des requêtes en JSON


// Routes pour la table genre
app.use('/api', genreRoutes);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
