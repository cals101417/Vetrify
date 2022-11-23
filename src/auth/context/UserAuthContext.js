import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

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
  const signup = async (email, password, firstname, lastname) => {
    const signedUpUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = {
      email,
      firstname,
      lastname,
      role: "admin",
      online: true,
      photoURL: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", signedUpUser.user.uid), newUser);
    setUser({
      ...newUser,
      createdAt: new Date().toISOString(),
      uid: signedUpUser.user.uid,
    });
    return signedUpUser;
  };

  const login = async (email, password) => {
    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const snapshot = await getDocs(userQuery);
    const isAdmin = snapshot.docs.some((d) => d.data().role === "admin");
    if (!isAdmin) {
      alert("User is not an admin");
      return;
    }

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
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      const unsubuscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          getDoc(doc(db, "users", currentUser.uid))
            .then((doc) => {
              if (doc.exists()) {
                setUser({
                  ...doc.data(),
                  createdAt: doc.data().createdAt.toDate(),
                  uid: currentUser.uid,
                });
              }
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
            });
        } else {
          setUser(null);
        }
      });
      return () => unsubuscribe();
    }
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
