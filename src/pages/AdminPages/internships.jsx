import React, { useState } from 'react';
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
    Grid,
    TextField,
    InputAdornment,
    TablePagination,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import InfoCard from '../../components/InfoCard';

// Mock internship data
const internshipsData = [
    { 
        id: 1, 
        title: 'Frontend React Developer', 
        company: 'TechCorp Inc.',
        type: 'Remote',
        duration: '3 months',
        stipend: '₹25,000',
        status: 'Open',
        applications: 15,
        slots: 2,
        posted: '2025-01-20',
        deadline: '2025-02-15'
    },
    { 
        id: 2, 
        title: 'Digital Marketing Specialist', 
        company: 'MarketPro Solutions',
        type: 'Hybrid',
        duration: '4 months',
        stipend: '₹18,000',
        status: 'Filled',
        applications: 28,
        slots: 1,
        posted: '2025-01-15',
        deadline: '2025-02-10'
    },
    { 
        id: 3, 
        title: 'UI/UX Designer', 
        company: 'Design Studio',
        type: 'On-site',
        duration: '6 months',
        stipend: '₹22,000',
        status: 'Pending Review',
        applications: 12,
        slots: 3,
        posted: '2025-01-18',
        deadline: '2025-02-20'
    },
    { 
        id: 4, 
        title: 'Python Data Analyst', 
        company: 'DataViz Corp',
        type: 'Remote',
        duration: '3 months',
        stipend: '₹30,000',
        status: 'Open',
        applications: 22,
        slots: 2,
        posted: '2025-01-22',
        deadline: '2025-02-25'
    },
    { 
        id: 5, 
        title: 'Full Stack Developer', 
        company: 'StartupXYZ',
        type: 'On-site',
        duration: '5 months',
        stipend: '₹35,000',
        status: 'Closed',
        applications: 45,
        slots: 1,
        posted: '2024-12-15',
        deadline: '2025-01-15'
    }
];

// Chart data
const statusDistributionData = [
    { name: 'Open', value: 8, color: '#10B981' },
    { name: 'Filled', value: 5, color: '#38BDF8' },
    { name: 'Pending Review', value: 3, color: '#F59E0B' },
    { name: 'Closed', value: 2, color: '#EF4444' }
];

const applicationTrendsData = [
    { month: 'Oct', applications: 45, placements: 8 },
    { month: 'Nov', applications: 52, placements: 12 },
    { month: 'Dec', applications: 38, placements: 7 },
    { month: 'Jan', applications: 67, placements: 15 },
    { month: 'Feb', applications: 55, placements: 11 }
];

const companyTypesData = [
    { type: 'Startup', count: 8 },
    { type: 'Corporate', count: 5 },
    { type: 'Agency', count: 4 },
    { type: 'Non-profit', count: 1 }
];

const Internships = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedInternship, setSelectedInternship] = useState(null);

    // Filter internships based on search term
    const filteredInternships = internshipsData.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuClick = (event, internship) => {
        setAnchorEl(event.currentTarget);
        setSelectedInternship(internship);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedInternship(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return '#10B981';
            case 'Filled': return '#38BDF8';
            case 'Pending Review': return '#F59E0B';
            case 'Closed': return '#EF4444';
            default: return '#94A3B8';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Remote': return '#A78BFA';
            case 'Hybrid': return '#38BDF8';
            case 'On-site': return '#10B981';
            default: return '#94A3B8';
        }
    };

    const totalInternships = internshipsData.length;
    const activeInternships = internshipsData.filter(i => i.status === 'Open' || i.status === 'Pending Review').length;
    const totalApplications = internshipsData.reduce((sum, i) => sum + i.applications, 0);
    const totalSlots = internshipsData.reduce((sum, i) => sum + i.slots, 0);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Internships Management
            </Typography>

            {/* Internship Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                            {totalInternships}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Internships
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                            {activeInternships}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Active Positions
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#A78BFA', fontWeight: 'bold' }}>
                            {totalApplications}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Applications
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                            {totalSlots}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Available Slots
                        </Typography>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Status Distribution Pie Chart */}
                <Grid item xs={12} lg={4}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Internship Status Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={statusDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {statusDistributionData.map((entry, index) => (
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

                {/* Application Trends Line Chart */}
                <Grid item xs={12} lg={8}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Monthly Application Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <LineChart data={applicationTrendsData}>
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

                {/* Company Types Bar Chart */}
                <Grid item xs={12} lg={12}>
                    <InfoCard sx={{ p: 3, height: 300 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Company Types Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={companyTypesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="type" stroke="#94A3B8" />
                                <YAxis stroke="#94A3B8" />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                                <Bar dataKey="count" fill="#A78BFA" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Internships Table */}
            <InfoCard>
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0' }}>
                            Internship Listings
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                placeholder="Search internships..."
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
                            <Button 
                                variant="contained" 
                                startIcon={<AddIcon />}
                                sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                            >
                                Add Internship
                            </Button>
                        </Box>
                    </Box>
                    
                    <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ '& .MuiTableCell-head': { color: '#94A3B8', borderColor: '#334155', fontWeight: 'bold' } }}>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Duration</TableCell>
                                    <TableCell>Stipend</TableCell>
                                    <TableCell>Applications</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredInternships
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((internship) => (
                                    <TableRow key={internship.id} sx={{ '& .MuiTableCell-body': { color: '#E2E8F0', borderColor: '#334155' } }}>
                                        <TableCell>
                                            <Box>
                                                <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>
                                                    {internship.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                                    {internship.slots} slot(s) • Deadline: {internship.deadline}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{internship.company}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={internship.type} 
                                                size="small" 
                                                sx={{ 
                                                    bgcolor: `${getTypeColor(internship.type)}20`, 
                                                    color: getTypeColor(internship.type),
                                                    border: `1px solid ${getTypeColor(internship.type)}40`
                                                }} 
                                            />
                                        </TableCell>
                                        <TableCell>{internship.duration}</TableCell>
                                        <TableCell>{internship.stipend}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>
                                                    {internship.applications}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                                    applications
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={internship.status} 
                                                size="small" 
                                                sx={{ 
                                                    bgcolor: `${getStatusColor(internship.status)}20`, 
                                                    color: getStatusColor(internship.status),
                                                    border: `1px solid ${getStatusColor(internship.status)}40`
                                                }} 
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                size="small" 
                                                onClick={(e) => handleMenuClick(e, internship)}
                                                sx={{ color: '#94A3B8' }}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    <TablePagination
                        component="div"
                        count={filteredInternships.length}
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

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: { bgcolor: '#1E293B', border: '1px solid #334155' }
                }}
            >
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>View Details</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>Edit</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>View Applications</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#EF4444' }}>Archive</MenuItem>
            </Menu>
        </Box>
    );
};

export default Internships;
