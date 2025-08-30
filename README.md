# InternPortal

A full-stack web application for managing internship programs, built with React.js frontend and Express.js backend, connected to PostgreSQL database.

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
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

- **User Authentication**: Secure signup and login system
- **Role-Based Access**: Student and Admin roles
- **Password Security**: Encrypted password storage using bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Database Integration**: PostgreSQL with Sequelize ORM
- **Responsive UI**: Modern Material-UI components
- **RESTful API**: Clean API structure

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

### 2. Database Setup

#### Create Database:
```bash
# Using psql command line (replace YOUR_PASSWORD with your actual password)
psql -U postgres -c "CREATE DATABASE internportal;"
```

#### Or using pgAdmin:
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Create a new database named `internportal`

## 🏃‍♂️ Running the Application

### Option 1: Using VS Code Split Terminal (Recommended)

1. **Open VS Code** and navigate to the project directory
2. **Open Terminal** (`Ctrl + ` ` or `View > Terminal`)
3. **Start Frontend**:
   ```bash
   npm start
   ```
4. **Split Terminal** (`Ctrl + Shift + 5`) and **Start Backend**:
   ```bash
   node backend/server.js
   ```

### Option 2: Using Two Separate Terminal Windows

**Terminal 1 (Frontend):**
```bash
cd C:\CHV\InternPortal
npm start
```

**Terminal 2 (Backend):**
```bash
cd C:\CHV\InternPortal
node backend/server.js
```

### ✅ Expected Output

**Frontend Terminal:**
```
Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Backend Terminal:**
```
Server running on port 5000
PostgreSQL connected
Models synced
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work

## 🙏 Acknowledgments

- Material-UI for the component library
- Sequelize for the ORM
- Express.js for the backend framework
- React team for the frontend framework

---

**Happy Coding! 🚀**

For any questions or issues, please contact [your-email@example.com](mailto:your-email@example.com)
