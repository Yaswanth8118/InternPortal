import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardContent, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        minHeight: 'calc(100vh - 88px)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        color: 'white',
        py: 8
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 6, 
            flexDirection: { xs: 'column', md: 'row' },
            position: 'relative',
            zIndex: 1
          }}>
            <Box sx={{ 
              maxWidth: 600,
              textAlign: { xs: 'center', md: 'left' },
              animation: 'fadeInUp 0.6s ease both'
            }}>
              <Chip 
                label="New" 
                sx={{ 
                  mb: 3, 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: '#fff', 
                  fontWeight: 600,
                  height: 28,
                  fontSize: '0.8rem'
                }} 
              />
              <Typography 
                variant="h2" 
                sx={{ 
                  fontWeight: 800, 
                  lineHeight: 1.1,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  mb: 2
                }}
              >
                Components you shall have, young padawan.
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mt: 2, 
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '1.25rem',
                  mb: 4
                }}
              >
                Build amazing user interfaces with our carefully crafted React components.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 2,
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  endIcon={<ArrowForwardIcon />} 
                  sx={{
                    bgcolor: 'white',
                    color: 'black',
                    '&:hover': { bgcolor: '#eee' },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: 'rgba(255, 255, 255, 0.1)' 
                    },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
            
            <Grid container spacing={2} sx={{ maxWidth: 500, display: { xs: 'none', md: 'grid' } }}>
              {[
                { title: 'Customizable', desc: 'Easily theme and style' },
                { title: 'Accessible', desc: 'Built with a11y in mind' },
                { title: 'Responsive', desc: 'Looks great on all devices' },
                { title: 'Fast', desc: 'Optimized performance' },
              ].map((item, idx) => (
                <Grid item xs={6} key={idx}>
                  <Card sx={{ 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                    }
                  }}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'white' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
        
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          right: { xs: -100, md: -50 },
          top: '20%',
          width: { xs: 200, md: 300 },
          height: { xs: 200, md: 300 },
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
          animation: 'float 8s ease-in-out infinite',
          zIndex: 0
        }} />
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            label="Features" 
            sx={{ 
              mb: 2, 
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              color: 'primary.main',
              fontWeight: 600,
              height: 28,
              fontSize: '0.8rem'
            }} 
          />
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Built for Developers
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto' }}>
            Everything you need to build beautiful, responsive web applications
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            { 
              title: 'Modern UI', 
              desc: 'Sleek, modern components that follow the latest design trends',
              color: '#e3f2fd'
            },
            { 
              title: 'Easy Customization', 
              desc: 'Fully customizable to match your brand and design system',
              color: '#e8f5e9'
            },
            { 
              title: 'Performance', 
              desc: 'Optimized for fast loading and smooth interactions',
              color: '#fff3e0'
            },
          ].map((feature, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ 
                height: '100%',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    width: 48, 
                    height: 48, 
                    borderRadius: '12px',
                    bgcolor: feature.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3
                  }}>
                    <Box sx={{ fontSize: 24 }}>✨</Box>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            textAlign: 'center',
            maxWidth: 800,
            mx: 'auto',
            position: 'relative',
            zIndex: 1
          }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
              Ready to get started?
            </Typography>
            <Typography variant="h6" sx={{ 
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              fontSize: '1.25rem'
            }}>
              Join thousands of developers building amazing user interfaces with our components.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: '#f5f5f5' },
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
        
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          right: -100,
          top: -100,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%'
        }} />
        <Box sx={{
          position: 'absolute',
          left: -100,
          bottom: -100,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)',
          borderRadius: '50%'
        }} />
      </Box>
    </Box>
  );
};

export default Home;
