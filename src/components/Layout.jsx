import React from 'react';
import { Box, Container } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children, maxWidth = 'lg', noContainer = false }) => {
	return (
		<Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<NavBar />
			<Box component="main" sx={{ flex: 1, pt: { xs: 10, md: 12 } }}>
				{noContainer ? children : <Container maxWidth={maxWidth}>{children}</Container>}
			</Box>
			<Footer />
		</Box>
	);
};

export default Layout;


