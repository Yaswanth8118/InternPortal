import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, InputAdornment, CircularProgress, Alert, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event, newValue) => {
    setRole(newValue === 0 ? 'student' : 'admin');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      // Redirect based on role
      if (data.user.role === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 10% 10%, rgba(124,58,237,0.15), transparent 40%), radial-gradient(circle at 90% 0%, rgba(6,182,212,0.2), transparent 35%)'
    }}>
      <Container maxWidth="lg" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, alignItems: 'center' }}>
        <Box sx={{ color: 'text.primary', px: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>Unlock internships that accelerate your career</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>Curated roles, project-first learning, and mentor feedback. Join thousands of students building standout portfolios.</Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Box sx={{ width: 14, height: 14, borderRadius: '50%', background: '#06b6d4', animation: 'pulseGlow 2.2s infinite' }} />
            <Typography color="text.secondary">Real-time openings • Verified employers • Fast-track applications</Typography>
          </Box>
        </Box>
        <Paper elevation={0} sx={{ p: 4, width: '100%', maxWidth: 420, mx: { xs: 'auto', md: 0 }, borderRadius: 3, backdropFilter: 'blur(10px)', background: 'var(--glass-bg)', border: 'var(--glass-border)' }}>
        <Typography variant="h5" align="center" gutterBottom>Welcome back</Typography>
        <Tabs
          value={role === 'student' ? 0 : 1}
          onChange={handleRoleChange}
          centered
          sx={{ mb: 2 }}
        >
          <Tab label="Student" />
          <Tab label="Admin" />
        </Tabs>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Logging in...' : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
