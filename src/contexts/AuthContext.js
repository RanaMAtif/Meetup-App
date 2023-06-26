import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firbaseConfig";

import {
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "@firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function login(email, password) {
    let isLogin = false;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        isLogin = true;
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          isLogin = false;
        }
        console.error(" signInWithEmailAndPassword :", error);
      });

    return isLogin;
  }

  async function signOut() {
    console.log("Signout Clicked");
    return await auth.signOut();
  }

  async function verifyemail(email) {
    let isEmailExist = false;

    await fetchSignInMethodsForEmail(auth, email)
      .then((signInMethods) => {
        console.log(signInMethods);

        if (signInMethods.length === 0) {
          console.log("Email address is not registered ooo");

          isEmailExist = false;
        } else {
          isEmailExist = true;

          console.log("Email address is registered hhh");
        }
      })
      .catch(function (error) {
        console.error("fetchSignInMethodsForEmail :", error);
      });

    return isEmailExist;
  }

  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function getUser() {
    let retvalue = auth.currentUser;
    console.log("Current User " + retvalue);

    return retvalue;
  }

  function isAdmin() {
    return auth.currentUser.getIdTokenResult().then((idTokenResult) => {
      if (!!idTokenResult.claims.admin) {
        return true;
      } else {
        return false;
      }
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getUser,
    login,
    signOut,
    signUp,
    verifyemail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
