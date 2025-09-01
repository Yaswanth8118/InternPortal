import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import InfoCard from '../../components/InfoCard';

// Mock data for charts
const studentEnrollmentData = [
    { name: 'Active Students', value: 42, color: '#38BDF8' },
    { name: 'Completed', value: 28, color: '#10B981' },
    { name: 'Inactive', value: 12, color: '#F59E0B' },
    { name: 'Dropped Out', value: 6, color: '#EF4444' },
];

const internshipStatusData = [
    { name: 'Open Positions', value: 15, color: '#38BDF8' },
    { name: 'Filled', value: 23, color: '#10B981' },
    { name: 'Pending Review', value: 8, color: '#F59E0B' },
    { name: 'Closed', value: 5, color: '#94A3B8' },
];

const monthlyApplicationsData = [
    { month: 'Jan', applications: 45, placements: 12 },
    { month: 'Feb', applications: 52, placements: 15 },
    { month: 'Mar', applications: 61, placements: 18 },
    { month: 'Apr', applications: 58, placements: 16 },
    { month: 'May', applications: 67, placements: 20 },
    { month: 'Jun', applications: 72, placements: 22 },
];

const skillDemandData = [
    { skill: 'React', demand: 85 },
    { skill: 'Python', demand: 78 },
    { skill: 'Node.js', demand: 72 },
    { skill: 'UI/UX', demand: 68 },
    { skill: 'Marketing', demand: 65 },
    { skill: 'Data Analytics', demand: 60 },
];

const Overview = () => {
    const totalStudents = studentEnrollmentData.reduce((sum, item) => sum + item.value, 0);
    const totalInternships = internshipStatusData.reduce((sum, item) => sum + item.value, 0);
    const placementRate = ((23 / totalInternships) * 100).toFixed(1);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Admin Dashboard Overview
            </Typography>
            
            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                            {totalStudents}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Students
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                            {totalInternships}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Internships
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#A78BFA', fontWeight: 'bold' }}>
                            {placementRate}%
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Placement Rate
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                            15
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Active Companies
                        </Typography>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3}>
                {/* Student Enrollment Pie Chart */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Student Enrollment Status
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={studentEnrollmentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {studentEnrollmentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Internship Status Pie Chart */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Internship Status Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={internshipStatusData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {internshipStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Monthly Applications Line Chart */}
                <Grid item xs={12} lg={8}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Monthly Applications & Placements
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <LineChart data={monthlyApplicationsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="month" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="applications" 
                                    stroke="#38BDF8" 
                                    strokeWidth={3}
                                    name="Applications"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="placements" 
                                    stroke="#10B981" 
                                    strokeWidth={3}
                                    name="Placements"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>

                {/* Skill Demand Bar Chart */}
                <Grid item xs={12} lg={4}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            In-Demand Skills
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={skillDemandData} layout="horizontal">
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" stroke="#94A3B8" />
                                <YAxis dataKey="skill" type="category" stroke="#94A3B8" width={80} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Bar dataKey="demand" fill="#A78BFA" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Overview;
