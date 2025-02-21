import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import auth from "../../firebase.config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const googleProvider = new GoogleAuthProvider();
   

    const googleSignIn = async() => {
        setLoading(true);
        try{           
            const result = await signInWithPopup(auth, googleProvider);
            const signedInUser = result.user;
            console.log(signedInUser);
            // Set user state to the signed-in user
            setUser(signedInUser);
        }finally{
            setLoading(false);
        }       
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUser(currentUser);
            }else{
                setUser(null);
            }           
            setLoading(false);
        });

        return unsubscribe;
    }, [])

    const logout = async() => {
        setLoading(true);
        await signOut(auth);
        setUser(null);
        setLoading(false);
    }


    return (
        <AuthContext.Provider value={{ user, loading, googleSignIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;