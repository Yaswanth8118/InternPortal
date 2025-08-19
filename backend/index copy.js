const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const sequelize = require('./models/index');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    // Sync models
    return sequelize.sync();
  })
  .then(() => console.log('Models synced'))
  .catch(err => console.error('PostgreSQL connection error:', err));

app.get('/', (req, res) => {
  res.send('Internship Management Backend Running');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
