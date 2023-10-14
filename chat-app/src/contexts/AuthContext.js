import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [userInfo, setUserInfo] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userInfo, setUserInfo] = useState({})

    const login = (userInfo) => {
        setIsLoggedIn(true);
        setUserInfo(userInfo);
    }
    const logout = () => {
        setIsLoggedIn(false);
        setUserInfo({});
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userInfo, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
