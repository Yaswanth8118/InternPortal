import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, Button, Divider, CircularProgress, Alert, Snackbar } from '@mui/material';
import InfoCard from '../../components/InfoCard';
import { courseAPI } from '../../utils/api';

const MyCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [enrollLoading, setEnrollLoading] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // For now, using a hardcoded student ID. In a real app, this would come from authentication context
    const studentId = 5; // tejo's ID from seed data

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const [enrolledData, availableData] = await Promise.all([
                courseAPI.getEnrolled(studentId),
                courseAPI.getAvailable(studentId)
            ]);
            
            setEnrolledCourses(enrolledData.data);
            setAvailableCourses(availableData.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Failed to load courses. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        try {
            setEnrollLoading(courseId);
            await courseAPI.enroll(studentId, courseId);
            
            // Refresh courses data
            await fetchCourses();
            setSuccessMessage('Successfully enrolled in course!');
        } catch (err) {
            console.error('Error enrolling in course:', err);
            setError('Failed to enroll in course. Please try again.');
        } finally {
            setEnrollLoading(null);
        }
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return '#10B981';
        if (progress >= 60) return '#38BDF8';
        if (progress >= 40) return '#F59E0B';
        return '#EF4444';
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Courses</Typography>
                <Alert severity="error">{error}</Alert>
                <Button onClick={fetchCourses} sx={{ mt: 2 }}>Retry</Button>
            </Box>
        );
    }

    return (
        <Box>
            {/* --- Section for Enrolled Courses --- */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Courses</Typography>
            {enrolledCourses.length > 0 ? (
                <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column', mb: 5 }}>
                    {enrolledCourses.map((enrollment) => {
                        const course = enrollment.course;
                        return (
                            <InfoCard key={enrollment.id}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="h6" sx={{ color: '#38BDF8' }}>{course.title}</Typography>
                                    <Button variant="contained" size="small">Continue Course</Button>
                                </Box>
                                <Typography variant="body2" sx={{ color: '#94A3B8', mb: 0.5 }}>
                                    Instructor: {course.instructor} | {course.lessons} Lessons | Status: {enrollment.status}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={enrollment.progress} 
                                        sx={{ 
                                            flexGrow: 1, 
                                            height: 8, 
                                            borderRadius: 5,
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: getProgressColor(enrollment.progress)
                                            }
                                        }} 
                                    />
                                    <Typography variant="body2" sx={{ ml: 2, color: getProgressColor(enrollment.progress), fontWeight: 'bold' }}>
                                        {enrollment.progress}%
                                    </Typography>
                                </Box>
                            </InfoCard>
                        );
                    })}
                </Box>
            ) : (
                <Box sx={{ mb: 5 }}>
                    <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                        You haven't enrolled in any courses yet. Explore available courses below!
                    </Typography>
                </Box>
            )}

            {/* --- Section for Other Available Courses --- */}
            <Divider sx={{ borderColor: '#334155', my: 3 }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mt: 4 }}>Explore Other Courses</Typography>
            {availableCourses.length > 0 ? (
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
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Typography variant="body2" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                                    ₹{course.price}
                                </Typography>
                                <Button 
                                    variant="outlined" 
                                    onClick={() => handleEnroll(course.id)}
                                    disabled={enrollLoading === course.id}
                                    sx={{ mt: 'auto' }}
                                >
                                    {enrollLoading === course.id ? 'Enrolling...' : 'Enroll Now'}
                                </Button>
                            </Box>
                        </InfoCard>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" sx={{ color: '#94A3B8' }}>
                    No additional courses available at the moment.
                </Typography>
            )}
            
            <Snackbar
                open={!!successMessage}
                autoHideDuration={6000}
                onClose={() => setSuccessMessage('')}
                message={successMessage}
            />
        </Box>
    );
};

export default MyCourses;