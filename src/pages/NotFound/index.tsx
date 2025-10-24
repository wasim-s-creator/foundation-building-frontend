import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>404 - Page Not Found</Typography>
      <Button component={Link} to="/" variant="contained">Go Home</Button>
    </>
  );
};

export default NotFound;
