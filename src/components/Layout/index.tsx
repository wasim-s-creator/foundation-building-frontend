import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';

export const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Foundation Building
          </Typography>
          <Button component={Link} to="/dashboard" color={location.pathname === '/dashboard' ? 'primary' : 'inherit'}>
            Dashboard
          </Button>
          <Button component={Link} to="/templates" color={location.pathname === '/templates' ? 'primary' : 'inherit'}>
            Templates
          </Button>
          <Button component={Link} to="/github" color={location.pathname === '/github' ? 'primary' : 'inherit'}>
            GitHub
          </Button>
          <Button component={Link} to="/wiki" color={location.pathname === '/wiki' ? 'primary' : 'inherit'}>
            Wiki
          </Button>
          <Button component={Link} to="/vector-search" color={location.pathname === '/vector-search' ? 'primary' : 'inherit'}>
            Vector Search
          </Button>
          <Button component={Link} to="/settings" color={location.pathname === '/settings' ? 'primary' : 'inherit'}>
            Settings
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
