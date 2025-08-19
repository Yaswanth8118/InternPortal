import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  return (
    <>
      <Box sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100vh - 72px)', md: 'calc(100vh - 88px)' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--brand-gradient)'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 6, flexDirection: { xs: 'column', md: 'row' } }}>
            <Box sx={{ color: '#fff', animation: 'fadeInUp 600ms ease both' }}>
              <Chip label="New" sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 }} />
              <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                Land your dream internship faster
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, color: 'rgba(255,255,255,0.85)' }}>
                Explore curated opportunities, complete hands-on projects, and get mentored by experts.
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" size="large" endIcon={<ArrowForwardIcon />} href="/internships">
                  Browse Internships
                </Button>
                <Button variant="outlined" color="inherit" size="large" href="/about">
                  How it works
                </Button>
              </Box>
            </Box>
            <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr' }, gap: 2 }}>
              {[
                { title: 'Top Companies', desc: 'Work with brands that matter' },
                { title: 'Mentor Support', desc: 'Guidance at every step' },
                { title: 'Project-First', desc: 'Build a strong portfolio' },
                { title: 'Certifications', desc: 'Stand out to recruiters' },
              ].map((item, idx) => (
                <Card key={idx} sx={{ bgcolor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(6px)' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Container>
        <Box sx={{
          position: 'absolute',
          right: -80,
          top: 40,
          width: 220,
          height: 220,
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '50%',
          filter: 'blur(2px)',
          animation: 'float 6s ease-in-out infinite'
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 800 }}>
          Featured Categories
        </Typography>
        <Typography align="center" color="text.secondary" sx={{ mt: 1, mb: 6 }}>
          Discover internships tailored to your skills and interests
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: 'Software Engineering', color: '#e0f7f1' },
            { title: 'Data Science', color: '#e8f0ff' },
            { title: 'UI/UX Design', color: '#fff1f2' },
            { title: 'Marketing', color: '#fef7e0' },
            { title: 'Finance', color: '#eef7ff' },
            { title: 'Product', color: '#f3f7f9' },
          ].map((cat, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card sx={{ bgcolor: cat.color }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{cat.title}</Typography>
                  <Typography variant="body2" color="text.secondary">120+ open roles</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ pb: { xs: 10, md: 14 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>Success Stories</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  See how students landed roles at top companies using our platform.
                </Typography>
                <Box sx={{ mt: 2, display: 'grid', gap: 2 }}>
                  {["Landed SDE Intern at Stripe", "Joined UX team at Spotify", "Data Analyst Intern at Airbnb"].map((t, i) => (
                    <Box key={i} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>{t}</Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ bgcolor: 'rgba(18,184,134,0.08)' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>For Employers</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Post roles, review applications, and manage interview pipelines in one place.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} href="/login">Get Started</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
