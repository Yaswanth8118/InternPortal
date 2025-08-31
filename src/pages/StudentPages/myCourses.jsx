import React from 'react';
import { Box, Typography, LinearProgress, Button, Divider } from '@mui/material';
import InfoCard from '../../components/InfoCard';

// Mock data for courses the student is currently enrolled in
const enrolledCourses = [
    { 
        id: 1, 
        title: 'React Fundamentals', 
        instructor: 'John Doe', 
        lessons: 24,
        progress: 80 
    },
    { 
        id: 2, 
        title: 'Digital Marketing Basics', 
        instructor: 'Jane Smith', 
        lessons: 18,
        progress: 50 
    },
];

// Mock data for other courses available on the platform
const availableCourses = [
    { id: 3, title: 'Advanced NodeJS', description: 'Master backend development with Node.js, Express, and MongoDB.' },
    { id: 4, title: 'UI/UX Design Principles', description: 'Learn the fundamentals of creating beautiful and user-friendly interfaces.' },
    { id: 5, title: 'Introduction to Python', description: 'Start your journey into programming and data science with Python.' },
];

const MyCourses = () => {
    return (
        <Box>
            {/* --- Section for Enrolled Courses --- */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Courses</Typography>
            <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', mb: 5 }}>
                {enrolledCourses.map((course) => (
                    <InfoCard key={course.id}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h6" sx={{ color: '#38BDF8' }}>{course.title}</Typography>
                            <Button variant="contained" size="small">Continue Course</Button>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 0.5 }}>
                            Instructor: {course.instructor} | {course.lessons} Lessons
                        </Typography>
                        <LinearProgress variant="determinate" value={course.progress} sx={{ mt: 1.5, height: 8, borderRadius: 5 }} />
                    </InfoCard>
                ))}
            </Box>

            {/* --- Section for Other Available Courses --- */}
            <Divider sx={{ borderColor: '#334155', my: 3 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>Explore Other Courses</Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 3,
            }}>
                {availableCourses.map((course) => (
                    <InfoCard key={course.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', flexGrow: 1 }}>{course.title}</Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', my: 2, flexGrow: 1 }}>
                            {course.description}
                        </Typography>
                        <Button variant="outlined" sx={{ mt: 'auto' }}>Enroll Now</Button>
                    </InfoCard>
                ))}
            </Box>
        </Box>
    );
};

export default MyCourses;