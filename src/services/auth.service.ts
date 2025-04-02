// src/services/auth.service.ts
import { jwtDecode } from "jwt-decode";

export interface UserData {
  id: string;
  email: string;
  name: string;
  walletAddress?: string;
  role: "employee" | "employer";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserData;
}

export interface WalletLoginParams {
  address: string;
  signature: string;
  message: string;
}

// In-memory user store (replace with a real database in production)
const USERS_STORE = new Map<string, {
  id: string;
  email: string;
  name: string;
  walletAddress?: string;
  role: "employee" | "employer";
  password: string; // In real app, this would be a password hash
}>();

// Initialize with some demo accounts
const initializeStore = () => {
  if (USERS_STORE.size === 0) {
    // Demo employer account
    addUser({
      id: "employer-123",
      email: "employer@example.com",
      name: "Demo Company",
      role: "employer",
      password: "password123"
    });

    // Demo employee account
    addUser({
      id: "employee-123", 
      email: "employee@example.com",
      name: "Demo Employee",
      role: "employee",
      password: "password123"
    });
  }
};

const addUser = (user: {
  id: string;
  email: string;
  name: string;
  walletAddress?: string;
  role: "employee" | "employer";
  password: string;
}) => {
  USERS_STORE.set(user.email.toLowerCase(), user);
};

export class AuthService {
  private tokenKey = "auth_token";
  private userKey = "user_data";

  constructor() {
    // Initialize demo accounts
    initializeStore();
  }

  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials;
      const user = USERS_STORE.get(email.toLowerCase());

      if (!user) {
        throw new Error("User not found");
      }

      // Verify password (simple comparison for demo - use bcrypt in real app)
      if (user.password !== password) {
        throw new Error("Invalid password");
      }

      // Create token
      const token = this.generateToken(user);

      // Create user data without password
      const userData: UserData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        walletAddress: user.walletAddress
      };

      // Store auth data
      this.setToken(token);
      this.setUser(userData);

      return {
        token,
        user: userData
      };
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid credentials");
    }
  }

  /**
   * Login with crypto wallet
   */
  async loginWithWallet({ address, signature, message }: WalletLoginParams): Promise<AuthResponse> {
    try {
      // In a real app, you would verify the signature on the backend
      // Here we're just checking if the address is linked to any user
      const userWithWallet = Array.from(USERS_STORE.values()).find(
        user => user.walletAddress && user.walletAddress.toLowerCase() === address.toLowerCase()
      );

      if (userWithWallet) {
        // Existing user with this wallet
        const token = this.generateToken(userWithWallet);
        const userData: UserData = {
          id: userWithWallet.id,
          email: userWithWallet.email,
          name: userWithWallet.name,
          role: userWithWallet.role,
          walletAddress: userWithWallet.walletAddress
        };

        this.setToken(token);
        this.setUser(userData);

        return { token, user: userData };
      } else {
        // Create a new user with this wallet
        const newUser = {
          id: `wallet-user-${Date.now()}`,
          email: `wallet-${address.slice(0, 8)}@example.com`,
          name: `Wallet User ${address.slice(0, 6)}`,
          walletAddress: address,
          role: "employee" as const,
          password: Math.random().toString(36).slice(2) // random password
        };

        addUser(newUser);

        const token = this.generateToken(newUser);
        const userData: UserData = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          walletAddress: newUser.walletAddress
        };

        this.setToken(token);
        this.setUser(userData);

        return { token, user: userData };
      }
    } catch (error) {
      console.error("Wallet login failed:", error);
      throw new Error("Failed to authenticate with wallet");
    }
  }

  /**
   * Register a new user
   */
  async register(userData: any): Promise<AuthResponse> {
    try {
      const { email, password, name, companyName, walletAddress } = userData;
      
      // Check if user already exists
      if (USERS_STORE.has(email.toLowerCase())) {
        throw new Error("User already exists");
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email: email.toLowerCase(),
        name: name || companyName,
        walletAddress,
        role: "employer" as const,
        password
      };

      // Add to store
      addUser(newUser);

      // Generate token
      const token = this.generateToken(newUser);

      // Create response without password
      const userResponse: UserData = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        walletAddress: newUser.walletAddress
      };

      return {
        token,
        user: userResponse
      };
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Failed to register user");
    }
  }

  /**
   * Logout the current user
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      // Check if token is expired
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  }

  /**
   * Get current user data
   */
  getCurrentUser(): UserData | null {
    try {
      const userJson = localStorage.getItem(this.userKey);
      if (!userJson) return null;
      
      return JSON.parse(userJson) as UserData;
    } catch {
      return null;
    }
  }

  /**
   * Get stored auth token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Set auth token in storage
   */
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Set user data in storage
   */
  private setUser(user: UserData): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Generate JWT token
   */
  private generateToken(user: any): string {
    // In a real app, this would be done on the server with a proper JWT library
    // This is just a mock implementation for the demo
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      walletAddress: user.walletAddress,
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
      iat: Math.floor(Date.now() / 1000)
    }));
    const signature = btoa(`${user.id}-${Date.now()}`); // Not a real signature
    
    return `${header}.${payload}.${signature}`;
  }
}

// Create and export a singleton instance
export const authService = new AuthService();