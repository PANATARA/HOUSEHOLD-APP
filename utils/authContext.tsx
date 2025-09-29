import { checkToken } from "@/api/user";
import {
  deleteAllTokens,
  getRefreshToken,
} from "@/core/secureStorage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const logIn = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };

  const logOut = async () => {
    setIsLoggedIn(false);
    await deleteAllTokens();
    router.replace("/login");
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          setIsLoggedIn(false);
        } else {
          const status = await checkToken();
          setIsLoggedIn(200===status)
        }
      } catch (error) {
        console.log("Error checking auth:", error);
        setIsLoggedIn(false);
      } finally {
        setIsReady(true);
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isLoggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
