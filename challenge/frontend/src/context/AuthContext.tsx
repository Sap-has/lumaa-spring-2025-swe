import { createContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
