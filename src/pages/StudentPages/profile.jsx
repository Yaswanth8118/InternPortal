import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Stack, Divider } from '@mui/material';
import InfoCard from '../../components/InfoCard';

const Profile = () => {
    // State to toggle between viewing and editing mode
    const [isEditing, setIsEditing] = useState(false);

    // State to hold the profile data. In a real app, you would fetch this data.
    const [profileData, setProfileData] = useState({
        fullName: 'Tejo',
        email: 'tejohere6@gmail.com',
        phone: '123-456-7890',
        address: '123 Main St, Bheemunipatnam, Andhra Pradesh'
    });

    // Handles changes in the text fields during editing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fired when the "Save Changes" button is clicked
    const handleSaveChanges = () => {
        // In a real application, you would make an API call here to save the data
        console.log('Saving data:', profileData);
        setIsEditing(false); // Switch back to view mode
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Profile</Typography>
            <InfoCard>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ color: '#E2E8F0' }}>Personal Information</Typography>
                    {/* The Edit button only shows when not in editing mode */}
                    {!isEditing && (
                        <Button variant="outlined" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    )}
                </Box>
                <Divider sx={{ borderColor: '#334155', mb: 3 }} />

                {isEditing ? (
                    /* --- EDIT MODE --- */
                    <Stack spacing={3}>
                        <TextField
                            label="Full Name"
                            name="fullName"
                            value={profileData.fullName}
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ style: { color: '#E2E8F0' } }}
                        />
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ style: { color: '#E2E8F0' } }}
                        />
                        <TextField
                            label="Phone Number"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ style: { color: '#E2E8F0' } }}
                        />
                        <TextField
                            label="Address"
                            name="address"
                            value={profileData.address}
                            onChange={handleChange}
                            variant="outlined"
                            inputProps={{ style: { color: '#E2E8F0' } }}
                        />
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                            <Button variant="text" onClick={() => setIsEditing(false)}>Cancel</Button>
                            <Button variant="contained" onClick={handleSaveChanges}>Save Changes</Button>
                        </Box>
                    </Stack>
                ) : (
                    /* --- VIEW MODE --- */
                    <Stack spacing={2}>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>Full Name</Typography>
                            <Typography variant="body1" sx={{ color: '#E2E8F0' }}>{profileData.fullName}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>Email Address</Typography>
                            <Typography variant="body1" sx={{ color: '#E2E8F0' }}>{profileData.email}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>Phone Number</Typography>
                            <Typography variant="body1" sx={{ color: '#E2E8F0' }}>{profileData.phone}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>Address</Typography>
                            <Typography variant="body1" sx={{ color: '#E2E8F0' }}>{profileData.address}</Typography>
                        </Box>
                    </Stack>
                )}
            </InfoCard>
        </Box>
    );
};

export default Profile;
