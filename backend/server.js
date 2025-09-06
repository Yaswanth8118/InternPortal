const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');
const models = require('./models/index');
const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    // Sync models with force: false to preserve existing data
    return sequelize.sync({ force: false, alter: true });
  })
  .then(() => console.log('All models synced successfully'))
  .catch(err => console.error('PostgreSQL connection error:', err));

app.get('/', (req, res) => {
  res.send('Internship Management Backend Running');
});

// Import all routes
const studentsRoutes = require('./routes/students');
const coursesRoutes = require('./routes/courses');
const internshipsRoutes = require('./routes/internships');
const companiesRoutes = require('./routes/companies');
const projectsRoutes = require('./routes/projects');
const paymentsRoutes = require('./routes/payments');
const announcementsRoutes = require('./routes/announcements');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/internships', internshipsRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/announcements', announcementsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
