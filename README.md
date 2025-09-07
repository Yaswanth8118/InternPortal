# InternPortal

A comprehensive full-stack internship management portal featuring dual dashboards (Student & Admin), complete database integration, and real-time data synchronization. Built with React.js frontend and Express.js backend, powered by PostgreSQL database.

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing the Integration](#testing-the-integration)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ⚡ Quick Start

**Want to get up and running fast? Follow these steps:**

```bash
# 1. Clone and install dependencies
git clone <repository-url>
cd InternPortal
npm install
cd backend && npm install && cd ..

# 2. Setup PostgreSQL database
psql -U postgres -c "CREATE DATABASE internportal;"

# 3. Create .env file with your PostgreSQL password
echo "PG_URI=postgresql://postgres:YOUR_PASSWORD@localhost:5432/internportal" > .env
echo "JWT_SECRET=your_jwt_secret_key_here" >> .env
echo "PORT=5000" >> .env

# 4. Seed database with sample data
cd backend
node scripts/seedData.js
cd ..

# 5. Start both servers (requires 2 terminals)
# Terminal 1: Backend
cd backend && node server.js

# Terminal 2: Frontend  
npm start
```

**Access the app:** http://localhost:3000

**Test accounts:**
- Student: `john.doe@email.com` / `password123`
- Admin: `admin@internportal.com` / `admin123`

*For detailed setup instructions, see the sections below.*

## 🎯 Project Overview

InternPortal is a comprehensive internship management system that allows students to apply for internships and administrators to manage the internship process. The application provides user authentication, role-based access control, and a modern, responsive user interface.

## 🛠️ Tech Stack

**Frontend:**
- React.js 19.1.1
- Material-UI (MUI) 7.3.1
- React Router DOM 7.8.1
- Emotion (Styled Components)

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- bcryptjs (Password Hashing)
- JSON Web Tokens (JWT)

**Database:**
- PostgreSQL

**Development Tools:**
- React Scripts
- dotenv

## ✨ Features

### 🔐 Authentication & Security
- **User Authentication**: Secure signup and login system
- **Role-Based Access**: Student and Admin dashboards with different permissions
- **Password Security**: Encrypted password storage using bcryptjs
- **JWT Authentication**: Secure token-based authentication

### 📊 Student Dashboard
- **My Dashboard**: Real-time overview with upcoming deadlines and announcements
- **My Courses**: Course enrollment, progress tracking, and available courses
- **My Projects**: Project management with progress visualization and deliverables
- **Billing & Payments**: Complete payment history and transaction summaries
- **Profile Management**: Personal information and academic details

### 👨‍💼 Admin Dashboard
- **Overview**: Comprehensive analytics and key performance indicators
- **Student Management**: View, edit, and manage student records and progress
- **Internship Management**: Create, manage, and track internship opportunities
- **Company Management**: Partner company profiles and relationships
- **Analytics**: Data visualization and reporting tools
- **Profile Management**: Admin account settings

### 🗄️ Database Integration
- **PostgreSQL Database**: Complete data persistence with relational structure
- **Sequelize ORM**: Advanced database operations with model relationships
- **Real-time Synchronization**: Changes reflect instantly across all dashboards
- **Data Seeding**: Sample data for testing and development
- **CRUD Operations**: Full Create, Read, Update, Delete functionality

### 🎨 User Interface
- **Material-UI Components**: Modern, responsive design system
- **Dark Theme**: Professional dark mode interface
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Comprehensive error messages and recovery
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 🔗 API Architecture
- **RESTful API**: Clean, organized API endpoints
- **Model Relationships**: Proper foreign key relationships and associations
- **Data Validation**: Server-side validation and constraints
- **Error Handling**: Comprehensive API error responses

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)
- **PostgreSQL** (v10 or higher)
- **Git** (for version control)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd InternPortal
```

### 2. Install Dependencies

#### Frontend Dependencies
```bash
# Install frontend dependencies
npm install
```

#### Backend Dependencies
```bash
# Navigate to backend folder and install dependencies
cd backend
npm install
cd ..
```

This will install all the required dependencies for both frontend and backend applications.

## ⚙️ Configuration

### 1. Environment Variables
Create a `.env` file in the root directory with the following configuration:

```env
# PostgreSQL Database Configuration
PG_URI=postgresql://postgres:YOUR_PASSWORD@localhost:5432/internportal

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# Server Port
PORT=5000
```

**Important**: Replace `YOUR_PASSWORD` with your actual PostgreSQL password.

## 🗄️ Database Setup

### 1. Install and Setup PostgreSQL

#### Windows:
1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer and follow the setup wizard
3. Remember your superuser password (you'll need it for the `.env` file)
4. Default port is 5432 (keep this unless you have conflicts)

#### macOS:
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Linux:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 2. Create PostgreSQL Database

#### Option A: Using psql Command Line
```bash
# Windows (using psql from PostgreSQL installation)
psql -U postgres -c "CREATE DATABASE internportal;"

# macOS/Linux
sudo -u postgres psql -c "CREATE DATABASE internportal;"
```

#### Option B: Using pgAdmin (Recommended for Windows users)
1. Open pgAdmin (installed with PostgreSQL)
2. Connect to your PostgreSQL server (usually localhost)
3. Right-click on "Databases" and select "Create > Database..."
4. Enter `internportal` as the database name
5. Click "Save"

### 3. Populate Database with Sample Data

The application includes a comprehensive data seeding script that creates sample data for testing:

```bash
# Make sure you're in the project root directory
cd backend
node scripts/seedData.js
```

**Note**: Make sure your `.env` file is properly configured before running the seed script.

**Expected Output:**
```
Clearing existing data...
Creating students...
Creating courses...
Creating companies...
Creating internships...
Creating student course enrollments...
Creating projects...
Creating payments...
Creating applications...
Creating announcements...
Database seeded successfully!
Created:
    - 5 students
    - 5 courses
    - 5 companies
    - 4 internships
    - 5 student course enrollments
    - 3 projects
    - 3 payments
    - 3 applications
    - 3 announcements
```

### 3. Database Models Created

The seeding script creates the following database tables and relationships:

- **Students**: Student profiles with academic information
- **Courses**: Available courses with instructors and pricing
- **Companies**: Partner companies offering internships
- **Internships**: Available internship positions
- **Student_Courses**: Many-to-many relationship for course enrollments
- **Projects**: Student projects with progress tracking
- **Payments**: Payment history and transactions
- **Applications**: Internship applications and their status
- **Announcements**: System and course announcements

## 🚀 Running the Application

### Method 1: Run Both Servers Separately (Recommended for Development)

#### Step 1: Start the Backend Server
Open a terminal/command prompt and navigate to the backend folder:

```bash
# Windows Command Prompt
cd backend
node server.js

# Or if you have nodemon installed globally
npm install -g nodemon
nodemon server.js
```

**Expected Output:**
```
PostgreSQL connected
All models synced successfully
Server running on port 5000
```

#### Step 2: Start the Frontend Server
Open a **NEW** terminal/command prompt in the project root:

```bash
# Make sure you're in the project root (not in backend folder)
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view internportal in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Method 2: Using Concurrent Servers (Advanced)

If you want to run both servers with a single command:

```bash
# Install concurrently globally
npm install -g concurrently

# Add this script to your package.json
"scripts": {
  "dev": "concurrently \"npm run backend\" \"npm start\"",
  "backend": "cd backend && node server.js"
}

# Then run both servers
npm run dev
```

### Accessing the Application

Once both servers are running:

1. **Frontend**: Open your browser and go to `http://localhost:3000`
2. **Backend API**: Available at `http://localhost:5000`
3. **Database**: PostgreSQL running on `localhost:5432`

### Default Login Credentials

After running the seed script, you can use these test accounts:

**Student Account:**
- Email: `john.doe@email.com`
- Password: `password123`
- Role: Student

**Admin Account:**
- Email: `admin@internportal.com`
- Password: `admin123`
- Role: Admin

## 🔍 Testing the Integration

### 1. Authentication Testing

1. Navigate to http://localhost:3000
2. Click "Sign Up" to create a new account
3. Fill in the required fields, select "Student" role
4. Submit the form
5. Log in with your new credentials

### 2. Student Dashboard Testing

Once logged in as a student, test the following features to verify database integration:

#### Dashboard Overview
- Verify announcements are loading from database
- Confirm upcoming deadlines are showing real data

#### Courses Page
- View available courses (pulled from database)
- Enroll in a course and verify it appears in "My Courses" section
- Verify course details match database records

#### Projects Page
- View assigned projects (loaded from database)
- Check project deadlines and progress
- Create a new project submission

#### Billing Page
- Verify payment history shows real database records
- Confirm payment status (paid/unpaid) is accurate
- Test payment method storage

### 3. Admin Dashboard Testing

Log out and log back in with admin credentials to test:

#### Admin Overview
- Verify student count matches database
- Confirm course enrollment statistics
- Check recent payment analytics

#### Student Management
- View list of students from database
- Modify a student record and verify changes persist
- Create a new student account

#### Course Management
- View all courses from database
- Add a new course and verify it appears in student dashboard
- Update course details

### 4. Real-time Synchronization Testing

To test real-time synchronization between dashboards:

1. Open two browser windows side by side
2. Log in as admin in one window and student in the other
3. As admin, create a new announcement
4. Verify it appears in the student dashboard
5. As admin, update a course detail
6. Verify changes reflect in student's course view

## 📡 API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Backend status check |
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/login` | User login |

### Signup Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

### Login Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

## 🗃️ Database Schema

### Users Table
| Column | Type | Constraints |
|--------|------|--------------|
| id | SERIAL | PRIMARY KEY |
| name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| password | VARCHAR(255) | NOT NULL |
| role | ENUM('student', 'admin') | DEFAULT 'student' |
| createdAt | TIMESTAMP | NOT NULL |
| updatedAt | TIMESTAMP | NOT NULL |

## 📁 Project Structure

```
InternPortal/
│
├── backend/
│   ├── models/
│   │   ├── index.js          # Database connection
│   │   └── User.js           # User model
│   ├── routes/
│   │   └── auth.js           # Authentication routes
│   └── server.js             # Main server file
│
├── src/                      # React frontend source
├── public/                   # Public assets
├── node_modules/             # Dependencies
│
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked dependency versions
└── README.md                # This file
```

## 🛠️ Development Commands

### Frontend Commands (run in project root)
```bash
# Start React development server
npm start                    # Starts on http://localhost:3000

# Build for production
npm run build               # Creates optimized production build

# Run tests
npm test                    # Runs the test suite

# Install frontend dependencies
npm install <package-name>
```

### Backend Commands (run in backend/ folder)
```bash
# Start backend server
node server.js              # Starts on http://localhost:5000

# Start with auto-restart (recommended for development)
npx nodemon server.js       # Auto-restarts on file changes

# Seed database with sample data
node scripts/seedData.js    # Populates database with test data

# Install backend dependencies
cd backend
npm install <package-name>
```

### Useful Development Tools
```bash
# Install nodemon globally for auto-restart
npm install -g nodemon

# Install concurrently to run both servers together
npm install -g concurrently

# Check if ports are in use
# Windows:
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# macOS/Linux:
lsof -ti:3000
lsof -ti:5000
```

## 🔧 Troubleshooting

### Common Issues and Solutions:

#### 1. **PostgreSQL Connection Error**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solutions:**
- Verify PostgreSQL service is running:
  ```bash
  # Windows: Check Services or
  pg_ctl status -D "C:\Program Files\PostgreSQL\15\data"
  
  # macOS:
  brew services list | grep postgresql
  
  # Ubuntu/Linux:
  sudo systemctl status postgresql
  ```
- Check credentials in `.env` file match your PostgreSQL setup
- Ensure `internportal` database exists
- Verify PostgreSQL is running on port 5432

#### 2. **Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
Error: listen EADDRINUSE: address already in use :::5000
```
**Solutions:**
- **Frontend (3000)**: Close other React applications or change port:
  ```bash
  # Windows:
  set PORT=3001 && npm start
  
  # macOS/Linux:
  PORT=3001 npm start
  ```
- **Backend (5000)**: Change PORT in `.env` file or kill the process:
  ```bash
  # Windows:
  netstat -ano | findstr :5000
  taskkill /PID <PID_NUMBER> /F
  
  # macOS/Linux:
  lsof -ti:5000 | xargs kill -9
  ```

#### 3. **Dependencies Issues**
```
Module not found errors or version conflicts
```
**Solutions:**
```bash
# Frontend dependencies
rm -rf node_modules package-lock.json
npm install

# Backend dependencies
cd backend
rm -rf node_modules package-lock.json
npm install
cd ..

# Clear npm cache if issues persist
npm cache clean --force
```

#### 4. **Database Seeding Fails**
```
Error: Database connection failed during seeding
```
**Solutions:**
- Ensure PostgreSQL is running and accessible
- Check your `.env` file configuration
- Verify database `internportal` exists
- Run seeding script from backend directory:
  ```bash
  cd backend
  node scripts/seedData.js
  ```

#### 5. **React App Won't Start**
```
Error: Cannot resolve dependency tree
```
**Solutions:**
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps

# Or force the installation
npm install --force

# Clear React cache
npx react-scripts start --reset-cache
```

#### 6. **API Calls Failing (CORS Errors)**
```
Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Solutions:**
- Ensure backend server is running on port 5000
- Check that CORS is properly configured in `backend/server.js`
- Verify API endpoints are correct in frontend code

#### 7. **Environment Variables Not Loading**
```
Undefined environment variables
```
**Solutions:**
- Ensure `.env` file is in the project root (not in backend folder)
- Check `.env` file format (no spaces around `=`)
- Restart both servers after changing `.env`
- Example correct format:
  ```env
  PG_URI=postgresql://postgres:yourpassword@localhost:5432/internportal
  JWT_SECRET=your_secret_here
  PORT=5000
  ```

### Getting Help

If you're still experiencing issues:

1. **Check the console logs** in both terminal windows
2. **Open browser developer tools** (F12) and check the Console and Network tabs
3. **Verify all services are running**:
   - PostgreSQL service
   - Backend server (port 5000)
   - Frontend server (port 3000)
4. **Test database connection** independently using a tool like pgAdmin

### System Requirements Check

```bash
# Check versions
node --version     # Should be v14 or higher
npm --version      # Should be v6 or higher
psql --version     # Should be v10 or higher

# Check if required ports are available
telnet localhost 5432  # PostgreSQL
telnet localhost 5000  # Backend (should fail if not running)
telnet localhost 3000  # Frontend (should fail if not running)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- Material-UI for the component library
- Sequelize for the ORM
- Express.js for the backend framework
- React team for the frontend framework

---

**Happy Coding! 🚀**

