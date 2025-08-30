import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<AppBar
			position="fixed"
			elevation={0}
			sx={{
				background: 'rgba(15, 23, 42, 0.35)',
				backdropFilter: 'blur(10px)',
				borderBottom: '1px solid rgba(255,255,255,0.08)'
			}}
		>
			<Container maxWidth="lg">
				<Toolbar disableGutters sx={{ minHeight: 72, display: 'flex', justifyContent: 'space-between' }}>
					<Box component={RouterLink} to="/home" sx={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 1 }}>
						<Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'var(--brand-gradient)' }} />
						<Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>InternHub</Typography>
					</Box>
					<Stack direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center">
						<Button color="inherit" component={RouterLink} to="/home">Home</Button>
						<Button color="inherit" component={RouterLink} to="/internships">Internships</Button>
						<Button color="inherit" component={RouterLink} to="/about">About</Button>
						<Button variant="contained" color="primary" component={RouterLink} to="/login">Login</Button>
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default NavBar;