import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="20vh">
    <CircularProgress size={size} />
  </Box>
);
