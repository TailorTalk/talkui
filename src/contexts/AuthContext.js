import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({})
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    // const [userInfo, setUserInfo] = useState({
    //     "name": "Akash Anand",
    //     "email": "akashanand.iitd@gmail.com",
    //     "family_name": "Anand",
    //     "given_name": "Akash",
    //     "picture": "https://lh3.googleusercontent.com/a/ACg8ocJ1556xpPhCZvGrbGtcu7onwe7ICMeOWprJAY5US5mh_DU=s96-c"
    // })

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
