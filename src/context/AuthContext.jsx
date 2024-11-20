import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [showMessage, setShowMessage] = useState(null);
  
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        showLoader,
        setShowLoader,
        showMessage,
        setShowMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
