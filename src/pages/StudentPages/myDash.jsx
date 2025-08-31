import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import InfoCard from '../../components/InfoCard'; // Assuming InfoCard is in src/components/

const MyDash = ({ setActiveSection }) => { // Pass setActiveSection to make the button work
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Dashboard</Typography>
            
            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
                <InfoCard sx={{ flex: '2 1 400px' }}>
                    <Typography variant="h6" sx={{ color: '#A78BFA' }} gutterBottom>Upcoming Deadlines</Typography>
                    <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8', listStyleType: 'disc' }}>
                        <li>React Fundamentals: Final Quiz - <strong>Due Sep 5, 2025</strong></li>
                        <li>Marketing Project: Wireframe Submission - <strong>Due Sep 8, 2025</strong></li>
                    </Box>
                </InfoCard>

                <InfoCard sx={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#38BDF8', mb: 2 }}>Continue Your Course</Typography>
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
                <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8', listStyleType: 'disc' }}>
                    <li>Welcome to the Fall 2025 internship program!</li>
                    <li>Please complete your profile information by the end of the week.</li>
                </Box>
            </InfoCard>
        </Box>
    );
};

export default MyDash;