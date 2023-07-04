'use client';

import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { initFirebase } from "../../firebase/firebaseApp";
import { useRouter } from 'next/navigation';

const auth = initFirebase;

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const clear = () => {
        setUser(null);
        router.push('/')
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
        <AuthContext.Provider value={{ user, clear }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};