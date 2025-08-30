import React, { useMemo, useState } from 'react';
import { Box, Container, TextField, InputAdornment, Grid, Card, CardContent, Typography, Chip, Button, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const sample = [
	{ title: 'Frontend Engineer Intern', company: 'Airtable', location: 'Remote', tags: ['React', 'TypeScript', 'UI'], type: 'Software' },
	{ title: 'Data Analyst Intern', company: 'Airbnb', location: 'San Francisco', tags: ['SQL', 'Python', 'Dashboards'], type: 'Data' },
	{ title: 'UX Designer Intern', company: 'Spotify', location: 'New York', tags: ['Figma', 'Prototyping'], type: 'Design' },
	{ title: 'Growth Marketing Intern', company: 'Notion', location: 'Remote', tags: ['SEO', 'Content'], type: 'Marketing' },
];

const Internships = () => {
	const [query, setQuery] = useState('');
	const [category, setCategory] = useState('All');

	const filtered = useMemo(() => {
		const q = query.toLowerCase();
		return sample.filter((job) =>
			(category === 'All' || job.type === category) &&
			(job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.tags.join(' ').toLowerCase().includes(q))
		);
	}, [query, category]);

	return (
		<>
			<Box sx={{ py: 6, background: 'linear-gradient(180deg, rgba(18,184,134,0.08), transparent 70%)' }}>
				<Container maxWidth="lg">
					<Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Find internships you’ll love</Typography>
					<Typography color="text.secondary" sx={{ mb: 3 }}>Search by role, company, or skills. Use filters to narrow down your results.</Typography>
					<Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
						<TextField
							placeholder="Search internships..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
						<Select value={category} onChange={(e) => setCategory(e.target.value)} sx={{ minWidth: 180 }}>
							{['All', 'Software', 'Data', 'Design', 'Marketing'].map((c) => (
								<MenuItem key={c} value={c}>{c}</MenuItem>
							))}
						</Select>
						<Button variant="contained" color="primary">Apply</Button>
					</Box>
				</Container>
			</Box>

			<Container maxWidth="lg" sx={{ py: 6 }}>
				<Grid container spacing={3}>
					{filtered.map((job, idx) => (
						<Grid item xs={12} md={6} key={idx}>
							<Card sx={{ display: 'flex', alignItems: 'center' }}>
								<CardContent sx={{ width: '100%' }}>
									<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
										<Box>
											<Typography variant="h6" sx={{ fontWeight: 700 }}>{job.title}</Typography>
											<Typography variant="body2" color="text.secondary">{job.company} • {job.location}</Typography>
										</Box>
										<Button variant="outlined">View</Button>
									</Box>
									<Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
										{job.tags.map((t) => (
											<Chip key={t} label={t} size="small" />
										))}
									</Box>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
};

export default Internships;