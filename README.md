# InternPortal

A comprehensive full-stack internship management portal featuring dual dashboards (Student & Admin), complete database integration, and real-time data synchronization. Built with React.js frontend and Express.js backend, powered by PostgreSQL database.

## 📋 Table of Contents
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

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd InternPortal
```

### 2. Install Dependencies
```bash
npm install
```

This will install all the required dependencies for both frontend and backend.

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

### 1. Create PostgreSQL Database

#### Option A: Using psql Command Line
```bash
# Using psql command line (replace YOUR_PASSWORD with your actual password)
psql -U postgres -c "CREATE DATABASE internportal;"
```

#### Option B: Using pgAdmin
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" and select "Create > Database..."
4. Enter `internportal` as the database name
5. Click "Save"

### 2. Populate Database with Sample Data

The application includes a comprehensive data seeding script that creates sample data for testing:

```bash
cd backend
node scripts/seedData.js
```

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

```bash
# Start frontend development server
npm start

# Start backend server
node backend/server.js

# Start backend with auto-restart (if nodemon is installed)
npx nodemon backend/server.js

# Build for production
npm run build

# Run tests
npm test

# Install additional dependencies
npm install <package-name>
```

## 🔧 Troubleshooting

### Common Issues:

1. **PostgreSQL Connection Error:**
   - Verify PostgreSQL is running
   - Check credentials in `.env` file
   - Ensure `internportal` database exists

2. **Port Already in Use:**
   - Frontend (3000): Close other React applications
   - Backend (5000): Change PORT in `.env` file

3. **Dependencies Issues:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
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

