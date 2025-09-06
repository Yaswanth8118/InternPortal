const sequelize = require('../config/database');

// Import models
const User = require('./User');
const Student = require('./Student');
const Course = require('./Course');
const Company = require('./Company');
const Internship = require('./Internship');
const StudentCourse = require('./StudentCourse');
const Project = require('./Project');
const Application = require('./Application');
const Payment = require('./Payment');
const Announcement = require('./Announcement');

// Define associations

// Student relationships
Student.hasMany(StudentCourse, { foreignKey: 'studentId', as: 'enrollments' });
Student.hasMany(Project, { foreignKey: 'studentId', as: 'projects' });
Student.hasMany(Application, { foreignKey: 'studentId', as: 'applications' });
Student.hasMany(Payment, { foreignKey: 'studentId', as: 'payments' });

// Course relationships
Course.hasMany(StudentCourse, { foreignKey: 'courseId', as: 'enrollments' });
Course.hasMany(Project, { foreignKey: 'courseId', as: 'projects' });
Course.hasMany(Payment, { foreignKey: 'courseId', as: 'payments' });
Course.hasMany(Announcement, { foreignKey: 'courseId', as: 'announcements' });

// Company relationships
Company.hasMany(Internship, { foreignKey: 'companyId', as: 'internships' });
Company.hasMany(Announcement, { foreignKey: 'companyId', as: 'announcements' });

// Internship relationships
Internship.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Internship.hasMany(Application, { foreignKey: 'internshipId', as: 'applications' });
Internship.hasMany(Project, { foreignKey: 'internshipId', as: 'projects' });
Internship.hasMany(Payment, { foreignKey: 'internshipId', as: 'payments' });

// StudentCourse relationships
StudentCourse.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
StudentCourse.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });

// Project relationships
Project.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Project.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Project.belongsTo(Internship, { foreignKey: 'internshipId', as: 'internship' });

// Application relationships
Application.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Application.belongsTo(Internship, { foreignKey: 'internshipId', as: 'internship' });

// Payment relationships
Payment.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });
Payment.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Payment.belongsTo(Internship, { foreignKey: 'internshipId', as: 'internship' });

// Announcement relationships
Announcement.belongsTo(Course, { foreignKey: 'courseId', as: 'course' });
Announcement.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });

module.exports = {
  sequelize,
  User,
  Student,
  Course,
  Company,
  Internship,
  StudentCourse,
  Project,
  Application,
  Payment,
  Announcement
};
