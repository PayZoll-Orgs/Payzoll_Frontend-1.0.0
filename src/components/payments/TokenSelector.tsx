"use client";
import { useState, useEffect } from 'react';
import { Wallet, AlertTriangle, Coins, BarChart3, RefreshCw, PlusCircle, ChevronRight } from 'lucide-react';
import { useBalance } from 'wagmi';
import { formatUnits } from 'ethers';
import { NATIVE_ADDRESS } from '@/lib/evm-chains-mainnet';
import { motion } from 'framer-motion';

interface Token {
    address: string;
    symbol: string;
    decimals: number;
}

interface TokenSelectorProps {
    tokens: Token[];
    selectedToken: Token;
    onTokenChange: (token: Token) => void;
    address?: `0x${string}`;
    chainId?: number;
    isConnected: boolean;
    isLoading: boolean;
    exchangeRate: number;
    onExchangeRateChange: (rate: number) => void;
}

const TokenSelector = ({
    tokens,
    selectedToken,
    onTokenChange,
    address,
    chainId,
    isConnected,
    isLoading,
    exchangeRate,
    onExchangeRateChange
}: TokenSelectorProps) => {
    const [isRateEditing, setIsRateEditing] = useState(false);
    const [rateInput, setRateInput] = useState(exchangeRate.toString());

    // Balance hook with error handling
    const {
        data: balance,
        isLoading: isBalanceLoading,
        error: balanceError,
        refetch: refetchBalance
    } = useBalance({
        address: address,
        token: selectedToken?.address === NATIVE_ADDRESS
            ? undefined
            : (selectedToken?.address as `0x${string}`),
        chainId: chainId,
        query: {
            enabled: isConnected && !!selectedToken && !!address,
            retry: 3,
            retryDelay: 1000
        }
    });

    // Format balance for display
    const formattedBalance = balance
        ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)
        : '0';

    // Handle external token addition
    const handleAddToken = async () => {
        if (!window.ethereum) {
            return false;
        }

        if (selectedToken.address === NATIVE_ADDRESS) {
            return true;
        }

        try {
            const wasAdded = await window.ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20",
                    options: {
                        address: selectedToken.address,
                        symbol: selectedToken.symbol,
                        decimals: selectedToken.decimals || 18,
                    },
                },
            });

            return !!wasAdded;
        } catch (error) {
            console.error("Error adding token to wallet:", error);
            return false;
        }
    };

    const handleRateSubmit = () => {
        const newRate = parseFloat(rateInput);
        if (!isNaN(newRate) && newRate > 0) {
            onExchangeRateChange(newRate);
        } else {
            setRateInput(exchangeRate.toString());
        }
        setIsRateEditing(false);
    };

    // Force balance refetch when token changes
    useEffect(() => {
        if (isConnected && selectedToken && address) {
            refetchBalance();
        }
    }, [selectedToken?.address, refetchBalance, isConnected, address]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-4 
                      hover:border-[#2D8B75]/30 transition-all shadow-lg"
        >
            {isConnected ? (
                <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#2D8B75]/20 p-2 rounded-md">
                                <Coins className="w-5 h-5 text-[#2D8B75]" />
                            </div>
                            <h2 className="text-lg font-bold text-[#F2F2F2] font-mono" style={{
                                textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
                            }}>Payment Token</h2>
                        </div>
                        <button
                            onClick={() => refetchBalance()}
                            className="p-2 text-gray-400 hover:text-[#2D8B75] transition-colors"
                            title="Refresh balance"
                            disabled={isBalanceLoading}
                        >
                            <RefreshCw className={`w-4 h-4 ${isBalanceLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {/* Main Content - Horizontal Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Token Selection - Col 1 */}
                        <div className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl border border-[#22304a]/30 
                                       hover:border-[#2D8B75]/30 transition-all overflow-hidden p-3">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                    <Wallet className="w-3.5 h-3.5 text-[#2D8B75]" />
                                    <p className="text-gray-400 text-xs font-mono">Select Token</p>
                                </div>

                                {selectedToken.address !== NATIVE_ADDRESS && (
                                    <button
                                        onClick={handleAddToken}
                                        className="p-1.5 text-[#2D8B75] rounded-md hover:bg-[#2D8B75]/10 transition-colors"
                                        title="Add token to wallet"
                                        disabled={isLoading}
                                    >
                                        <PlusCircle className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="relative">
                                <select
                                    value={selectedToken.address}
                                    onChange={(e) => {
                                        const token = tokens.find(t => t.address === e.target.value);
                                        if (token) onTokenChange(token);
                                    }}
                                    className="w-full p-2 bg-[#0c0f16] border border-[#22304a]/30 rounded-lg
                                             text-[#F2F2F2] font-mono focus:outline-none focus:ring-2 focus:ring-[#2D8B75]/50
                                             transition-all text-base appearance-none font-medium"
                                    disabled={isLoading}
                                >
                                    {tokens?.map(token => (
                                        <option key={token.address} value={token.address}>
                                            {token.symbol}
                                        </option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rotate-90" />
                            </div>
                        </div>

                        {/* Balance - Col 2 */}
                        <div className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl border border-[#22304a]/30 
                                       hover:border-[#2D8B75]/30 transition-all overflow-hidden p-3">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                    <Wallet className="w-3.5 h-3.5 text-[#2D8B75]" />
                                    <p className="text-gray-400 text-xs font-mono">Available Balance</p>
                                </div>
                                <div className="text-[#2D8B75] font-bold font-mono text-xs px-1.5 py-0.5 bg-[#2D8B75]/10 rounded">
                                    {selectedToken?.symbol}
                                </div>
                            </div>

                            <p className={`text-[#F2F2F2] text-xl font-mono ${isBalanceLoading ? 'opacity-60' : ''} font-medium`}>
                                {isBalanceLoading ? 'Loading...' : formattedBalance}
                            </p>
                        </div>

                        {/* Exchange Rate - Col 3 */}
                        <div className="bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl border border-[#22304a]/30 
                                       hover:border-[#2D8B75]/30 transition-all overflow-hidden p-3">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5">
                                    <BarChart3 className="w-3.5 h-3.5 text-[#2D8B75]" />
                                    <p className="text-gray-400 text-xs font-mono">Exchange Rate</p>
                                </div>
                            </div>

                            {isRateEditing ? (
                                <div className="flex items-center gap-1 bg-[#0c0f16] border border-[#2D8B75]/20 rounded-lg p-1.5">
                                    <span className="text-[#2D8B75] font-mono text-sm whitespace-nowrap">1 {selectedToken?.symbol} = $</span>
                                    <input
                                        type="text"
                                        value={rateInput}
                                        onChange={(e) => setRateInput(e.target.value)}
                                        onBlur={handleRateSubmit}
                                        onKeyPress={(e) => e.key === 'Enter' && handleRateSubmit()}
                                        autoFocus
                                        className="flex-1 px-1 py-0.5 bg-transparent text-[#F2F2F2] font-mono text-lg
                                                 focus:outline-none"
                                    />
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div
                                        className="text-[#F2F2F2] text-xl font-mono cursor-pointer flex items-center gap-1 font-medium"
                                        onClick={() => setIsRateEditing(true)}
                                    >
                                        <span>1 {selectedToken?.symbol} = </span>
                                        <span className="text-[#2D8B75]">${exchangeRate}</span>
                                    </div>
                                    <button
                                        onClick={() => setIsRateEditing(true)}
                                        className="text-xs bg-[#2D8B75]/10 px-1.5 py-0.5 rounded text-[#2D8B75] 
                                                 hover:bg-[#2D8B75]/20 transition-colors font-mono"
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Error message */}
                    {balanceError && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-3 bg-red-400/10 border border-red-400/30 rounded-xl flex gap-2 items-center mt-2"
                        >
                            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <p className="text-[#F2F2F2] text-sm font-mono">
                                Error fetching balance. Please check your connection.
                            </p>
                        </motion.div>
                    )}
                </div>
            ) : (
                <div className="flex items-center justify-center py-5">
                    <div className="bg-[#0c0f16] p-3 rounded-full border border-[#22304a]/50 mr-4">
                        <Wallet className="w-7 h-7 text-gray-400" />
                    </div>
                    <div>
                        <p className="text-gray-400 font-mono mb-0.5 text-sm">
                            Connect your wallet to view
                        </p>
                        <p className="text-[#2D8B75] font-mono font-medium">token information</p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default TokenSelector;