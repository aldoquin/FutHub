const express = require('express');
const { path } = require('express/lib/application');
const connectDB = require('./backend/database/db');
require('dotenv').config();
const app = express();

connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to FutHub' }));

app.use('/api/users', require('./backend/routes/users'));
app.use('/api/auth', require('./backend/routes/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
