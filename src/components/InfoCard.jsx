import React from 'react';
import { Box } from '@mui/material';

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

export default InfoCard;