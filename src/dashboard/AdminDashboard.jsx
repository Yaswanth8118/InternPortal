import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Avatar,
    Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import MonitorIcon from '@mui/icons-material/Monitor';
import BarChartIcon from '@mui/icons-material/BarChart';
import { logout } from '../utils/auth'; // Assuming these are in your project
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const sections = [
    { key: 'internships', label: 'Internships', icon: <WorkIcon /> },
    { key: 'students', label: 'Students', icon: <PeopleIcon /> },
    { key: 'clients', label: 'Clients', icon: <BusinessIcon /> },
    { key: 'monitoring', label: 'Monitoring', icon: <MonitorIcon /> },
    { key: 'reports', label: 'Reports', icon: <BarChartIcon /> },
];

// --- A reusable card for displaying stats ---
const StatCard = ({ title, value, color = '#38BDF8' }) => (
    <Box
        sx={{
            flex: 1,
            minWidth: 260,
            p: 3,
            bgcolor: '#1E293B',
            borderRadius: 4,
            border: '1px solid',
            borderColor: '#334155',
        }}
    >
        <Typography variant="h6" sx={{ color, fontWeight: 'medium' }} gutterBottom>
            {title}
        </Typography>
        <Typography variant="h4" sx={{ color: '#E2E8F0', fontWeight: 'bold' }}>
            {value}
        </Typography>
    </Box>
);

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('internships');
    const [drawerOpen, setDrawerOpen] = useState(true);
    const user = { name: 'Admin', email: 'admin@example.com' }; // Mock user
    const navigate = useNavigate();
    const theme = useTheme();

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
        console.log("Logout clicked");
    };

    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0F172A', color: '#E2E8F0' }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1201,
                    background: '#1e293bff',
                    borderBottom: '1px solid #334155',
                    boxShadow: 'none',
                    color: '#E2E8F0',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Admin Dashboard
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ mr: 2, color: '#94A3B8', display: { xs: 'none', sm: 'block' } }}>
                            {user ? `Hello, ${user.name}` : ''}
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleLogout}
                            sx={{
                                borderColor: '#38BDF8', color: '#38BDF8',
                                '&:hover': { backgroundColor: 'rgba(56, 189, 248, 0.1)', borderColor: '#38BDF8' }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={drawerOpen}
                sx={{
                    width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box',
                    ...(drawerOpen && {
                        width: drawerWidth,
                        transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
                        '& .MuiDrawer-paper': { width: drawerWidth, background: '#020617', color: '#94A3B8', borderRight: '1px solid #334155', overflowX: 'hidden' },
                    }),
                    ...(!drawerOpen && {
                        width: `calc(${theme.spacing(7)} + 1px)`,
                        transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
                        [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
                        '& .MuiDrawer-paper': {
                            width: `calc(${theme.spacing(7)} + 1px)`,
                            [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
                            background: '#020617', color: '#94A3B8', borderRight: '1px solid #334155', overflowX: 'hidden'
                        },
                    }),
                }}
            >
                <Toolbar />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'opacity 0.2s', opacity: drawerOpen ? 1 : 0, height: drawerOpen ? 'auto' : 0 }}>
                    <Avatar sx={{ width: 56, height: 56, mb: 1, bgcolor: '#A78BFA' }}>{getInitials(user?.name)}</Avatar>
                    <Typography variant="subtitle1" sx={{ color: '#E2E8F0' }}>{user?.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>{user?.email}</Typography>
                </Box>
                <Divider sx={{ borderColor: '#334155', m: '16px' }} />
                <List>
                    {sections.map(section => (
                        <ListItem button key={section.key} selected={activeSection === section.key} onClick={() => setActiveSection(section.key)} sx={{
                            m: '8px', borderRadius: 2, justifyContent: drawerOpen ? 'initial' : 'center',
                            '&:hover': { backgroundColor: 'rgba(56, 189, 248, 0.1)' },
                            '&.Mui-selected': { background: 'rgba(56, 189, 248, 0.2)', color: '#E2E8F0', '& .MuiListItemIcon-root': { color: '#E2E8F0' } }
                        }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', justifyContent: 'center', color: '#94A3B8' }}>{section.icon}</ListItemIcon>
                            <ListItemText primary={section.label} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, py: 3, px: 2,
                    marginLeft: !drawerOpen ? `calc(${theme.spacing(7)} + 1px)` : `${drawerWidth}px`,
                    [theme.breakpoints.up('sm')]: { marginLeft: !drawerOpen ? `calc(${theme.spacing(8)} + 1px)` : `${drawerWidth}px` },
                    transition: theme.transitions.create('margin-left', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
                }}
            >
                <Toolbar />
                {activeSection === 'internships' && (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Internships</Typography>
                        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                            <StatCard title="Total Internships" value="12" />
                            <StatCard title="Total Students" value="58" color="#A78BFA" />
                            <StatCard title="Total Clients" value="7" />
                        </Box>
                        <Box sx={{ p: 3, bgcolor: '#1E293B', borderRadius: 4, border: '1px solid #334155' }}>
                            <Typography variant="h6" sx={{ color: '#38BDF8' }} gutterBottom>Recent Activity</Typography>
                            <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8', listStyleType: 'disc' }}>
                                <li>New internship posted: Digital Marketing Intern</li>
                                <li>Student John Doe submitted project task</li>
                                <li>Client Acme Corp started new campaign</li>
                            </Box>
                        </Box>
                    </Box>
                )}
                {activeSection === 'students' && (
                    <Box><Typography variant="h4" gutterBottom>Students</Typography><Typography>View and manage student profiles and progress.</Typography></Box>
                )}
                {activeSection === 'clients' && (
                    <Box><Typography variant="h4" gutterBottom>Clients</Typography><Typography>View client details and active campaigns.</Typography></Box>
                )}
                {activeSection === 'monitoring' && (
                    <Box><Typography variant="h4" gutterBottom>Monitoring</Typography><Typography>Monitor student and client project activity.</Typography></Box>
                )}
                {activeSection === 'reports' && (
                    <Box><Typography variant="h4" gutterBottom>Reports</Typography><Typography>Generate reports on program and project performance.</Typography></Box>
                )}
            </Box>
        </Box>
    );
};

export default AdminDashboard;