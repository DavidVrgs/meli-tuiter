import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type JSX,
} from "react";
import { httpClient } from "../../lib/httpClient";
import {
  SignUpErrorCode,
  type LoginPayload,
  type SignUpPayload,
  type User,
} from "../../interfaces/auth";
import { getUserProfile } from "../../../features/profile/api/profile.api";
import { ApiCode, type ApiError } from "../../interfaces/api";
import { userLogin, userSignUp } from "../../../features/auth/api/auth.api";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<{
    status: ApiCode;
  }>;
  singUp: (payload: SignUpPayload) => Promise<{
    status: ApiCode;
    code: SignUpErrorCode;
  }>;
  logout: () => void;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (payload: LoginPayload) => {
    try {
      setLoading(true);
      const userData = await userLogin(payload);
      setUserProfile(userData.token, true);
      return {
        status: ApiCode.SUCCESS,
      };
    } catch {
      setLoading(false);
      return {
        status: ApiCode.BAD_REQUEST,
      };
    }
  };

  const singUp = async (payload: SignUpPayload) => {
    try {
      setLoading(true);
      const userData = await userSignUp(payload);
      setUserProfile(userData.token, true);
      return {
        status: ApiCode.SUCCESS,
        code: SignUpErrorCode.SUCCESS,
      };
    } catch (error) {
      setLoading(false);
      if (
        (error as ApiError).response?.data.syserror.includes("Duplicate entry")
      ) {
        return {
          status: ApiCode.BAD_REQUEST,
          code: SignUpErrorCode.DUPLICATE_ENTRY,
        };
      }
      return {
        status: ApiCode.BAD_REQUEST,
        code: SignUpErrorCode.UNKNOWN_ERROR,
      };
    }
  };

  const setUserProfile = useCallback(
    async (token: string, isLogin?: boolean) => {
      try {
        if (!isLogin) setLoading(true);
        localStorage.setItem("access_token", token);
        httpClient.defaults.headers.common["Authorization"] = token;
        const userData = await getUserProfile();
        setUser(userData);
        setLoading(false);
      } catch {
        setLoading(false);
        if (!isLogin) logout();
      }
    },
    []
  );

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    delete httpClient.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  const isAuthenticated = useMemo(() => !!user, [user]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const path = window.location.pathname;
    if (token) {
      setUserProfile(token);
    }
    if (!token && !["/login", "/signup"].includes(path)) {
      window.location.href = "/login";
    }
  }, [setUserProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        singUp,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
