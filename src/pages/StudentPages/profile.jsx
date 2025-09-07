import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Stack, Divider, Alert } from '@mui/material';
import InfoCard from '../../components/InfoCard';
import { studentAPI } from '../../utils/api';

const Profile = () => {
    // State to toggle between viewing and editing mode
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [studentId] = useState(1); // In real app, get from auth context or props

    // State to hold the profile data
    const [profileData, setProfileData] = useState({
        fullName: 'Tejo',
        email: 'tejohere6@gmail.com',
        phone: '123-456-7890',
        address: '123 Main St, Bheemunipatnam, Andhra Pradesh'
    });

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await studentAPI.getById(studentId);
                if (response.data) {
                    setProfileData({
                        fullName: response.data.fullName || 'Tejo',
                        email: response.data.email || 'tejohere6@gmail.com',
                        phone: response.data.phone || '123-456-7890',
                        address: response.data.address || '123 Main St, Bheemunipatnam, Andhra Pradesh'
                    });
                }
            } catch (err) {
                console.error('Error fetching profile:', err);
                // Keep default values if API fails
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [studentId]);

    // Handles changes in the text fields during editing
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Fired when the "Save Changes" button is clicked
    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Make API call to update profile
            await studentAPI.update(studentId, profileData);
            
            setSuccess(true);
            setIsEditing(false); // Switch back to view mode
            
            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
            
            // Dispatch custom event to notify other components of profile update
            window.dispatchEvent(new CustomEvent('profileUpdated', { 
                detail: { studentId, profileData } 
            }));
            
        } catch (err) {
            console.error('Error saving profile:', err);
            setError(err.message || 'Failed to save profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setError(null);
        setSuccess(false);
        // Reset form data by refetching
        window.location.reload(); // Simple approach, could be more elegant
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>My Profile</Typography>
            
            {/* Success/Error Alerts */}
            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Profile updated successfully!
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
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
                            <Button variant="text" onClick={handleCancel} disabled={loading}>Cancel</Button>
                            <Button variant="contained" onClick={handleSaveChanges} disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
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
