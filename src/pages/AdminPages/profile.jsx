import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    TextField, 
    Stack, 
    Divider,
    Grid,
    Avatar,
    Switch,
    FormControlLabel,
    Tab,
    Tabs,
    Paper
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import InfoCard from '../../components/InfoCard';

const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    // State for profile data
    const [profileData, setProfileData] = useState({
        fullName: 'Admin User',
        email: 'admin@internportal.com',
        phone: '+91 9876543210',
        designation: 'Platform Administrator',
        department: 'Operations',
        joinDate: '2024-01-15',
        location: 'Mumbai, India',
        bio: 'Experienced administrator managing the intern portal platform with focus on student success and company partnerships.'
    });

    // State for notification settings
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        smsNotifications: false,
        newApplications: true,
        studentUpdates: true,
        companyRequests: true,
        systemAlerts: true,
        weeklyReports: true,
        monthlyReports: true
    });

    // State for security settings
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: true,
        loginAlerts: true,
        sessionTimeout: '30',
        passwordChangeRequired: false
    });

    // Handlers
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNotificationChange = (event) => {
        const { name, checked } = event.target;
        setNotifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleSecurityChange = (event) => {
        const { name, checked, value } = event.target;
        setSecuritySettings(prev => ({
            ...prev,
            [name]: checked !== undefined ? checked : value
        }));
    };

    const handleSaveProfile = () => {
        console.log('Saving profile data:', profileData);
        setIsEditing(false);
        // In a real application, you would make an API call here
    };

    const handleSaveNotifications = () => {
        console.log('Saving notification settings:', notifications);
        alert('Notification settings saved successfully!');
    };

    const handleSaveSecurity = () => {
        console.log('Saving security settings:', securitySettings);
        alert('Security settings saved successfully!');
    };

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const TabPanel = ({ children, value, index }) => (
        <div hidden={value !== index}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Admin Profile
            </Typography>

            {/* Profile Header Card */}
            <InfoCard sx={{ mb: 4 }}>
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Avatar 
                            sx={{ 
                                width: 100, 
                                height: 100, 
                                bgcolor: '#38BDF8',
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {getInitials(profileData.fullName)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" sx={{ color: '#E2E8F0', fontWeight: 'bold', mb: 1 }}>
                                {profileData.fullName}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#A78BFA', mb: 1 }}>
                                {profileData.designation}
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#94A3B8', mb: 2 }}>
                                {profileData.department} • Joined {profileData.joinDate}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#94A3B8', maxWidth: 600 }}>
                                {profileData.bio}
                            </Typography>
                        </Box>
                        <Button 
                            variant="contained" 
                            startIcon={<EditIcon />}
                            onClick={() => setIsEditing(true)}
                            sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>
            </InfoCard>

            {/* Tabs Navigation */}
            <Paper sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: 2, mb: 3 }}>
                <Tabs 
                    value={activeTab} 
                    onChange={handleTabChange} 
                    sx={{ 
                        '& .MuiTab-root': { color: '#94A3B8' },
                        '& .Mui-selected': { color: '#38BDF8' },
                        '& .MuiTabs-indicator': { backgroundColor: '#38BDF8' }
                    }}
                >
                    <Tab 
                        icon={<PersonIcon />} 
                        label="Personal Information" 
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 'medium' }}
                    />
                    <Tab 
                        icon={<NotificationsIcon />} 
                        label="Notifications" 
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 'medium' }}
                    />
                    <Tab 
                        icon={<SecurityIcon />} 
                        label="Security" 
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 'medium' }}
                    />
                </Tabs>
            </Paper>

            {/* Tab Panels */}
            
            {/* Personal Information Tab */}
            <TabPanel value={activeTab} index={0}>
                <InfoCard>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 3 }}>
                            Personal Information
                        </Typography>
                        
                        {isEditing ? (
                            <Stack spacing={3}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Full Name"
                                            name="fullName"
                                            value={profileData.fullName}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Email Address"
                                            name="email"
                                            type="email"
                                            value={profileData.email}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Phone Number"
                                            name="phone"
                                            value={profileData.phone}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Designation"
                                            name="designation"
                                            value={profileData.designation}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Department"
                                            name="department"
                                            value={profileData.department}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Location"
                                            name="location"
                                            value={profileData.location}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label="Bio"
                                            name="bio"
                                            value={profileData.bio}
                                            onChange={handleProfileChange}
                                            fullWidth
                                            multiline
                                            rows={3}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                    <Button 
                                        variant="text" 
                                        onClick={() => setIsEditing(false)}
                                        sx={{ color: '#94A3B8' }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        onClick={handleSaveProfile}
                                        sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Stack>
                        ) : (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Full Name</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.fullName}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Email Address</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.email}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Phone Number</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.phone}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Designation</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.designation}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Department</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.department}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Location</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.location}</Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box>
                                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Bio</Typography>
                                        <Typography variant="body1" sx={{ color: '#E2E8F0', fontWeight: 'medium' }}>{profileData.bio}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </InfoCard>
            </TabPanel>

            {/* Notifications Tab */}
            <TabPanel value={activeTab} index={1}>
                <InfoCard>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 3 }}>
                            Notification Preferences
                        </Typography>
                        
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#E2E8F0', mb: 2 }}>
                                    General Notifications
                                </Typography>
                                <Stack spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.emailNotifications}
                                                onChange={handleNotificationChange}
                                                name="emailNotifications"
                                                color="primary"
                                            />
                                        }
                                        label="Email Notifications"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.smsNotifications}
                                                onChange={handleNotificationChange}
                                                name="smsNotifications"
                                                color="primary"
                                            />
                                        }
                                        label="SMS Notifications"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                </Stack>
                            </Box>

                            <Divider sx={{ borderColor: '#334155' }} />

                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#E2E8F0', mb: 2 }}>
                                    Activity Notifications
                                </Typography>
                                <Stack spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.newApplications}
                                                onChange={handleNotificationChange}
                                                name="newApplications"
                                                color="primary"
                                            />
                                        }
                                        label="New Applications"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.studentUpdates}
                                                onChange={handleNotificationChange}
                                                name="studentUpdates"
                                                color="primary"
                                            />
                                        }
                                        label="Student Updates"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.companyRequests}
                                                onChange={handleNotificationChange}
                                                name="companyRequests"
                                                color="primary"
                                            />
                                        }
                                        label="Company Requests"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.systemAlerts}
                                                onChange={handleNotificationChange}
                                                name="systemAlerts"
                                                color="primary"
                                            />
                                        }
                                        label="System Alerts"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                </Stack>
                            </Box>

                            <Divider sx={{ borderColor: '#334155' }} />

                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#E2E8F0', mb: 2 }}>
                                    Report Notifications
                                </Typography>
                                <Stack spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.weeklyReports}
                                                onChange={handleNotificationChange}
                                                name="weeklyReports"
                                                color="primary"
                                            />
                                        }
                                        label="Weekly Reports"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={notifications.monthlyReports}
                                                onChange={handleNotificationChange}
                                                name="monthlyReports"
                                                color="primary"
                                            />
                                        }
                                        label="Monthly Reports"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                </Stack>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                                <Button 
                                    variant="contained" 
                                    onClick={handleSaveNotifications}
                                    sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                                >
                                    Save Notification Settings
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </InfoCard>
            </TabPanel>

            {/* Security Tab */}
            <TabPanel value={activeTab} index={2}>
                <InfoCard>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 3 }}>
                            Security Settings
                        </Typography>
                        
                        <Stack spacing={3}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#E2E8F0', mb: 2 }}>
                                    Authentication
                                </Typography>
                                <Stack spacing={2}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={securitySettings.twoFactorAuth}
                                                onChange={handleSecurityChange}
                                                name="twoFactorAuth"
                                                color="primary"
                                            />
                                        }
                                        label="Two-Factor Authentication"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={securitySettings.loginAlerts}
                                                onChange={handleSecurityChange}
                                                name="loginAlerts"
                                                color="primary"
                                            />
                                        }
                                        label="Login Alerts"
                                        sx={{ color: '#E2E8F0' }}
                                    />
                                </Stack>
                            </Box>

                            <Divider sx={{ borderColor: '#334155' }} />

                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#E2E8F0', mb: 2 }}>
                                    Session Management
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Session Timeout (minutes)"
                                            name="sessionTimeout"
                                            value={securitySettings.sessionTimeout}
                                            onChange={handleSecurityChange}
                                            fullWidth
                                            variant="outlined"
                                            type="number"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider sx={{ borderColor: '#334155' }} />

                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#E2E8F0', mb: 2 }}>
                                    Password Policy
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={securitySettings.passwordChangeRequired}
                                            onChange={handleSecurityChange}
                                            name="passwordChangeRequired"
                                            color="primary"
                                        />
                                    }
                                    label="Require password change every 90 days"
                                    sx={{ color: '#E2E8F0' }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                                <Button 
                                    variant="outlined" 
                                    sx={{ borderColor: '#38BDF8', color: '#38BDF8' }}
                                >
                                    Change Password
                                </Button>
                                <Button 
                                    variant="contained" 
                                    onClick={handleSaveSecurity}
                                    sx={{ bgcolor: '#10B981', '&:hover': { bgcolor: '#059669' } }}
                                >
                                    Save Security Settings
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </InfoCard>
            </TabPanel>
        </Box>
    );
};

export default AdminProfile;
