import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, CircularProgress, Alert, Chip, Button, Grid } from '@mui/material';
import InfoCard from '../../components/InfoCard';
import { projectAPI } from '../../utils/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // For now, using a hardcoded student ID. In a real app, this would come from authentication context
    const studentId = 5; // tejo's ID from seed data

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await projectAPI.getByStudent(studentId);
            setProjects(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching projects:', err);
            setError('Failed to load projects. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return '#10B981';
        if (progress >= 60) return '#38BDF8';
        if (progress >= 40) return '#F59E0B';
        return '#EF4444';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return '#10B981';
            case 'In Progress': return '#38BDF8';
            case 'On Hold': return '#F59E0B';
            case 'Not Started': return '#94A3B8';
            case 'Cancelled': return '#EF4444';
            default: return '#94A3B8';
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
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
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Projects</Typography>
                <Alert severity="error">{error}</Alert>
                <Button onClick={fetchProjects} sx={{ mt: 2 }}>Retry</Button>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Projects</Typography>
            
            {projects.length > 0 ? (
                <Grid container spacing={3}>
                    {projects.map((project) => (
                        <Grid item xs={12} key={project.id}>
                            <InfoCard>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Box>
                                        <Typography variant="h6" sx={{ color: '#38BDF8' }}>{project.title}</Typography>
                                        <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
                                            Goal: {project.goal}
                                        </Typography>
                                    </Box>
                                    <Chip 
                                        label={project.status} 
                                        size="small" 
                                        sx={{ 
                                            bgcolor: `${getStatusColor(project.status)}20`, 
                                            color: getStatusColor(project.status),
                                            border: `1px solid ${getStatusColor(project.status)}40`
                                        }} 
                                    />
                                </Box>
                                
                                {project.description && (
                                    <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 2 }}>
                                        {project.description}
                                    </Typography>
                                )}
                                
                                {project.deliverables && project.deliverables.length > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 1 }}>Deliverables:</Typography>
                                        <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8' }}>
                                            {project.deliverables.map((deliverable, index) => (
                                                <li key={index}>{deliverable}</li>
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                                
                                {project.technologies && project.technologies.length > 0 && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#E2E8F0', mb: 1 }}>Technologies:</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {project.technologies.map((tech, index) => (
                                                <Chip 
                                                    key={index}
                                                    label={tech} 
                                                    size="small" 
                                                    variant="outlined"
                                                    sx={{ color: '#94A3B8', borderColor: '#94A3B8' }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                )}
                                
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                        Due: {formatDate(project.dueDate)}
                                    </Typography>
                                    {project.repositoryUrl && (
                                        <Button 
                                            size="small" 
                                            href={project.repositoryUrl} 
                                            target="_blank"
                                            sx={{ color: '#38BDF8' }}
                                        >
                                            View Repository
                                        </Button>
                                    )}
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Typography variant="body2" sx={{ color: '#E2E8F0', mr: 2 }}>
                                        Progress: {project.progress}%
                                    </Typography>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={project.progress} 
                                        sx={{ 
                                            flexGrow: 1, 
                                            height: 8, 
                                            borderRadius: 5,
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: getProgressColor(project.progress)
                                            }
                                        }} 
                                    />
                                </Box>
                            </InfoCard>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <InfoCard>
                    <Typography variant="body1" sx={{ color: '#94A3B8', textAlign: 'center', py: 4 }}>
                        No projects assigned yet. Projects will appear here as you progress through your courses.
                    </Typography>
                </InfoCard>
            )}
        </Box>
    );
};

export default Projects;