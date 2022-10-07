import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const userAuthContext = createContext();

export const useAuth = () => {
  const context = useContext(userAuthContext);
  if (!context) throw new Error("There is no Auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    const usersuid = await signInWithEmailAndPassword(auth, email, password);
    await updateDoc(doc(db, "users", usersuid.user.uid), {
      online: true,
    });

    return usersuid.user;
  };

  const logout = async () => {
    await signOut(auth);
    await updateDoc(doc(db, "users", user.uid), {
      online: false,
    });
  };

  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  // const resetPassword = async (email) => sendPasswordResetEmail(auth, email);
  // const UserDelete = (user) => {
  //   return deleteUser(auth, user);
  // };

  return (
    <userAuthContext.Provider
      value={{
        signup,
        login,
        logout,
        user,
        loading,
        setLoading,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
