import {
  createContext,
  useState,
  ReactNode,
} from "react";

import {
  getAccessToken,
  removeTokens,
} from "../services/tokenService";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext =
  createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
  });

type Props = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: Props) {

  const [isAuthenticated, setIsAuthenticated] =
    useState(() => !!getAccessToken());

  function login() {
    setIsAuthenticated(true);
  }

  function logout() {
    removeTokens();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
