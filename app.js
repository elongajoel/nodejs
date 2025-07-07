const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import de la configuration DB
require('./config/database');

// Import des routes
const indexRouter = require('./routes/index');
const kanbanRouter = require('./routes/kanban');

const app = express();
const PORT = 3000;

// Configuration CORS et body-parser
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/kanban', kanbanRouter);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  });

app.listen(PORT, () => {
  console.log(`Backend Kanban sur http://localhost:${PORT}`);
});
