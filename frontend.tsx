import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  principal: string | null;
  isLoggingIn: boolean;
  isInitializing: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear, isLoggingIn, isInitializing, loginStatus } =
    useInternetIdentity();
  const queryClient = useQueryClient();
  const [hasError, setHasError] = useState(false);

  const isAuthenticated = !!identity;
  const principal = identity?.getPrincipal().toString() ?? null;

  const handleLogin = () => {
    setHasError(false);
    if (loginStatus === "loginError") {
      // Retry logic: clear and re-login
      void clear();
      setTimeout(() => login(), 300);
    } else {
      login();
    }
  };

  const handleLogout = () => {
    queryClient.clear();
    void clear();
    // Clear local stored role/profile
    localStorage.removeItem("maatru_role");
    localStorage.removeItem("maatru_profile");
  };

  useEffect(() => {
    if (loginStatus === "loginError") {
      setHasError(true);
    }
  }, [loginStatus]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        principal,
        isLoggingIn,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
import React from "react";
import { useLang, type Lang } from "@/contexts/LanguageContext";

const LANG_OPTIONS: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिंदी", short: "हि" },
  { code: "kn", label: "ಕನ್ನಡ", short: "ಕ" },
];

interface LanguageSwitcherProps {
  /** compact = icon-sized pills (for dashboard headers), full = full labels (for login/landing) */
  variant?: "compact" | "full";
}

export function LanguageSwitcher({ variant = "full" }: LanguageSwitcherProps) {
  const { lang, setLang } = useLang();

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-0.5 rounded-xl bg-muted/70 p-0.5">
        {LANG_OPTIONS.map(({ code, short }) => (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            className={[
              "px-2 py-1 rounded-lg text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-w-[28px]",
              lang === code
                ? "text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            ].join(" ")}
            style={
              lang === code
                ? {
                    background:
                      "linear-gradient(135deg, oklch(0.57 0.22 10) 0%, oklch(0.52 0.2 350) 100%)",
                    boxShadow: "0 1px 6px oklch(0.57 0.22 10 / 0.35)",
                  }
                : {}
            }
            aria-label={`Switch to ${code}`}
            aria-pressed={lang === code}
          >
            {short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {LANG_OPTIONS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={[
            "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            lang === code
              ? "text-white shadow-sm"
              : "text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80",
          ].join(" ")}
          style={
            lang === code
              ? {
                  background:
                    "linear-gradient(135deg, oklch(0.57 0.22 10) 0%, oklch(0.52 0.2 350) 100%)",
                  boxShadow: "0 2px 10px oklch(0.57 0.22 10 / 0.3)",
                }
              : {}
          }
          aria-pressed={lang === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

