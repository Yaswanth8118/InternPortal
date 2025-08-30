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
    LinearProgress,
    IconButton,
    Avatar,
    Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout, getCurrentUser } from '../utils/auth'; // Assuming these are in your project
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const sections = [
    { key: 'dashboard', label: 'My Dashboard', icon: <DashboardIcon /> },
    { key: 'courses', label: 'My Courses', icon: <SchoolIcon /> },
    { key: 'projects', label: 'My Projects', icon: <AssignmentIcon /> },
    { key: 'billing', label: 'Billing & Payments', icon: <PaymentIcon /> },
    { key: 'profile', label: 'My Profile', icon: <AccountCircleIcon /> },
];

const InfoCard = ({ children, sx }) => (
    <Box
        sx={{
            flex: 1,
            minWidth: 280,
            p: 3,
            bgcolor: '#1E293B',
            borderRadius: 4,
            border: '1px solid',
            borderColor: '#334155',
            ...sx
        }}
    >
        {children}
    </Box>
);

const StudentDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [drawerOpen, setDrawerOpen] = useState(true);
    // Mock user object for display purposes. Replace with your actual user data logic.
    const user = { name: 'tejo', email: 'tejohere6@gmail.com' }; 
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
        const nameArray = name.split(' ');
        if (nameArray.length > 1) {
            return `${nameArray[0][0]}${nameArray[nameArray.length - 1][0]}`.toUpperCase();
        }
        return `${nameArray[0][0]}`.toUpperCase();
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0F172A', color: '#E2E8F0' }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: 1201,
                    background: '#1E293B',
                    borderBottom: '1px solid #334155',
                    boxShadow: 'none',
                    color: '#E2E8F0',
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            edge="start"
                            sx={{ marginRight: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Student Dashboard
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
                                borderColor: '#38BDF8',
                                color: '#38BDF8',
                                '&:hover': {
                                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                                    borderColor: '#38BDF8',
                                }
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
                    width: drawerWidth,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    ...(drawerOpen && {
                        width: drawerWidth,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            background: '#020617',
                            color: '#94A3B8',
                            borderRight: '1px solid #334155',
                            overflowX: 'hidden',
                        },
                    }),
                    ...(!drawerOpen && {
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        width: `calc(${theme.spacing(7)} + 1px)`,
                        [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
                        '& .MuiDrawer-paper': {
                            width: `calc(${theme.spacing(7)} + 1px)`,
                            [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
                            background: '#020617',
                            color: '#94A3B8',
                            borderRight: '1px solid #334155',
                            overflowX: 'hidden',
                        },
                    }),
                }}
            >
                <Toolbar />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'opacity 0.2s' , opacity: drawerOpen ? 1 : 0, height: drawerOpen ? 'auto' : 0 }}>
                    <Avatar sx={{ width: 56, height: 56, mb: 1, bgcolor: '#38BDF8' }}>
                         {getInitials(user?.name)}
                    </Avatar>
                    <Typography variant="subtitle1" sx={{ color: '#E2E8F0' }}>{user?.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>{user?.email || 'user@example.com'}</Typography>
                </Box>
                <Divider sx={{ borderColor: '#334155', m: '16px' }} />
                <List>
                    {sections.map(section => (
                        <ListItem
                            button
                            key={section.key}
                            selected={activeSection === section.key}
                            onClick={() => setActiveSection(section.key)}
                            sx={{
                                margin: '8px',
                                borderRadius: 2,
                                justifyContent: drawerOpen ? 'initial' : 'center',
                                '&:hover': { backgroundColor: 'rgba(56, 189, 248, 0.1)' },
                                '&.Mui-selected': {
                                    background: 'rgba(56, 189, 248, 0.2)',
                                    color: '#E2E8F0',
                                    '& .MuiListItemIcon-root': { color: '#E2E8F0' }
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', justifyContent: 'center', color: '#94A3B8' }}>
                                {section.icon}
                            </ListItemIcon>
                            <ListItemText primary={section.label} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            
            {/* --- Corrected Main Content Area --- */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 3, 
                    px: 2,
                    marginLeft: !drawerOpen ? `calc(${theme.spacing(7)} + 1px)` : `${drawerWidth}px`,
                    [theme.breakpoints.up('sm')]: {
                        marginLeft: !drawerOpen ? `calc(${theme.spacing(8)} + 1px)` : `${drawerWidth}px`,
                    },
                    transition: theme.transitions.create('margin-left', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}
            >
                <Toolbar />
                {activeSection === 'dashboard' && (
                    <Box>
                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Dashboard</Typography>
                        <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                            <InfoCard>
                                <Typography variant="h6" sx={{ color: '#38BDF8' }} gutterBottom>Internship Status</Typography>
                                <Typography variant="body1" sx={{ color: '#E2E8F0' }}>Applied</Typography>
                                <Typography variant="body2" sx={{ color: '#94A3B8' }}>You have applied for 2 internships. Awaiting response.</Typography>
                            </InfoCard>
                            <InfoCard>
                                <Typography variant="h6" sx={{ color: '#A78BFA' }} gutterBottom>Reminders</Typography>
                                <Box component="ul" sx={{ m: 0, p: 0, pl: 2.5, color: '#94A3B8', listStyleType: 'disc' }}>
                                    <li>Project deadline: Aug 25, 2025</li>
                                    <li>New course material available</li>
                                    <li>Upload ID proof for verification</li>
                                </Box>
                            </InfoCard>
                        </Box>
                    </Box>
                )}
                 {activeSection === 'courses' && (
                    <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Courses</Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
                        <InfoCard>
                        <Typography variant="h6" sx={{ color: '#38BDF8' }}>React Fundamentals</Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1.5 }}>Progress: 80%</Typography>
                        <LinearProgress variant="determinate" value={80} />
                        </InfoCard>
                        <InfoCard>
                        <Typography variant="h6" sx={{ color: '#38BDF8' }}>Digital Marketing Basics</Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8', mb: 1.5 }}>Progress: 50%</Typography>
                        <LinearProgress variant="determinate" value={50} />
                        </InfoCard>
                    </Box>
                    </Box>
                )}
                {activeSection === 'projects' && (
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
                )}
                {activeSection === 'billing' && (
                    <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Billing & Payments</Typography>
                    <InfoCard><Typography>View your billing history and payment options.</Typography></InfoCard>
                    </Box>
                )}
                {activeSection === 'profile' && (
                    <Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Profile</Typography>
                    <InfoCard><Typography>View and update your personal information, upload documents.</Typography></InfoCard>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default StudentDashboard;