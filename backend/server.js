const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 

// Route pour récupérer toutes les tâches
app.get('/api/tasks', (req, res) => {
    // Code pour récupérer les tâches depuis la base de données ou autre source
    res.json({ tasks: [] }); // Exemple de réponse JSON
});

// Route pour créer une nouvelle tâche
app.post('/api/tasks', (req, res) => {
    // Code pour créer une nouvelle tâche dans la base de données
    res.json({ message: 'Task created successfully' }); // Exemple de réponse JSON
});

// Port d'écoute du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
