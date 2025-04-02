"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  authService, 
  LoginCredentials, 
  UserData, 
  WalletLoginParams 
} from "@/services/auth.service";
import { walletService } from "@/services/wallet.service";

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithCredentials: (credentials: LoginCredentials) => Promise<void>;
  loginWithWallet: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  walletAddress: string | null;
  isWalletConnected: boolean;
  connectWallet: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const router = useRouter();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        console.log("Initializing auth context");
        
        // Check if user is authenticated
        if (authService.isAuthenticated()) {
          const userData = authService.getCurrentUser();
          console.log("Found authenticated user:", userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log("No authenticated user found");
        }
        
        // Check if wallet is connected
        try {
          const isConnected = await walletService.isConnected();
          if (isConnected) {
            const address = await walletService.getAddress();
            console.log("Found connected wallet:", address);
            setWalletAddress(address);
            setIsWalletConnected(true);
          } else {
            console.log("No connected wallet found");
          }
        } catch (walletError) {
          console.error("Error checking wallet connection:", walletError);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        authService.logout();
        walletService.disconnect();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Set up wallet event listeners (if wallet is available)
    const setupWalletEvents = () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        // Listen for accounts changed
        (window as any).ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length === 0) {
            // User disconnected wallet
            setWalletAddress(null);
            setIsWalletConnected(false);
          } else {
            // Account changed
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
          }
        });

        // Listen for chain changed
        (window as any).ethereum.on("chainChanged", () => {
          // Refresh page on chain change
          window.location.reload();
        });
      }
    };

    setupWalletEvents();

    // Clean up event listeners
    return () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        (window as any).ethereum.removeAllListeners?.();
      }
    };
  }, []);

  /**
   * Login with email/password
   */
  const loginWithCredentials = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    
    try {
      console.log("Attempting to login with credentials:", credentials);
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log("Login successful, user:", response.user);
      
      // Redirect based on user role
      if (response.user.role === "employer") {
        router.push("/employerDashboard");
      } else {
        router.push("/employeeDashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login with wallet
   */
  const loginWithWallet = async () => {
    setIsLoading(true);
    
    try {
      console.log("Attempting to login with wallet");
      if (!isWalletConnected) {
        await connectWallet();
      }
      
      // Sign login message
      const signResult = await walletService.signLoginMessage();
      if (!signResult) {
        throw new Error("Failed to sign login message");
      }
      
      const { signature, address, message } = signResult;
      console.log("Got wallet signature:", signature.substring(0, 20) + "...");
      
      // Login with wallet
      const response = await authService.loginWithWallet({
        address,
        signature,
        message
      });
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      console.log("Wallet login successful, user:", response.user);
      
      // Redirect to dashboard
      if (response.user.role === "employer") {
        router.push("/employerDashboard");
      } else {
        router.push("/employeeDashboard");
      }
    } catch (error) {
      console.error("Wallet login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register new user
   */
  const register = async (userData: any) => {
    setIsLoading(true);
    
    try {
      const response = await authService.register(userData);
      
      // In a real app, you might auto-login after registration
      // For now, redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    
    // Optionally disconnect wallet too
    walletService.disconnect();
    setWalletAddress(null);
    setIsWalletConnected(false);
    
    router.push("/");
  };

  /**
   * Check authentication status
   */
  const checkAuth = async (): Promise<boolean> => {
    const isAuth = authService.isAuthenticated();
    if (isAuth) {
      const userData = authService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    setUser(null);
    setIsAuthenticated(false);
    return false;
  };

  /**
   * Connect wallet
   */
  const connectWallet = async (): Promise<string | null> => {
    try {
      const result = await walletService.connect();
      if (result) {
        setWalletAddress(result.address);
        setIsWalletConnected(true);
        return result.address;
      }
      return null;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return null;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    loginWithCredentials,
    loginWithWallet,
    register,
    logout,
    checkAuth,
    walletAddress,
    isWalletConnected,
    connectWallet
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};