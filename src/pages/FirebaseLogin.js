import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider, signOut } from 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useAuth } from '../contexts/AuthContext'
import { Container, Typography, Box, Paper } from '@mui/material';


// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/assets',
  signInOptions: [
    GoogleAuthProvider.PROVIDER_ID,
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

function FirebaseLogin() {
    const { auth } = useAuth();
    
    return (
        <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" style={{ margin: '20px 0' }}>
          Sign in
        </Typography>
        <Paper
          elevation={6}
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: (theme) => theme.spacing(2),
            borderRadius: '4px',
          }}
        >
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </Paper>
      </Box>
    </Container>
    );
}

export default FirebaseLogin;
