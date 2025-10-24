import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Dashboard</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Welcome</Typography>
            <Typography color="text.secondary">Your Foundation Building frontend is running successfully.</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6">Next Steps</Typography>
            <Typography color="text.secondary">Start wiring GitHub APIs, Wiki, and Vector DB.</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
