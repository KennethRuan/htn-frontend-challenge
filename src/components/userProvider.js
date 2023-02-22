import React, { createContext, useState } from 'react';

export const userContext = createContext();

export const UserProvider = ({ children }) => {
    const [userPermission, setUserPermission] = useState("public");

    const login = () =>{
        setUserPermission("private");
    }

    const logout = () =>{
        setUserPermission("public");
    }

    return (
        <userContext.Provider
        value={{
            userPermission,
            login,
            logout
        }}
        >
        {children}
        </userContext.Provider>
    );
};