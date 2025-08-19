import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout, getCurrentUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const sections = [
  { key: 'dashboard', label: 'My Dashboard', icon: <DashboardIcon /> },
  { key: 'courses', label: 'My Courses', icon: <SchoolIcon /> },
  { key: 'projects', label: 'My Projects', icon: <AssignmentIcon /> },
  { key: 'billing', label: 'Billing & Payments', icon: <PaymentIcon /> },
  { key: 'profile', label: 'My Profile', icon: <AccountCircleIcon /> },
];

const drawerWidth = 240;

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(ellipse at 20% 0%, rgba(6,182,212,0.08), transparent 40%)' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, background: 'linear-gradient(90deg, #06b6d4, #7c3aed)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Student Dashboard
          </Typography>
          <Box>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user ? `Hello, ${user.name}` : ''}
            </Typography>
            <Button color="inherit" onClick={handleLogout} sx={{ background: '#fff', color: '#1abc9c', fontWeight: 600 }}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: '#0b1220', color: '#fff', borderRight: '1px solid rgba(255,255,255,0.08)' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sections.map(section => (
              <ListItem
                button
                key={section.key}
                selected={activeSection === section.key}
                onClick={() => setActiveSection(section.key)}
                sx={{ '&.Mui-selected': { background: 'rgba(124,58,237,0.25)', color: '#fff' } }}
              >
                <ListItemIcon sx={{ color: '#fff' }}>{section.icon}</ListItemIcon>
                <ListItemText primary={section.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4, ml: `${drawerWidth}px` }}>
        <Toolbar />
        {activeSection === 'dashboard' && (
          <Box>
            <Typography variant="h4" gutterBottom>My Dashboard</Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: 280, p: 3, bgcolor: 'rgba(6,182,212,0.08)', borderRadius: 2, boxShadow: 1, backdropFilter: 'blur(6px)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <Typography variant="h6" color="primary" gutterBottom>Internship Status</Typography>
                <Typography variant="body1">Applied</Typography>
                <Typography variant="body2" color="text.secondary">You have applied for 2 internships. Awaiting response.</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 280, p: 3, bgcolor: 'rgba(124,58,237,0.08)', borderRadius: 2, boxShadow: 1, backdropFilter: 'blur(6px)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <Typography variant="h6" color="primary" gutterBottom>Reminders</Typography>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  <li>Project deadline: Aug 25, 2025</li>
                  <li>New course material available</li>
                  <li>Upload ID proof for verification</li>
                </ul>
              </Box>
            </Box>
          </Box>
        )}
        {activeSection === 'courses' && (
          <Box>
            <Typography variant="h4" gutterBottom>My Courses</Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ flex: 1, p: 3, bgcolor: 'rgba(6,182,212,0.08)', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" color="primary">React Fundamentals</Typography>
                <Typography variant="body2">Progress: 80%</Typography>
                <Box sx={{ width: '100%', bgcolor: 'rgba(6,182,212,0.15)', borderRadius: 1, mt: 1 }}>
                  <Box sx={{ width: '80%', height: 8, bgcolor: '#06b6d4', borderRadius: 1 }}></Box>
                </Box>
              </Box>
              <Box sx={{ flex: 1, p: 3, bgcolor: 'rgba(124,58,237,0.08)', borderRadius: 2, boxShadow: 1 }}>
                <Typography variant="h6" color="primary">Digital Marketing Basics</Typography>
                <Typography variant="body2">Progress: 50%</Typography>
                <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1, mt: 1 }}>
                  <Box sx={{ width: '50%', height: 8, bgcolor: '#06b6d4', borderRadius: 1 }}></Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {activeSection === 'projects' && (
          <Box>
            <Typography variant="h4" gutterBottom>My Projects</Typography>
            <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" color="primary">Marketing Website Redesign</Typography>
              <Typography variant="body2">Goal: Improve UI/UX and SEO</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>Deliverables:</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Wireframes</li>
                <li>SEO Audit</li>
                <li>Final Implementation</li>
              </ul>
              <Typography variant="body2" sx={{ mt: 2 }}>Task Progress:</Typography>
              <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1, mt: 1 }}>
                <Box sx={{ width: '60%', height: 8, bgcolor: '#06b6d4', borderRadius: 1 }}></Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>60% Complete</Typography>
            </Box>
          </Box>
        )}
        {activeSection === 'billing' && (
          <Box>
            <Typography variant="h4" gutterBottom>Billing & Payments</Typography>
            <Typography>View your billing history and payment options.</Typography>
          </Box>
        )}
        {activeSection === 'profile' && (
          <Box>
            <Typography variant="h4" gutterBottom>My Profile</Typography>
            <Typography>View and update your personal information, upload documents.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StudentDashboard;
