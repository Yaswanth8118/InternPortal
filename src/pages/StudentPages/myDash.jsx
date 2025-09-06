import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import InfoCard from '../../components/InfoCard';
import { dashboardAPI, announcementAPI } from '../../utils/api';

const MyDash = ({ setActiveSection }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // For now, using a hardcoded student ID. In a real app, this would come from authentication context
    const studentId = 5; // tejo's ID from seed data

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [dashData, announcementData] = await Promise.all([
                    dashboardAPI.getStudentDashboard(studentId),
                    announcementAPI.getRecent('Students', 5)
                ]);
                
                setDashboardData(dashData.data);
                setAnnouncements(announcementData.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [studentId]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Dashboard</Typography>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    const { upcomingDeadlines = [], stats = {} } = dashboardData || {};

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Dashboard</Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                <InfoCard sx={{ flex: '2 1 400px' }}>
                    <Typography variant="h6" sx={{ color: '#A78BFA' }} gutterBottom>Upcoming Deadlines</Typography>
                    {upcomingDeadlines.length > 0 ? (
                        <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8', listStyleType: 'disc' }}>
                            {upcomingDeadlines.map((project, index) => (
                                <li key={index}>
                                    {project.title} - <strong>Due {formatDate(project.dueDate)}</strong>
                                </li>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                            No upcoming deadlines
                        </Typography>
                    )}
                </InfoCard>

                <InfoCard sx={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#38BDF8', mb: 2 }}>Continue Your Course</Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2 }}>
                        {stats.totalCourses || 0} courses enrolled
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => setActiveSection('courses')}
                        sx={{ bgcolor: '#38BDF8', '&:hover': { bgcolor: '#0EA5E9' } }}
                    >
                        Jump Back In
                    </Button>
                </InfoCard>
            </Box>

            <InfoCard>
                <Typography variant="h6" sx={{ color: '#38BDF8' }} gutterBottom>Recent Announcements</Typography>
                {announcements.length > 0 ? (
                    <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8', listStyleType: 'disc' }}>
                        {announcements.map((announcement) => (
                            <li key={announcement.id}>
                                <strong>{announcement.title}:</strong> {announcement.content}
                            </li>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                        No recent announcements
                    </Typography>
                )}
            </InfoCard>
        </Box>
    );
};

export default MyDash;