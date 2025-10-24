import React from 'react';
import { Typography, Button } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

const Login: React.FC = () => {
  const { login } = useAuthStore();
  return (
    <>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <Button variant="contained" onClick={login}>Mock Login</Button>
    </>
  );
};

export default Login;
