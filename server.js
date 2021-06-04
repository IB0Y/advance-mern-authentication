// Modules
require('dotenv').config({path: "./config.env"});
const express = require('express');

// Definations
const app = express();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

app.use("/api/auth", require('./routes/auth'));

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
