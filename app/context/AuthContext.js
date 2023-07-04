'use client';

import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { initFirebase } from "../../firebase/firebaseApp";

const auth = initFirebase;

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const clear = () => {
        setUser(null);
    };

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                clear();
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};