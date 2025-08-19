import { createTheme } from '@mui/material/styles';

// Centralized design tokens
const brand = {
	primary: {
		main: '#06b6d4', // cyan
		dark: '#0891b2',
		light: '#22d3ee',
	},
	secondary: {
		main: '#7c3aed', // violet
		dark: '#6d28d9',
		light: '#a78bfa',
	},
	neutral: {
		100: '#f7f9fc',
		200: '#eef2f6',
		300: '#e5eaf0',
		700: '#334155',
		800: '#0b1220',
	},
};

const theme = createTheme({
	palette: {
		primary: brand.primary,
		secondary: brand.secondary,
		background: {
			default: brand.neutral[100],
			paper: '#ffffff',
		},
		text: {
			primary: brand.neutral[800],
			secondary: '#55607a',
		},
	},
	typography: {
		fontFamily: [
			'Inter var',
			'Inter',
			'Plus Jakarta Sans',
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			'sans-serif',
		].join(','),
		h1: { fontWeight: 800, letterSpacing: -0.5 },
		h2: { fontWeight: 800, letterSpacing: -0.4 },
		h3: { fontWeight: 700, letterSpacing: -0.2 },
		button: { textTransform: 'none', fontWeight: 700 },
	},
	shape: { borderRadius: 14 },
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'@global': {
					'@keyframes float': {
						'0%': { transform: 'translateY(0px)' },
						'50%': { transform: 'translateY(-8px)' },
						'100%': { transform: 'translateY(0px)' },
					},
					'@keyframes fadeInUp': {
						'0%': { opacity: 0, transform: 'translateY(16px)' },
						'100%': { opacity: 1, transform: 'translateY(0)' },
					},
					'@keyframes pulseGlow': {
						'0%': { boxShadow: '0 0 0 0 rgba(6,182,212,0.4)' },
						'70%': { boxShadow: '0 0 0 10px rgba(6,182,212,0)' },
						'100%': { boxShadow: '0 0 0 0 rgba(6,182,212,0)' },
					},
					':root': {
						'--brand-gradient': 'linear-gradient(135deg, #06b6d4 0%, #7c3aed 100%)',
						'--glass-bg': 'rgba(255,255,255,0.08)',
						'--glass-border': '1px solid rgba(255,255,255,0.18)'
					},
					body: {
						backgroundImage: 'radial-gradient(ellipse at 10% -20%, rgba(124,58,237,0.10), transparent 40%), radial-gradient(ellipse at 100% 0%, rgba(6,182,212,0.15), transparent 35%)',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 999,
					paddingInline: 20,
					minHeight: 44,
					boxShadow: '0 6px 18px rgba(6, 182, 212, 0.25)',
					transition: 'transform 180ms ease, box-shadow 180ms ease',
					'&:hover': {
						transform: 'translateY(-1px)',
						boxShadow: '0 10px 24px rgba(6, 182, 212, 0.35)',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(2,6,23,0.16)' },
					'&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(6,182,212,0.6)' },
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#06b6d4', boxShadow: '0 0 0 4px rgba(6,182,212,0.15)' },
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 16,
					boxShadow: '0 6px 30px rgba(17, 24, 39, 0.06)'
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 18,
					transition: 'transform 220ms ease, box-shadow 220ms ease',
					'&:hover': {
						transform: 'translateY(-4px)',
						boxShadow: '0 16px 40px rgba(17, 24, 39, 0.12)'
					},
				},
			},
		},
	},
});

export default theme;


