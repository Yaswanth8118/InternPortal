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
    Avatar,
    Grid,
    TextField,
    InputAdornment,
    TablePagination,
    IconButton,
    Menu,
    MenuItem,
    Card,
    CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import InfoCard from '../../components/InfoCard';

// Mock companies data
const companiesData = [
    { 
        id: 1, 
        name: 'TechCorp Inc.',
        industry: 'Technology',
        size: 'Large (500+)',
        location: 'Bangalore',
        activeInternships: 3,
        totalHired: 12,
        rating: 4.8,
        status: 'Active',
        joinedDate: '2024-06-15',
        logo: 'TC',
        contact: 'hr@techcorp.com'
    },
    { 
        id: 2, 
        name: 'MarketPro Solutions',
        industry: 'Marketing',
        size: 'Medium (50-500)',
        location: 'Mumbai',
        activeInternships: 2,
        totalHired: 8,
        rating: 4.5,
        status: 'Active',
        joinedDate: '2024-08-20',
        logo: 'MP',
        contact: 'jobs@marketpro.com'
    },
    { 
        id: 3, 
        name: 'Design Studio',
        industry: 'Design',
        size: 'Small (10-50)',
        location: 'Pune',
        activeInternships: 1,
        totalHired: 5,
        rating: 4.9,
        status: 'Active',
        joinedDate: '2024-09-10',
        logo: 'DS',
        contact: 'hello@designstudio.com'
    },
    { 
        id: 4, 
        name: 'DataViz Corp',
        industry: 'Analytics',
        size: 'Medium (50-500)',
        location: 'Delhi',
        activeInternships: 2,
        totalHired: 15,
        rating: 4.6,
        status: 'Active',
        joinedDate: '2024-05-30',
        logo: 'DV',
        contact: 'careers@dataviz.com'
    },
    { 
        id: 5, 
        name: 'StartupXYZ',
        industry: 'Fintech',
        size: 'Small (10-50)',
        location: 'Hyderabad',
        activeInternships: 0,
        totalHired: 3,
        rating: 4.2,
        status: 'Inactive',
        joinedDate: '2024-03-12',
        logo: 'SX',
        contact: 'team@startupxyz.com'
    }
];

// Chart data
const industryDistributionData = [
    { name: 'Technology', value: 35, color: '#38BDF8' },
    { name: 'Marketing', value: 20, color: '#10B981' },
    { name: 'Design', value: 15, color: '#A78BFA' },
    { name: 'Analytics', value: 12, color: '#F59E0B' },
    { name: 'Fintech', value: 10, color: '#EF4444' },
    { name: 'Others', value: 8, color: '#94A3B8' }
];

const companySizeData = [
    { size: 'Small (10-50)', count: 12 },
    { size: 'Medium (50-500)', count: 8 },
    { size: 'Large (500+)', count: 5 },
    { size: 'Enterprise (1000+)', count: 2 }
];

const partnershipMetricsData = [
    { metric: 'Reliability', value: 85 },
    { metric: 'Communication', value: 78 },
    { metric: 'Compensation', value: 82 },
    { metric: 'Learning Opportunities', value: 90 },
    { metric: 'Work Environment', value: 75 },
    { metric: 'Growth Potential', value: 88 }
];

const Companies = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    // Filter companies based on search term
    const filteredCompanies = companiesData.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuClick = (event, company) => {
        setAnchorEl(event.currentTarget);
        setSelectedCompany(company);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedCompany(null);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#10B981';
            case 'Inactive': return '#F59E0B';
            case 'Suspended': return '#EF4444';
            default: return '#94A3B8';
        }
    };

    const getSizeColor = (size) => {
        if (size.includes('Small')) return '#A78BFA';
        if (size.includes('Medium')) return '#38BDF8';
        if (size.includes('Large')) return '#10B981';
        return '#F59E0B';
    };

    const totalCompanies = companiesData.length;
    const activeCompanies = companiesData.filter(c => c.status === 'Active').length;
    const totalInternships = companiesData.reduce((sum, c) => sum + c.activeInternships, 0);
    const totalHired = companiesData.reduce((sum, c) => sum + c.totalHired, 0);

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Companies & Partners
            </Typography>

            {/* Company Statistics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                            {totalCompanies}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Partners
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                            {activeCompanies}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Active Partners
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#A78BFA', fontWeight: 'bold' }}>
                            {totalInternships}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Active Openings
                        </Typography>
                    </InfoCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <InfoCard sx={{ textAlign: 'center', p: 3 }}>
                        <Typography variant="h3" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                            {totalHired}
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#94A3B8' }}>
                            Total Placements
                        </Typography>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Charts Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Industry Distribution Pie Chart */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Industry Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <PieChart>
                                <Pie
                                    data={industryDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {industryDistributionData.map((entry, index) => (
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

                {/* Company Size Distribution */}
                <Grid item xs={12} lg={6}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Company Size Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <BarChart data={companySizeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="size" stroke="#94A3B8" />
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

                {/* Partnership Quality Radar Chart */}
                <Grid item xs={12}>
                    <InfoCard sx={{ p: 3, height: 400 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>
                            Partnership Quality Metrics
                        </Typography>
                        <ResponsiveContainer width="100%" height="85%">
                            <RadarChart data={partnershipMetricsData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="metric" tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <PolarRadiusAxis tick={{ fill: '#94A3B8', fontSize: 10 }} />
                                <Radar
                                    name="Quality Score"
                                    dataKey="value"
                                    stroke="#38BDF8"
                                    fill="#38BDF8"
                                    fillOpacity={0.2}
                                    strokeWidth={2}
                                />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: '#1E293B', 
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#E2E8F0'
                                    }} 
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </InfoCard>
                </Grid>
            </Grid>

            {/* Top Performing Partners Cards */}
            <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2, fontWeight: 'bold' }}>
                Top Performing Partners
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {companiesData
                    .filter(c => c.status === 'Active')
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((company) => (
                    <Grid item xs={12} md={4} key={company.id}>
                        <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Avatar sx={{ bgcolor: '#38BDF8', mr: 2 }}>
                                        {company.logo}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ color: '#E2E8F0' }}>
                                            {company.name}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                            {company.industry} • {company.location}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                                            {company.rating}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                            Rating
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                                            {company.activeInternships}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                            Active
                                        </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="h4" sx={{ color: '#A78BFA', fontWeight: 'bold' }}>
                                            {company.totalHired}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                            Hired
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Companies Table */}
            <InfoCard>
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0' }}>
                            All Partners
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                placeholder="Search companies..."
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
                                Add Partner
                            </Button>
                        </Box>
                    </Box>
                    
                    <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ '& .MuiTableCell-head': { color: '#94A3B8', borderColor: '#334155', fontWeight: 'bold' } }}>
                                    <TableCell>Company</TableCell>
                                    <TableCell>Industry</TableCell>
                                    <TableCell>Size</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Active Positions</TableCell>
                                    <TableCell>Total Hired</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredCompanies
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((company) => (
                                    <TableRow key={company.id} sx={{ '& .MuiTableCell-body': { color: '#E2E8F0', borderColor: '#334155' } }}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar sx={{ width: 40, height: 40, bgcolor: '#38BDF8' }}>
                                                    {company.logo}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>
                                                        {company.name}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                                        {company.contact}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{company.industry}</TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={company.size} 
                                                size="small" 
                                                sx={{ 
                                                    bgcolor: `${getSizeColor(company.size)}20`, 
                                                    color: getSizeColor(company.size),
                                                    border: `1px solid ${getSizeColor(company.size)}40`
                                                }} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <LocationOnIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
                                                {company.location}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <BusinessIcon sx={{ fontSize: 16, color: '#38BDF8' }} />
                                                {company.activeInternships}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <PeopleIcon sx={{ fontSize: 16, color: '#10B981' }} />
                                                {company.totalHired}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                                                ⭐ {company.rating}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={company.status} 
                                                size="small" 
                                                sx={{ 
                                                    bgcolor: `${getStatusColor(company.status)}20`, 
                                                    color: getStatusColor(company.status),
                                                    border: `1px solid ${getStatusColor(company.status)}40`
                                                }} 
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton 
                                                size="small" 
                                                onClick={(e) => handleMenuClick(e, company)}
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
                        count={filteredCompanies.length}
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
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>View Profile</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>Edit Details</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>View Internships</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#E2E8F0' }}>Contact</MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ color: '#F59E0B' }}>Suspend</MenuItem>
            </Menu>
        </Box>
    );
};

export default Companies;
