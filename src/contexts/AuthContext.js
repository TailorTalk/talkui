import React, { createContext, useContext, useState, useEffect } from 'react';
import { firebaseConfig } from '../utils/constants';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CircularProgress, Box, Typography } from '@mui/material';
import loginService from '../services/login.service';
import { useNotify } from './NotifyContext';

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
    const {addMessage, addErrorMessage} = useNotify();
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    // const [userInfo, setUserInfo] = useState({
    //     "name": "Akash Anand",
    //     "email": "akashanand.iitd@gmail.com",
    //     "family_name": "Anand",
    //     "given_name": "Akash",
    //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ1556xpPhCZvGrbGtcu7onwe7ICMeOWprJAY5US5mh_DU=s96-c"
    // })
    useEffect(() => {
        setLoading(true);
        loginService.autoLogin()
            .then(response => {
                console.log("Auto Login response: ", response)
                return response.data
            })
            .then((data) => {
                const user_data = data.result
                console.log("Logged in User is: ", user_data)
                setIsLoggedIn(!!user_data);
                if (user_data) {
                    setUserInfo({
                        "name": user_data.name,
                        "email": user_data.email,
                        "picture": user_data.picture
                    });
                    addMessage("Logged in successfully");
                } else {
                    addErrorMessage("Could not login. Try again");
                }
            })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                addErrorMessage("Login resulted in error. Try logging in again");
                const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
                    user ? user.getIdToken(true).then((idToken) => {
                        loginService.login(idToken)
                            .then(response => {
                                console.log("Login response: ", response)
                                return response.data
                            })
                            .then((data) => {
                                const user_data = data.result
                                console.log("Logged in User is: ", user_data)
                                setIsLoggedIn(!!user_data);
                                if (user) {
                                    setUserInfo({
                                        "name": user_data.name,
                                        "email": user_data.email,
                                        "picture": user_data.picture
                                    });
                                    addMessage("Logged in successfully");
                                }
                            })
                            .then(() => {
                                setLoading(false);
                            })
                            .catch(() => {
                                console.log("Could not login");
                                setIsLoggedIn(false);
                                setLoading(false);
                            })
                    }) : (setLoading(false));
                });
                return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
            })

    }, []);

    const logout = () => {
        auth.signOut();
        loginService.logout()
        .then(response => {
            console.log("Logout response: ", response)
            return response.data
        })
        .catch(() => {
            console.log("Could not logout properly");
        })
        setIsLoggedIn(false);
        setUserInfo({});
    }

    console.log("Auth context: ", loading, isLoggedIn, userInfo)

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
            ) : (children)}
        </AuthContext.Provider>
    );
};
