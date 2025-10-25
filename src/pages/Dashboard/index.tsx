import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Paper,
  Button,
  Chip
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  Security as SecurityIcon,
  BugReport as BugIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section with Gradient */}
      <Paper 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: 6,
          marginBottom: 4,
          borderRadius: 2
        }}
      >
        <Typography variant="h2" gutterBottom fontWeight="bold">
          🎉 React is Working!
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9 }}>
          Foundation Building Frontend - Live Dashboard
        </Typography>
        <Chip 
          label="✓ React Mounted Successfully" 
          sx={{ 
            mt: 2, 
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontSize: '1rem',
            padding: 2
          }} 
        />
      </Paper>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}>
            <CardContent>
              <DashboardIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">12</Typography>
              <Typography>Active Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            color: 'white'
          }}>
            <CardContent>
              <GitHubIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">48</Typography>
              <Typography>GitHub Issues</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: 'white'
          }}>
            <CardContent>
              <StorageIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">1.2K</Typography>
              <Typography>Wiki Articles</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: 'white'
          }}>
            <CardContent>
              <SecurityIcon sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4">99%</Typography>
              <Typography>Security Score</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Feature Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <BugIcon color="error" sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="h5">Issue Templates</Typography>
              </Box>
              <Typography color="text.secondary" paragraph>
                Standardized templates for bug reports, feature requests, and security issues.
              </Typography>
              <Button variant="contained" color="primary">
                View Templates
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckIcon color="success" sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="h5">AI Vector Search</Typography>
              </Box>
              <Typography color="text.secondary" paragraph>
                AI-powered search through your Wiki knowledge base using vector embeddings.
              </Typography>
              <Button variant="contained" color="success">
                Search Wiki
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
