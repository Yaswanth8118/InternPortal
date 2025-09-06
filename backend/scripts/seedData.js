require('dotenv').config({ path: '../../.env' });
const { 
  sequelize, 
  Student, 
  Course, 
  Company, 
  Internship, 
  StudentCourse, 
  Project, 
  Payment, 
  Application,
  Announcement 
} = require('../models/index');

const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await sequelize.sync({ force: true });

    // Create Students
    console.log('Creating students...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const students = await Student.bulkCreate([
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        password: hashedPassword,
        avatar: 'AJ',
        phone: '+91 9876543210',
        university: 'MIT',
        degree: 'Computer Science',
        graduationYear: 2025,
        skills: ['React', 'JavaScript', 'Node.js'],
        status: 'Active',
        overallProgress: 85,
        joinDate: new Date('2025-01-15')
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        password: hashedPassword,
        avatar: 'BS',
        phone: '+91 9876543211',
        university: 'Stanford',
        degree: 'Marketing',
        graduationYear: 2025,
        skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
        status: 'Active',
        overallProgress: 72,
        joinDate: new Date('2025-01-10')
      },
      {
        name: 'Carol Davis',
        email: 'carol.davis@email.com',
        password: hashedPassword,
        avatar: 'CD',
        phone: '+91 9876543212',
        university: 'Harvard',
        degree: 'Design',
        graduationYear: 2024,
        skills: ['UI/UX', 'Figma', 'Adobe Creative Suite'],
        status: 'Completed',
        overallProgress: 94,
        joinDate: new Date('2024-12-20')
      },
      {
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        password: hashedPassword,
        avatar: 'DW',
        phone: '+91 9876543213',
        university: 'Berkeley',
        degree: 'Computer Science',
        graduationYear: 2025,
        skills: ['Python', 'Data Science', 'Machine Learning'],
        status: 'Active',
        overallProgress: 45,
        joinDate: new Date('2025-01-20')
      },
      {
        name: 'tejo',
        email: 'tejohere6@gmail.com',
        password: hashedPassword,
        avatar: 'T',
        phone: '+91 9876543214',
        university: 'IIT Delhi',
        degree: 'Computer Engineering',
        graduationYear: 2025,
        skills: ['React', 'Node.js', 'Full Stack Development'],
        status: 'Active',
        overallProgress: 78,
        joinDate: new Date('2025-01-05')
      }
    ]);

    // Create Courses
    console.log('Creating courses...');
    const courses = await Course.bulkCreate([
      {
        title: 'React Fundamentals',
        description: 'Learn the basics of React development',
        instructor: 'John Doe',
        duration: '8 weeks',
        lessons: 24,
        difficulty: 'Beginner',
        category: 'Frontend Development',
        tags: ['React', 'JavaScript', 'Web Development'],
        price: 15000.00,
        isActive: true
      },
      {
        title: 'Digital Marketing Basics',
        description: 'Introduction to digital marketing strategies',
        instructor: 'Jane Smith',
        duration: '6 weeks',
        lessons: 18,
        difficulty: 'Beginner',
        category: 'Marketing',
        tags: ['Digital Marketing', 'SEO', 'Social Media'],
        price: 12000.00,
        isActive: true
      },
      {
        title: 'Advanced NodeJS',
        description: 'Master backend development with Node.js, Express, and MongoDB',
        instructor: 'Mike Johnson',
        duration: '10 weeks',
        lessons: 30,
        difficulty: 'Advanced',
        category: 'Backend Development',
        tags: ['Node.js', 'Express', 'MongoDB'],
        price: 18000.00,
        isActive: true
      },
      {
        title: 'UI/UX Design Principles',
        description: 'Learn the fundamentals of creating beautiful and user-friendly interfaces',
        instructor: 'Sarah Wilson',
        duration: '8 weeks',
        lessons: 20,
        difficulty: 'Intermediate',
        category: 'Design',
        tags: ['UI/UX', 'Design', 'Figma'],
        price: 16000.00,
        isActive: true
      },
      {
        title: 'Introduction to Python',
        description: 'Start your journey into programming and data science with Python',
        instructor: 'Robert Brown',
        duration: '6 weeks',
        lessons: 22,
        difficulty: 'Beginner',
        category: 'Programming',
        tags: ['Python', 'Programming', 'Data Science'],
        price: 14000.00,
        isActive: true
      }
    ]);

    // Create Companies
    console.log('Creating companies...');
    const companies = await Company.bulkCreate([
      {
        name: 'TechCorp Inc.',
        industry: 'Technology',
        size: 'Large (500+)',
        location: 'Bangalore',
        description: 'Leading technology company',
        website: 'https://techcorp.com',
        contactEmail: 'hr@techcorp.com',
        contactPhone: '+91 80 1234 5678',
        logo: 'TC',
        rating: 4.8,
        totalHired: 12,
        status: 'Active',
        joinedDate: new Date('2024-06-15')
      },
      {
        name: 'MarketPro Solutions',
        industry: 'Marketing',
        size: 'Medium (50-500)',
        location: 'Mumbai',
        description: 'Digital marketing agency',
        website: 'https://marketpro.com',
        contactEmail: 'jobs@marketpro.com',
        contactPhone: '+91 22 1234 5678',
        logo: 'MP',
        rating: 4.5,
        totalHired: 8,
        status: 'Active',
        joinedDate: new Date('2024-08-20')
      },
      {
        name: 'Design Studio',
        industry: 'Design',
        size: 'Small (10-50)',
        location: 'Pune',
        description: 'Creative design studio',
        website: 'https://designstudio.com',
        contactEmail: 'hello@designstudio.com',
        contactPhone: '+91 20 1234 5678',
        logo: 'DS',
        rating: 4.9,
        totalHired: 5,
        status: 'Active',
        joinedDate: new Date('2024-09-10')
      },
      {
        name: 'DataViz Corp',
        industry: 'Analytics',
        size: 'Medium (50-500)',
        location: 'Delhi',
        description: 'Data visualization and analytics company',
        website: 'https://dataviz.com',
        contactEmail: 'careers@dataviz.com',
        contactPhone: '+91 11 1234 5678',
        logo: 'DV',
        rating: 4.6,
        totalHired: 15,
        status: 'Active',
        joinedDate: new Date('2024-05-30')
      },
      {
        name: 'StartupXYZ',
        industry: 'Fintech',
        size: 'Small (10-50)',
        location: 'Hyderabad',
        description: 'Innovative fintech startup',
        website: 'https://startupxyz.com',
        contactEmail: 'team@startupxyz.com',
        contactPhone: '+91 40 1234 5678',
        logo: 'SX',
        rating: 4.2,
        totalHired: 3,
        status: 'Active',
        joinedDate: new Date('2024-03-12')
      }
    ]);

    // Create Internships
    console.log('Creating internships...');
    const internships = await Internship.bulkCreate([
      {
        title: 'Frontend React Developer',
        description: 'Work on exciting React projects',
        companyId: companies[0].id,
        type: 'Remote',
        duration: '3 months',
        stipend: '₹25,000',
        stipendAmount: 25000.00,
        slots: 2,
        filledSlots: 0,
        status: 'Open',
        requirements: ['React', 'JavaScript', 'Git'],
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        location: 'Bangalore',
        applicationDeadline: new Date('2025-02-15'),
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-06-01'),
        postedDate: new Date('2025-01-20'),
        applicationCount: 15,
        isActive: true
      },
      {
        title: 'Digital Marketing Specialist',
        description: 'Join our marketing team',
        companyId: companies[1].id,
        type: 'Hybrid',
        duration: '4 months',
        stipend: '₹18,000',
        stipendAmount: 18000.00,
        slots: 1,
        filledSlots: 1,
        status: 'Filled',
        requirements: ['Digital Marketing', 'SEO', 'Social Media'],
        skills: ['SEO', 'Content Marketing', 'Google Analytics'],
        location: 'Mumbai',
        applicationDeadline: new Date('2025-02-10'),
        startDate: new Date('2025-02-20'),
        endDate: new Date('2025-06-20'),
        postedDate: new Date('2025-01-15'),
        applicationCount: 28,
        isActive: true
      },
      {
        title: 'UI/UX Designer',
        description: 'Create beautiful user experiences',
        companyId: companies[2].id,
        type: 'On-site',
        duration: '6 months',
        stipend: '₹22,000',
        stipendAmount: 22000.00,
        slots: 3,
        filledSlots: 0,
        status: 'Pending Review',
        requirements: ['Figma', 'Adobe Creative Suite', 'Design Thinking'],
        skills: ['UI/UX', 'Figma', 'Prototyping'],
        location: 'Pune',
        applicationDeadline: new Date('2025-02-20'),
        startDate: new Date('2025-03-10'),
        endDate: new Date('2025-09-10'),
        postedDate: new Date('2025-01-18'),
        applicationCount: 12,
        isActive: true
      },
      {
        title: 'Python Data Analyst',
        description: 'Analyze data and create insights',
        companyId: companies[3].id,
        type: 'Remote',
        duration: '3 months',
        stipend: '₹30,000',
        stipendAmount: 30000.00,
        slots: 2,
        filledSlots: 0,
        status: 'Open',
        requirements: ['Python', 'Pandas', 'Data Analysis'],
        skills: ['Python', 'Data Analysis', 'SQL', 'Visualization'],
        location: 'Delhi',
        applicationDeadline: new Date('2025-02-25'),
        startDate: new Date('2025-03-15'),
        endDate: new Date('2025-06-15'),
        postedDate: new Date('2025-01-22'),
        applicationCount: 22,
        isActive: true
      }
    ]);

    // Create Student Course Enrollments
    console.log('Creating student course enrollments...');
    await StudentCourse.bulkCreate([
      {
        studentId: students[0].id, // Alice
        courseId: courses[0].id, // React Fundamentals
        progress: 80,
        status: 'In Progress',
        enrollmentDate: new Date('2025-01-16'),
        lastAccessedDate: new Date('2025-01-25')
      },
      {
        studentId: students[0].id, // Alice
        courseId: courses[3].id, // UI/UX Design
        progress: 60,
        status: 'In Progress',
        enrollmentDate: new Date('2025-01-18'),
        lastAccessedDate: new Date('2025-01-24')
      },
      {
        studentId: students[1].id, // Bob
        courseId: courses[1].id, // Digital Marketing
        progress: 50,
        status: 'In Progress',
        enrollmentDate: new Date('2025-01-12'),
        lastAccessedDate: new Date('2025-01-23')
      },
      {
        studentId: students[4].id, // tejo
        courseId: courses[0].id, // React Fundamentals
        progress: 75,
        status: 'In Progress',
        enrollmentDate: new Date('2025-01-06'),
        lastAccessedDate: new Date('2025-01-26')
      },
      {
        studentId: students[4].id, // tejo
        courseId: courses[2].id, // Advanced NodeJS
        progress: 45,
        status: 'In Progress',
        enrollmentDate: new Date('2025-01-08'),
        lastAccessedDate: new Date('2025-01-25')
      }
    ]);

    // Create Projects
    console.log('Creating projects...');
    await Project.bulkCreate([
      {
        title: 'Marketing Website Redesign',
        description: 'Complete redesign of company marketing website',
        studentId: students[4].id, // tejo
        courseId: courses[0].id, // React Fundamentals
        goal: 'Improve UI/UX and SEO',
        deliverables: ['Wireframes', 'SEO Audit', 'Final Implementation'],
        progress: 60,
        status: 'In Progress',
        startDate: new Date('2025-01-10'),
        dueDate: new Date('2025-03-10'),
        technologies: ['React', 'CSS', 'JavaScript'],
        repositoryUrl: 'https://github.com/tejo/marketing-redesign'
      },
      {
        title: 'E-commerce Dashboard',
        description: 'Analytics dashboard for e-commerce platform',
        studentId: students[0].id, // Alice
        courseId: courses[0].id, // React Fundamentals
        goal: 'Create comprehensive analytics dashboard',
        deliverables: ['User Research', 'Dashboard Design', 'Implementation'],
        progress: 75,
        status: 'In Progress',
        startDate: new Date('2025-01-15'),
        dueDate: new Date('2025-02-28'),
        technologies: ['React', 'Chart.js', 'Material-UI']
      },
      {
        title: 'Social Media Campaign',
        description: 'Digital marketing campaign for product launch',
        studentId: students[1].id, // Bob
        courseId: courses[1].id, // Digital Marketing
        goal: 'Increase brand awareness and engagement',
        deliverables: ['Campaign Strategy', 'Content Creation', 'Performance Report'],
        progress: 80,
        status: 'In Progress',
        startDate: new Date('2025-01-12'),
        dueDate: new Date('2025-02-20'),
        technologies: ['Google Analytics', 'Social Media Tools']
      }
    ]);

    // Create Payments
    console.log('Creating payments...');
    await Payment.bulkCreate([
      {
        studentId: students[4].id, // tejo
        courseId: courses[0].id, // React Fundamentals
        invoiceId: 'INV-003',
        description: 'React Fundamentals Course Fee',
        amount: 15000.00,
        currency: 'INR',
        status: 'Paid',
        paymentMethod: 'Credit Card',
        paymentGateway: 'Razorpay',
        transactionId: 'TXN123456789',
        paymentDate: new Date('2025-01-07'),
        paidAmount: 15000.00,
        createdDate: new Date('2025-01-06')
      },
      {
        studentId: students[4].id, // tejo
        invoiceId: 'INV-002',
        description: 'Digital Marketing Internship Deposit',
        amount: 5000.00,
        currency: 'INR',
        status: 'Paid',
        paymentMethod: 'UPI',
        paymentGateway: 'Razorpay',
        transactionId: 'TXN987654321',
        paymentDate: new Date('2024-12-20'),
        paidAmount: 5000.00,
        createdDate: new Date('2024-12-19')
      },
      {
        studentId: students[4].id, // tejo
        invoiceId: 'INV-001',
        description: 'Platform Registration Fee',
        amount: 500.00,
        currency: 'INR',
        status: 'Paid',
        paymentMethod: 'Net Banking',
        paymentGateway: 'Razorpay',
        transactionId: 'TXN456789123',
        paymentDate: new Date('2024-12-10'),
        paidAmount: 500.00,
        createdDate: new Date('2024-12-09')
      }
    ]);

    // Create Applications
    console.log('Creating applications...');
    await Application.bulkCreate([
      {
        studentId: students[0].id, // Alice
        internshipId: internships[0].id, // Frontend React Developer
        status: 'Applied',
        appliedDate: new Date('2025-01-21'),
        coverLetter: 'I am excited to apply for this position...',
        resume: 'alice-resume.pdf',
        portfolio: 'https://alice-portfolio.com'
      },
      {
        studentId: students[1].id, // Bob
        internshipId: internships[1].id, // Digital Marketing Specialist
        status: 'Accepted',
        appliedDate: new Date('2025-01-16'),
        coverLetter: 'I have strong experience in digital marketing...',
        resume: 'bob-resume.pdf',
        score: 85,
        reviewedBy: 'HR Manager',
        reviewedDate: new Date('2025-01-20')
      },
      {
        studentId: students[4].id, // tejo
        internshipId: internships[0].id, // Frontend React Developer
        status: 'Under Review',
        appliedDate: new Date('2025-01-22'),
        coverLetter: 'I am passionate about React development...',
        resume: 'tejo-resume.pdf',
        portfolio: 'https://tejo-portfolio.com'
      }
    ]);

    // Create Announcements
    console.log('Creating announcements...');
    await Announcement.bulkCreate([
      {
        title: 'Welcome to Fall 2025 Program',
        content: 'Welcome to the Fall 2025 internship program!',
        type: 'General',
        priority: 'High',
        targetAudience: 'Students',
        createdBy: 'Admin',
        isActive: true,
        publishDate: new Date('2025-01-01')
      },
      {
        title: 'Complete Your Profile',
        content: 'Please complete your profile information by the end of the week.',
        type: 'System',
        priority: 'Medium',
        targetAudience: 'Students',
        createdBy: 'System',
        isActive: true,
        publishDate: new Date('2025-01-15')
      },
      {
        title: 'New Internship Opportunities',
        content: 'Check out the latest internship opportunities from our partner companies.',
        type: 'Internship',
        priority: 'Medium',
        targetAudience: 'Students',
        createdBy: 'Admin',
        isActive: true,
        publishDate: new Date('2025-01-20')
      }
    ]);

    console.log('Database seeded successfully!');
    console.log(`Created:
    - ${students.length} students
    - ${courses.length} courses  
    - ${companies.length} companies
    - ${internships.length} internships
    - 5 student course enrollments
    - 3 projects
    - 3 payments
    - 3 applications
    - 3 announcements`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run the seed function
seedData();
