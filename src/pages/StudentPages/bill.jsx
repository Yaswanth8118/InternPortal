import React, { useState, useEffect } from 'react';
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
    Divider,
    CircularProgress,
    Alert
} from '@mui/material';
import InfoCard from '../../components/InfoCard';
import { paymentAPI } from '../../utils/api';

const Bill = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // For now, using a hardcoded student ID. In a real app, this would come from authentication context
    const studentId = 5; // tejo's ID from seed data

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        try {
            setLoading(true);
            const response = await paymentAPI.getByStudent(studentId);
            setPayments(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching payments:', err);
            setError('Failed to load payment history. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Paid': return { bgcolor: 'rgba(16, 185, 129, 0.2)', color: '#10B981' };
            case 'Pending': return { bgcolor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' };
            case 'Failed': return { bgcolor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444' };
            case 'Cancelled': return { bgcolor: 'rgba(148, 163, 184, 0.2)', color: '#94A3B8' };
            case 'Refunded': return { bgcolor: 'rgba(167, 139, 250, 0.2)', color: '#A78BFA' };
            default: return { bgcolor: 'rgba(56, 189, 248, 0.2)', color: '#38BDF8' };
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatAmount = (amount, currency = 'INR') => {
        const symbol = currency === 'INR' ? '₹' : '$';
        return `${symbol}${parseFloat(amount).toLocaleString()}`;
    };

    const handleDownloadInvoice = (payment) => {
        // In a real app, this would download the actual invoice
        alert(`Downloading invoice ${payment.invoiceId}`);
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Billing & Payments</Typography>
                <Alert severity="error">{error}</Alert>
                <Button onClick={fetchPayments} sx={{ mt: 2 }}>Retry</Button>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Billing & Payments</Typography>
            
            {/* Payment History Card */}
            <InfoCard sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>Payment History</Typography>
                {payments.length > 0 ? (
                    <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="payment history table">
                            <TableHead>
                                <TableRow sx={{ '& .MuiTableCell-head': { color: '#94A3B8', borderColor: '#334155' } }}>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Payment Method</TableCell>
                                    <TableCell align="center">Invoice</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {payments.map((payment) => (
                                    <TableRow key={payment.id} sx={{ '& .MuiTableCell-body': { color: '#E2E8F0', borderColor: '#334155' } }}>
                                        <TableCell component="th" scope="row">
                                            {formatDate(payment.paymentDate || payment.createdDate)}
                                        </TableCell>
                                        <TableCell>{payment.description}</TableCell>
                                        <TableCell align="right">{formatAmount(payment.amount, payment.currency)}</TableCell>
                                        <TableCell align="center">
                                            <Chip 
                                                label={payment.status} 
                                                size="small" 
                                                sx={getStatusColor(payment.status)} 
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                                                {payment.paymentMethod || 'N/A'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button 
                                                size="small" 
                                                onClick={() => handleDownloadInvoice(payment)}
                                                disabled={payment.status !== 'Paid'}
                                            >
                                                Download
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1" sx={{ color: '#94A3B8', textAlign: 'center', py: 4 }}>
                        No payment history found.
                    </Typography>
                )}
            </InfoCard>

            {/* Payment Summary Card */}
            <InfoCard sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#E2E8F0', mb: 2 }}>Payment Summary</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
                    <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)' }}>
                        <Typography variant="h4" sx={{ color: '#10B981', fontWeight: 'bold' }}>
                            {formatAmount(payments.filter(p => p.status === 'Paid').reduce((sum, p) => sum + parseFloat(p.paidAmount || p.amount), 0))}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Total Paid</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.1)' }}>
                        <Typography variant="h4" sx={{ color: '#F59E0B', fontWeight: 'bold' }}>
                            {formatAmount(payments.filter(p => p.status === 'Pending').reduce((sum, p) => sum + parseFloat(p.amount), 0))}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Pending</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: 'rgba(56, 189, 248, 0.1)' }}>
                        <Typography variant="h4" sx={{ color: '#38BDF8', fontWeight: 'bold' }}>
                            {payments.length}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94A3B8' }}>Total Transactions</Typography>
                    </Box>
                </Box>
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
                <Typography variant="body2" sx={{ color: '#94A3B8', mt: 2 }}>
                    Payment methods are securely stored and encrypted.
                </Typography>
            </InfoCard>
        </Box>
    );
};

export default Bill;