const express = require('express');
const { path } = require('express/lib/application');
const connectDB = require('./backend/database/db');
require('dotenv').config();
const app = express();
const bp = require('body-parser');

connectDB();

app.get('/', (req, res) => res.json({ msg: 'Welcome to FutHub' }));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/users', require('./backend/routes/usersRoute'));
// app.use('/user', require('./backend/routes/usersRoute'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
