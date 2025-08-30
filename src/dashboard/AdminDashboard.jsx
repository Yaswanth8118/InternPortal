import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import MonitorIcon from '@mui/icons-material/Monitor';
import BarChartIcon from '@mui/icons-material/BarChart';
import { logout, getCurrentUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const sections = [
  { key: 'internships', label: 'Internships', icon: <WorkIcon /> },
  { key: 'students', label: 'Students', icon: <PeopleIcon /> },
  { key: 'clients', label: 'Clients', icon: <BusinessIcon /> },
  { key: 'monitoring', label: 'Monitoring', icon: <MonitorIcon /> },
  { key: 'reports', label: 'Reports', icon: <BarChartIcon /> },
];

const drawerWidth = 240;

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('internships');
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'radial-gradient(ellipse at 80% 0%, rgba(124,58,237,0.08), transparent 40%)' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201, background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          <Box>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user ? `Hello, ${user.name}` : ''}
            </Typography>
            <Button color="inherit" onClick={handleLogout} sx={{ background: '#fff', color: '#34495e', fontWeight: 600 }}>
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
                sx={{ '&.Mui-selected': { background: 'rgba(6,182,212,0.25)', color: '#fff' } }}
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
        {activeSection === 'internships' && (
          <Box>
            <Typography variant="h4" gutterBottom>Internships</Typography>
            <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: 260, p: 3, bgcolor: 'rgba(6,182,212,0.08)', borderRadius: 2, boxShadow: 1, backdropFilter: 'blur(6px)', border: '1px solid rgba(6,182,212,0.2)' }}>
                <Typography variant="h6" color="primary" gutterBottom>Total Internships</Typography>
                <Typography variant="h4">12</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 260, p: 3, bgcolor: 'rgba(124,58,237,0.08)', borderRadius: 2, boxShadow: 1, border: '1px solid rgba(124,58,237,0.2)' }}>
                <Typography variant="h6" color="primary" gutterBottom>Total Students</Typography>
                <Typography variant="h4">58</Typography>
              </Box>
              <Box sx={{ flex: 1, minWidth: 260, p: 3, bgcolor: 'rgba(124,58,237,0.08)', borderRadius: 2, boxShadow: 1, border: '1px solid rgba(124,58,237,0.2)' }}>
                <Typography variant="h6" color="primary" gutterBottom>Total Clients</Typography>
                <Typography variant="h4">7</Typography>
              </Box>
            </Box>
            <Box sx={{ p: 3, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" color="primary" gutterBottom>Recent Activity</Typography>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>New internship posted: Digital Marketing Intern</li>
                <li>Student John Doe submitted project task</li>
                <li>Client Acme Corp started new campaign</li>
              </ul>
            </Box>
          </Box>
        )}
        {activeSection === 'students' && (
          <Box>
            <Typography variant="h4" gutterBottom>Students</Typography>
            <Typography>View and manage student profiles and progress.</Typography>
          </Box>
        )}
        {activeSection === 'clients' && (
          <Box>
            <Typography variant="h4" gutterBottom>Clients</Typography>
            <Typography>View client details and active campaigns.</Typography>
          </Box>
        )}
        {activeSection === 'monitoring' && (
          <Box>
            <Typography variant="h4" gutterBottom>Monitoring</Typography>
            <Typography>Monitor student and client project activity.</Typography>
          </Box>
        )}
        {activeSection === 'reports' && (
          <Box>
            <Typography variant="h4" gutterBottom>Reports</Typography>
            <Typography>Generate reports on program and project performance.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
