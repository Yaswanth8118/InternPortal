import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

// --- Import the new page components ---
import MyDash from '../pages/StudentPages/myDash';
import MyCourses from '../pages/StudentPages/myCourses';
import Projects from '../pages/StudentPages/projects';
import Bill from '../pages/StudentPages/bill';
import Profile from '../pages/StudentPages/profile';

const drawerWidth = 240;

const sections = [
    { key: 'dashboard', label: 'My Dashboard', icon: <DashboardIcon /> },
    { key: 'courses', label: 'My Courses', icon: <SchoolIcon /> },
    { key: 'projects', label: 'My Projects', icon: <AssignmentIcon /> },
    { key: 'billing', label: 'Billing & Payments', icon: <PaymentIcon /> },
    { key: 'profile', label: 'My Profile', icon: <AccountCircleIcon /> },
];

const StudentDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [user, setUser] = useState({ name: 'tejo', email: 'tejohere6@gmail.com' });
    const navigate = useNavigate();
    const theme = useTheme();

    // Listen for profile updates
    useEffect(() => {
        const handleProfileUpdate = (event) => {
            const { profileData } = event.detail;
            setUser(prevUser => ({
                ...prevUser,
                name: profileData.name || prevUser.name,
                email: profileData.email || prevUser.email
            }));
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);
        return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
    }, []);

    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);
    const handleLogout = () => { logout(); navigate('/login'); };

    const getInitials = (name) => {
        if (!name) return '';
        const nameArray = name.split(' ');
        return nameArray.length > 1 ? `${nameArray[0][0]}${nameArray[nameArray.length - 1][0]}`.toUpperCase() : `${nameArray[0][0]}`.toUpperCase();
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0F172A', color: '#E2E8F0' }}>
            <AppBar position="fixed" sx={{ zIndex: 1201, background: '#1E293B', borderBottom: '1px solid #334155', boxShadow: 'none',color: '#E2E8F0' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }}><MenuIcon /></IconButton>
                        <Typography variant="h6" noWrap component="div">Student Dashboard</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ mr: 2, color: '#94A3B8', display: { xs: 'none', sm: 'block' } }}>{`Hello, ${user.name}`}</Typography>
                        <Button variant="outlined" onClick={handleLogout} sx={{ borderColor: '#38BDF8', color: '#38BDF8', '&:hover': { backgroundColor: 'rgba(56, 189, 248, 0.1)' } }}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={drawerOpen} sx={{
                width: drawerWidth, flexShrink: 0, whiteSpace: 'nowrap', boxSizing: 'border-box',
                ...(drawerOpen && {
                    width: drawerWidth, transition: theme.transitions.create('width', { easing: 'sharp', duration: 'enteringScreen' }),
                    '& .MuiDrawer-paper': { width: drawerWidth, background: '#020617', color: '#94A3B8', borderRight: '1px solid #334155', overflowX: 'hidden' },
                }),
                ...(!drawerOpen && {
                    width: `calc(${theme.spacing(7)} + 1px)`, transition: theme.transitions.create('width', { easing: 'sharp', duration: 'leavingScreen' }),
                    '& .MuiDrawer-paper': { width: `calc(${theme.spacing(7)} + 1px)`, background: '#020617', color: '#94A3B8', borderRight: '1px solid #334155', overflowX: 'hidden' },
                }),
            }}>
                <Toolbar />
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'opacity 0.2s', opacity: drawerOpen ? 1 : 0, height: drawerOpen ? 'auto' : 0 }}>
                    <Avatar sx={{ width: 56, height: 56, mb: 1, bgcolor: '#38BDF8' }}>{getInitials(user?.name)}</Avatar>
                    <Typography variant="subtitle1" sx={{ color: '#E2E8F0' }}>{user?.name}</Typography>
                    <Typography variant="body2" sx={{ color: '#94A3B8' }}>{user?.email}</Typography>
                </Box>
                <Divider sx={{ borderColor: '#334155', m: '16px' }} />
                <List>
                    {sections.map(section => (
                        <ListItem button key={section.key} selected={activeSection === section.key} onClick={() => setActiveSection(section.key)} sx={{ m: '8px', borderRadius: 2, justifyContent: drawerOpen ? 'initial' : 'center', '&:hover': { backgroundColor: 'rgba(56, 189, 248, 0.1)' }, '&.Mui-selected': { background: 'rgba(56, 189, 248, 0.2)', color: '#E2E8F0', '& .MuiListItemIcon-root': { color: '#E2E8F0' } } }}>
                            <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto', justifyContent: 'center', color: '#94A3B8' }}>{section.icon}</ListItemIcon>
                            <ListItemText primary={section.label} sx={{ opacity: drawerOpen ? 1 : 0 }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            
            <Box component="main" sx={{
                flexGrow: 1, py: 3, px: 2,
                transition: theme.transitions.create('margin-left', { easing: 'sharp', duration: 'enteringScreen' }),
            }}>
                <Toolbar />
                {/* --- Cleaned-up content area --- */}
                {activeSection === 'dashboard' && <MyDash setActiveSection={setActiveSection} />}
                {activeSection === 'courses' && <MyCourses />}
                {activeSection === 'projects' && <Projects />}
                {activeSection === 'billing' && <Bill />}
                {activeSection === 'profile' && <Profile />}
            </Box>
        </Box>
    );
};

export default StudentDashboard;