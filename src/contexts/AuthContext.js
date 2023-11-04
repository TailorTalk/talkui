import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseConfig } from '../utils/constants';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, EmailAuthProvider, signOut } from 'firebase/auth';
import { CircularProgress, Box, Typography } from '@mui/material';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};


export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = React.useState(true);
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    // const [userInfo, setUserInfo] = useState({
    //     "name": "Akash Anand",
    //     "email": "akashanand.iitd@gmail.com",
    //     "family_name": "Anand",
    //     "given_name": "Akash",
    //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ1556xpPhCZvGrbGtcu7onwe7ICMeOWprJAY5US5mh_DU=s96-c"
    // })
    useEffect(() => {
        const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
            console.log("User is: ", user)
            setIsLoggedIn(!!user);
            if (user) {
                setUserInfo({
                    "name": user.displayName,
                    "email": user.email,
                    "picture": user.photoURL});
            }
            setLoading(false);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      }, []);

    const logout = () => {
        auth.signOut();
        setIsLoggedIn(false);
        setUserInfo({});
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInfo, logout, auth }}>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh', // Full viewport height
                        backgroundColor: (theme) => theme.palette.background.default,
                    }}
                >
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Loading...
                    </Typography>
                </Box>
            ):(children)}
        </AuthContext.Provider>
    );
};
