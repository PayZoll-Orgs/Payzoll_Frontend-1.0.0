// src/services/wallet.service.ts
import { ethers } from "ethers";

export interface ConnectWalletResult {
  address: string;
  chainId: number;
  isConnected: boolean;
}

class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  
  /**
   * Initialize wallet provider
   */
  async initialize(): Promise<boolean> {
    try {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const ethereum = (window as any).ethereum;
        this.provider = new ethers.BrowserProvider(ethereum);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to initialize wallet provider:", error);
      return false;
    }
  }
  
  /**
   * Connect wallet and get address
   */
  async connect(): Promise<ConnectWalletResult | null> {
    try {
      if (!this.provider) {
        const initialized = await this.initialize();
        if (!initialized) {
          throw new Error("No Ethereum provider found. Please install MetaMask or another web3 wallet.");
        }
      }
      
      // Request account access
      await this.provider!.send("eth_requestAccounts", []);
      
      // Get the signer
      this.signer = await this.provider!.getSigner();
      
      // Get address and chain info
      const address = await this.signer.getAddress();
      const network = await this.provider!.getNetwork();
      
      return {
        address,
        chainId: Number(network.chainId),
        isConnected: true
      };
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return null;
    }
  }
  
  /**
   * Sign message with wallet
   */
  async signMessage(message: string): Promise<{ signature: string; address: string } | null> {
    try {
      if (!this.signer) {
        throw new Error("Wallet not connected");
      }
      
      const address = await this.signer.getAddress();
      const signature = await this.signer.signMessage(message);
      
      return { signature, address };
    } catch (error) {
      console.error("Failed to sign message:", error);
      return null;
    }
  }
  
  /**
   * Sign and verify a login challenge
   * Uses current timestamp as nonce
   */
  async signLoginMessage(): Promise<{ signature: string; address: string; message: string } | null> {
    try {
      if (!this.signer) {
        const connected = await this.connect();
        if (!connected) {
          throw new Error("Failed to connect wallet");
        }
      }
      
      const address = await this.signer!.getAddress();
      const timestamp = Date.now();
      const message = `Sign this message to log in to PayZoll: ${timestamp}`;
      
      const signature = await this.signer!.signMessage(message);
      return { signature, address, message };
    } catch (error) {
      console.error("Failed to sign login message:", error);
      return null;
    }
  }
  
  /**
   * Verify a signature (typically would be done server-side)
   */
  verifySignature(message: string, signature: string, expectedAddress: string): boolean {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature);
      return recoveredAddress.toLowerCase() === expectedAddress.toLowerCase();
    } catch (error) {
      console.error("Failed to verify signature:", error);
      return false;
    }
  }
  
  /**
   * Disconnect wallet
   */
  disconnect(): void {
    this.provider = null;
    this.signer = null;
  }
  
  /**
   * Check if wallet is connected
   */
  async isConnected(): Promise<boolean> {
    try {
      if (!this.provider) {
        await this.initialize();
        if (!this.provider) return false;
      }
      
      const accounts = await this.provider.send("eth_accounts", []);
      return accounts && accounts.length > 0;
    } catch {
      return false;
    }
  }
  
  /**
   * Get current wallet address
   */
  async getAddress(): Promise<string | null> {
    try {
      if (!this.signer) {
        const isConnected = await this.isConnected();
        if (!isConnected) return null;
        this.signer = await this.provider!.getSigner();
      }
      
      return await this.signer.getAddress();
    } catch {
      return null;
    }
  }
  
  /**
   * Listen for account changes
   */
  onAccountsChanged(callback: (accounts: string[]) => void): void {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum.on("accountsChanged", callback);
    }
  }
  
  /**
   * Listen for chain changes
   */
  onChainChanged(callback: (chainId: string) => void): void {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", callback);
    }
  }
}

// Create and export a singleton instance
export const walletService = new WalletService();