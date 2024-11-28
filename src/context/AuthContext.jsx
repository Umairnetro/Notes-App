import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [username, setUsername] = useState("")

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    try{
      await signOut(auth)
      setAlertMessage("User logged out successfully!");
    } catch(error){
      setAlertMessage("Error logging out!");
    }
  }
  
  
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        showLoader,
        setShowLoader,
        showMessage,
        setShowMessage,
        auth,
        alertMessage,
        setAlertMessage,
        confirm,
        setConfirm,
        noteToDelete,
        setNoteToDelete,
        setUsername,
        username,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
