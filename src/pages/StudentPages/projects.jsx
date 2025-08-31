import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import InfoCard from '../../components/InfoCard';

const Projects = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Projects</Typography>
            <InfoCard>
                <Typography variant="h6" sx={{ color: '#38BDF8' }}>Marketing Website Redesign</Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8' }}>Goal: Improve UI/UX and SEO</Typography>
                <Typography variant="body2" sx={{ mt: 2, color: '#E2E8F0' }}>Deliverables:</Typography>
                <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8' }}>
                    <li>Wireframes</li>
                    <li>SEO Audit</li>
                    <li>Final Implementation</li>
                </Box>
                <Typography variant="body2" sx={{ mt: 2.5, mb: 1, color: '#E2E8F0' }}>Task Progress: 60%</Typography>
                <LinearProgress variant="determinate" value={60} />
            </InfoCard>
        </Box>
    );
};

export default Projects;