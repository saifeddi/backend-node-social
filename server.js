const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const postRoutes = require('./routes/posts');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/posts', postRoutes);

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/social_network', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connecté"))
    .catch((err) => console.log("Erreur de connexion MongoDB", err));

// Définir le port du serveur
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
