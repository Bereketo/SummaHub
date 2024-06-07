import React, { createContext, useState} from 'react';
// Import jwtDecode from jwt-decode library

const UserContext = createContext();

export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
   

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
