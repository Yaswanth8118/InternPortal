import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Avatar,
    Grid,
    TextField,
    InputAdornment,
    TablePagination,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InfoCard from '../../components/InfoCard';
import { studentAPI } from '../../utils/api';

// Mock student data - fallback if API fails
const mockStudentsData = [
    { 
        id: 1, 
        name: 'Alice Johnson', 
        email: 'alice.johnson@email.com', 
        program: 'React Development',
        progress: 85,
        status: 'Active',
        joinDate: '2025-01-15',
        avatar: 'AJ'
    },
    { 
        id: 2, 
        name: 'Bob Smith', 
        email: 'bob.smith@email.com', 
        program: 'Digital Marketing',
        progress: 72,
        status: 'Active',
        joinDate: '2025-01-10',
        avatar: 'BS'
    },
    { 
        id: 3, 
        name: 'Carol Davis', 
        email: 'carol.davis@email.com', 
        program: 'UI/UX Design',
        progress: 94,
        status: 'Completed',
        joinDate: '2024-12-20',
        avatar: 'CD'
    },
    { 
        id: 4, 
        name: 'David Wilson', 
        email: 'david.wilson@email.com', 
        program: 'Python Development',
        progress: 45,
        status: 'Active',
        joinDate: '2025-01-20',
        avatar: 'DW'
    },
    { 
        id: 5, 
        name: 'Eva Martinez', 
        email: 'eva.martinez@email.com', 
        program: 'Data Analytics',
        progress: 0,
        status: 'Inactive',
        joinDate: '2025-01-05',
        avatar: 'EM'
    },
    { 
        id: 6, 
        name: 'Frank Brown', 
        email: 'frank.brown@email.com', 
        program: 'Node.js Development',
        progress: 67,
        status: 'Active',
        joinDate: '2025-01-12',
        avatar: 'FB'
    },
    { 
        id: 7, 
        name: 'Grace Lee', 
        email: 'grace.lee@email.com', 
        program: 'React Development',
        progress: 88,
        status: 'Active',
        joinDate: '2024-12-28',
        avatar: 'GL'
    },
    { 
        id: 8, 
        name: 'Henry Taylor', 
        email: 'henry.taylor@email.com', 
        program: 'Digital Marketing',
        progress: 15,
        status: 'Dropped Out',
        joinDate: '2024-12-15',
        avatar: 'HT'
    }
];

// Chart data
const programEnrollmentData = [
    { name: 'React Development', value: 25, color: '#38BDF8' },
    { name: 'Digital Marketing', value: 20, color: '#10B981' },
    { name: 'UI/UX Design', value: 15, color: '#A78BFA' },
    { name: 'Python Development', value: 12, color: '#F59E0B' },
    { name: 'Data Analytics', value: 10, color: '#EF4444' },
    { name: 'Node.js Development', value: 8, color: '#8B5CF6' },
];

const progressDistributionData = [
    { range: '0-20%', count: 12 },
    { range: '21-40%', count: 8 },
    { range: '41-60%', count: 15 },
    { range: '61-80%', count: 18 },
    { range: '81-100%', count: 22 },
];

const Students = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [studentsData, setStudentsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch students data from API
    const fetchStudentsData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await studentAPI.getAll();
            if (response.data) {
                setStudentsData(response.data);
            }
        } catch (err) {
            console.error('Error fetching students:', err);
            setError('Failed to load students data');
            // Fallback to mock data if API fails
            setStudentsData(mockStudentsData);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchStudentsData();
    }, []);

    // Listen for profile updates
    useEffect(() => {
        const handleProfileUpdate = (event) => {
            const { studentId, profileData } = event.detail;
            setStudentsData(prevData => 
                prevData.map(student => 
                    student.id === studentId 
                        ? { ...student, ...profileData, name: profileData.fullName }
                        : student
                )
            );
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);
        return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
    }, []);

    // Filter students based on search term
    const filteredStudents = studentsData.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.program.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#10B981';
            case 'Completed': return '#38BDF8';
            case 'Inactive': return '#F59E0B';
            case 'Dropped Out': return '#EF4444';
            default: return '#94A3B8';
        }
    };

    const getProgressColor = (progress) => {
        if (progress >= 80) return '#10B981';
        if (progress >= 60) return '#38BDF8';
        if (progress >= 40) return '#F59E0B';
        return '#EF4444';
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Students Management
            </Typography>

            {/* Student Statistics */}
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                            {studentsData.length}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Students
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                            {studentsData.filter(s => s.status === 'Active').length}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Active Students
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#A78BFA', fontWeight: 'bold' }}>
                            {studentsData.filter(s => s.status === 'Completed').length}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Graduates
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                            {Math.round(studentsData.reduce((sum, s) => sum + s.progress, 0) / studentsData.length)}%
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Avg Progress
                        </Typography>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Program Enrollment Chart */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Program Enrollment Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={programEnrollmentData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {programEnrollmentData.map((entry, index) => (
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

                {/* Progress Distribution Chart */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Student Progress Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={progressDistributionData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="range" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Bar dataKey="count" fill="#38BDF8" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Student Table */}
            <InfoCard>
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0' }}>
                            Student List
                        </Typography>
                        <TextField
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            size="small"
                            sx={{ minWidth: 300 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#94A3B8' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    
                    <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ '& .MuiTableCell-head': { color: '#94A3B8', borderColor: '#334155', fontWeight: 'bold' } }}>
                                    <TableCell>Student</TableCell>
                                    <TableCell>Program</TableCell>
                                    <TableCell>Progress</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Join Date</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredStudents
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((student) => (
                                    <TableRow key={student.id} sx={{ '& .MuiTableCell-body': { color: '#E2E8F0', borderColor: '#334155' } }}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ width: 40, height: 40, bgcolor: '#38BDF8' }}>
                                                    {student.avatar}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>
                                                        {student.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                                        {student.email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{student.program}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Box 
                                                    sx={{ 
                                                        width: 60, 
                                                        height: 8, 
                                                        bgcolor: '#334155', 
                                                        borderRadius: 4, 
                                                        overflow: 'hidden' 
                                                    }}
                                                >
                                                    <Box 
                                                        sx={{ 
                                                            width: `${student.progress}%`, 
                                                            height: '100%', 
                                                            bgcolor: getProgressColor(student.progress),
                                                            transition: 'width 0.3s'
                                                        }} 
                                                    />
                                                </Box>
                                                <Typography variant="body2" sx={{ color: getProgressColor(student.progress), fontWeight: 'medium' }}>
                                                    {student.progress}%
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={student.status} 
                                                size="small" 
                                                sx={{ 
                                                    bgcolor: `${getStatusColor(student.status)}20`, 
                                                    color: getStatusColor(student.status),
                                                    border: `1px solid ${getStatusColor(student.status)}40`
                                                }} 
                                            />
                                        </TableCell>
                                        <TableCell>{student.joinDate}</TableCell>
                                        <TableCell align="center">
                                            <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                                                View
                                            </Button>
                                            <Button size="small" variant="text">
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <TablePagination
                        component="div"
                        count={filteredStudents.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ 
                            color: '#94A3B8',
                            '& .MuiTablePagination-selectIcon': { color: '#94A3B8' },
                            '& .MuiTablePagination-displayedRows': { color: '#94A3B8' }
                        }}
                    />
                </Box>
            </InfoCard>
        </Box>
    );
};

export default Students;
