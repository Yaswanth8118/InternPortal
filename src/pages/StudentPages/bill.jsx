import React from 'react';
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
    Divider
} from '@mui/material';
import InfoCard from '../../components/InfoCard';

// Mock data to simulate past payments. In a real app, you would fetch this from your backend.
const paymentHistory = [
    { id: 'inv-003', date: '2025-08-15', description: 'React Fundamentals Course Fee', amount: '₹15,000', status: 'Paid' },
    { id: 'inv-002', date: '2025-07-20', description: 'Digital Marketing Internship Deposit', amount: '₹5,000', status: 'Paid' },
    { id: 'inv-001', date: '2025-07-10', description: 'Platform Registration Fee', amount: '₹500', status: 'Paid' },
];

const Bill = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Billing & Payments</Typography>
            
            {/* Payment History Card */}
            <InfoCard sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>Payment History</Typography>
                <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="payment history table">
                        <TableHead>
                            <TableRow sx={{ '& .MuiTableCell-head': { color: '#94A3B8', borderColor: '#334155' } }}>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Amount</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Invoice</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentHistory.map((row) => (
                                <TableRow key={row.id} sx={{ '& .MuiTableCell-body': { color: '#E2E8F0', borderColor: '#334155' } }}>
                                    <TableCell component="th" scope="row">{row.date}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell align="right">{row.amount}</TableCell>
                                    <TableCell align="center">
                                        <Chip label={row.status} color="success" size="small" sx={{ bgcolor: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8' }} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button size="small" onClick={() => alert(`Downloading invoice ${row.id}`)}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </InfoCard>

            {/* Payment Methods Card */}
            <InfoCard>
                <Typography variant="h6" sx={{ color: '#E2E8F0' }}>Saved Payment Methods</Typography>
                <Divider sx={{ borderColor: '#334155', my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ color: '#E2E8F0' }}>
                        Visa ending in •••• 1234
                    </Typography>
                    <Button variant="outlined">Manage Methods</Button>
                </Box>
            </InfoCard>
        </Box>
    );
};

export default Bill;