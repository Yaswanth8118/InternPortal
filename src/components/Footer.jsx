import React from 'react';
import { Box, Container, Typography, Stack, Link } from '@mui/material';

const Footer = () => {
	return (
		<Box component="footer" sx={{ py: 6, mt: 'auto', background: 'rgba(15,23,42,0.04)', borderTop: '1px solid rgba(15,23,42,0.08)' }}>
			<Container maxWidth="lg">
				<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
					<Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} InternHub</Typography>
					<Stack direction="row" spacing={3}>
						<Link href="#" underline="hover" color="inherit">Privacy</Link>
						<Link href="#" underline="hover" color="inherit">Terms</Link>
						<Link href="#" underline="hover" color="inherit">Contact</Link>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
};

export default Footer;