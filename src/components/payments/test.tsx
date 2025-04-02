"use client";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
    useReadContract,
    useConfig
} from 'wagmi';
import { waitForTransactionReceipt } from "@wagmi/core";
import { useState, useEffect } from 'react';
import { contractMainnetAddresses as transferContract } from '@/lib/evm-tokens-mainnet';
import { allMainnetChains as chains, NATIVE_ADDRESS } from '@/lib/evm-chains-mainnet';
import { tokensPerMainnetChain as tokens } from '@/lib/evm-tokens-mainnet';
import { formatUnits, parseUnits } from 'ethers';

import transferAbi from '@/utils/Transfer.json';
import { erc20Abi } from 'viem';
import { DollarSign, Wallet, ChevronRight, AlertTriangle, ActivityIcon } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

// Import custom components
import TokenSelector from './TokenSelector';
import PaymentStatus from './PaymentStatus';
import EmployeeTable from './EmployeeTable';
import { Employee } from './EditEmployeeModal';

const PaymentDashboard = () => {
    // Employee state
    const [employees, setEmployees] = useState<Employee[]>([
        { id: "1", name: "Alex Johnson", wallet: "0xE071d5028D166eb1D92932D9319E491d0B223301", salary: "1", department: "Engineering" },
        { id: "2", name: "Sarah Williams", wallet: "0xE071d5028D166eb1D92932D9319E491d0B223301", salary: "1", department: "Design" },
        { id: "3", name: "Mike Chen", wallet: "0x1Db3439a222C519ab44bb1144fC28167b4Fa6EE6", salary: "0.65", department: "Marketing" },
        { id: "4", name: "Priya Patel", wallet: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", salary: "0.7", department: "Finance" },
    ]);

    // Wallet connection state
    const { address, isConnected, chainId } = useAccount();
    const config = useConfig();

    // UI state
    const [selectedChain, setSelectedChain] = useState(chains[0]);
    const [selectedToken, setSelectedToken] = useState(tokens[chains[0].id][0]);
    const [txError, setTxError] = useState('');
    const [needsApproval, setNeedsApproval] = useState(false);
    const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
    const [exchangeRate, setExchangeRate] = useState(1);
    const [isApproving, setIsApproving] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [approvalTxHash, setApprovalTxHash] = useState<`0x${string}` | undefined>(undefined);
    const [showPaymentStatus, setShowPaymentStatus] = useState(false);

    // Transaction state
    const { writeContractAsync, isPending: isWritePending, data: txHash } = useWriteContract();
    const { isLoading: isTxLoading, isSuccess: isTxSuccess, isError: isTxError } =
        useWaitForTransactionReceipt({ hash: txHash });

    // Derived loading state
    const isLoading = isApproving || isSending || isWritePending || isTxLoading;

    // Set chain based on connected wallet's chain
    useEffect(() => {
        if (chainId) {
            const chain = chains.find(c => c.id === chainId);
            if (chain) {
                setSelectedChain(chain);

                if (tokens[chain.id]?.length > 0) {
                    setSelectedToken(tokens[chain.id][0]);
                }
            }
        }
    }, [chainId]);

    // Get transfer contract address for current chain
    const getTransferContract = () => {
        return transferContract[selectedChain.id];
    };

    // Check ERC20 allowance if not native token
    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        address: selectedToken?.address !== NATIVE_ADDRESS
            ? (selectedToken?.address as `0x${string}`)
            : undefined,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [
            address as `0x${string}`,
            getTransferContract() as `0x${string}`
        ],
        chainId: selectedChain?.id,
        query: {
            enabled: isConnected &&
                !!selectedToken &&
                !!address &&
                selectedToken?.address !== NATIVE_ADDRESS &&
                !!getTransferContract()
        }
    });

    // Check if approval is needed for the entered amount
    useEffect(() => {
        if (
            selectedToken?.address !== NATIVE_ADDRESS &&
            allowance !== undefined &&
            selectedEmployees.length > 0
        ) {
            try {
                const totalAmount = calculateTotalAmount();
                const parsedAmount = parseUnits(usdToToken(totalAmount.toString()), selectedToken.decimals);
                setNeedsApproval(allowance < parsedAmount);
            } catch (e) {
                // Invalid amount format, ignore
            }
        } else {
            setNeedsApproval(false);
        }
    }, [allowance, selectedEmployees, selectedToken]);

    // Force refetch allowance when token changes
    useEffect(() => {
        if (isConnected && selectedToken && address && selectedToken?.address !== NATIVE_ADDRESS) {
            refetchAllowance();
        }
    }, [selectedToken?.address, selectedChain?.id, refetchAllowance, isConnected, address, selectedToken]);

    // Calculate total amount needed for selected employees
    const calculateTotalAmount = () => {
        return employees
            .filter(emp => selectedEmployees.includes(emp.id))
            .reduce((sum, emp) => sum + parseFloat(emp.salary), 0);
    };

    // Get recipients and amounts for selected employees
    const getRecipientsAndAmounts = () => {
        const selectedEmployeeData = employees.filter(emp => selectedEmployees.includes(emp.id));

        return {
            recipients: selectedEmployeeData.map(emp => emp.wallet as `0x${string}`),
            amounts: selectedEmployeeData.map(emp => {
                const tokenAmount = usdToToken(emp.salary);
                return parseUnits(tokenAmount, selectedToken.decimals);
            })
        };
    };

    // Convert USD salary to token amount
    const usdToToken = (usdAmount: string) => {
        return (parseFloat(usdAmount) / exchangeRate).toFixed(6);
    };

    // Get block explorer URL based on chain
    const getExplorerUrl = (txHash: `0x${string}` | undefined): string => {
        const explorer = selectedChain.blockExplorers?.default?.url;
        if (!explorer) return '#';
        return `${explorer}/tx/${txHash}`;
    };

    // Handle employee selection
    const toggleEmployeeSelection = (employeeId: string) => {
        setSelectedEmployees(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    // Check if all employees are selected
    const allEmployeesSelected = selectedEmployees.length === employees.length;

    // Toggle all employees selection
    const toggleAllEmployees = () => {
        if (allEmployeesSelected) {
            setSelectedEmployees([]);
        } else {
            setSelectedEmployees(employees.map(emp => emp.id));
        }
    };

    // Handle token change
    const handleTokenChange = (token: any) => {
        setSelectedToken(token);
    };

    // Handle exchange rate change
    const handleExchangeRateChange = (rate: number) => {
        setExchangeRate(rate);
    };

    // Handle employee update
    const handleEmployeeUpdate = (updatedEmployee: Employee) => {
        setEmployees(prev =>
            prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp)
        );
    };

    // Handle employee delete
    const handleEmployeeDelete = (id: string) => {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
        setSelectedEmployees(prev => prev.filter(empId => empId !== id));
    };

    // Handle employee add
    const handleEmployeeAdd = (newEmployee: Employee) => {
        // Ensure unique ID
        const highestId = Math.max(...employees.map(emp => parseInt(emp.id)), 0);
        const employeeWithId = {
            ...newEmployee,
            id: (highestId + 1).toString()
        };

        setEmployees(prev => [...prev, employeeWithId]);
    };

    const handleTransaction = async () => {
        // Reset error state
        setTxError('');

        // Show payment status when starting a transaction
        setShowPaymentStatus(true);

        // Validate selections
        if (selectedEmployees.length === 0) {
            setTxError('Please select at least one employee to pay');
            return;
        }

        try {
            const transferContractAddress = getTransferContract();
            if (!transferContractAddress) {
                setTxError('No transfer contract available for this network');
                return;
            }

            // Get recipient addresses and amounts
            const { recipients, amounts } = getRecipientsAndAmounts();
            const totalAmount = amounts.reduce((sum, amount) => sum + amount, BigInt(0));

            // For ERC20 tokens that need approval
            if (selectedToken.address !== NATIVE_ADDRESS && needsApproval) {
                // Start approval process
                setIsApproving(true);

                try {
                    const approvalHash = await writeContractAsync({
                        address: selectedToken.address as `0x${string}`,
                        abi: erc20Abi,
                        functionName: 'approve',
                        args: [transferContractAddress as `0x${string}`, totalAmount],
                        chainId: selectedChain.id
                    });

                    setApprovalTxHash(approvalHash);

                    // Wait for approval transaction to be mined
                    const approvalReceipt = await waitForTransactionReceipt(config, {
                        chainId: selectedChain.id,
                        hash: approvalHash
                    });

                    if (approvalReceipt.status !== 'success') {
                        throw new Error('Approval transaction failed');
                    }

                    setIsApproving(false);

                    // Now automatically proceed to send transaction
                    await sendTransactionAfterApproval(transferContractAddress, recipients, amounts, totalAmount);
                } catch (error: any) {
                    setIsApproving(false);
                    console.error('Approval error:', error);
                    setTxError(error.message || 'Approval failed');
                    return;
                }
            } else {
                // Native token or already approved ERC20 - proceed directly to send
                await sendTransactionAfterApproval(transferContractAddress, recipients, amounts, totalAmount);
            }
        } catch (error: any) {
            setIsSending(false);
            console.error('Transaction error:', error);
            setTxError(error.message || 'Transaction failed');
        }
    };

    // Helper function to send transaction after approval (or directly for native tokens)
    const sendTransactionAfterApproval = async (
        transferContract: string,
        recipients: `0x${string}`[],
        amounts: bigint[],
        totalAmount: bigint
    ) => {
        setIsSending(true);

        try {
            // For native token transfers
            if (selectedToken.address === NATIVE_ADDRESS) {
                await writeContractAsync({
                    address: transferContract as `0x${string}`,
                    abi: transferAbi.abi,
                    functionName: 'bulkTransfer',
                    args: [
                        NATIVE_ADDRESS, // Native token
                        recipients,
                        amounts
                    ],
                    value: totalAmount,
                    chainId: selectedChain.id
                });
            } else {
                // For ERC20 token transfers
                await writeContractAsync({
                    address: transferContract as `0x${string}`,
                    abi: transferAbi.abi,
                    functionName: 'bulkTransfer',
                    args: [
                        selectedToken.address as `0x${string}`,
                        recipients,
                        amounts
                    ],
                    chainId: selectedChain.id
                });
            }
        } catch (error) {
            throw error;
        } finally {
            setIsSending(false);
        }
    };

    // Reset transaction form after successful transaction
    useEffect(() => {
        if (isTxSuccess) {
            setTimeout(() => {
                setSelectedEmployees([]);
                if (selectedToken?.address !== NATIVE_ADDRESS) {
                    refetchAllowance();
                }

                // Hide payment status 5 seconds after success
                const timer = setTimeout(() => {
                    setShowPaymentStatus(false);
                    setApprovalTxHash(undefined);
                }, 5000);

                return () => clearTimeout(timer);
            }, 2000);
        }
    }, [isTxSuccess, refetchAllowance, selectedToken]);

    // Auto-hide error after 10 seconds
    useEffect(() => {
        if (txError || isTxError) {
            const timer = setTimeout(() => {
                setTxError('');
                // Only hide status if there's an error but no active transaction
                if (!isLoading && !isTxSuccess) {
                    setShowPaymentStatus(false);
                }
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [txError, isTxError, isLoading, isTxSuccess]);

    // Show payment status when there's activity
    useEffect(() => {
        if (isLoading || isTxSuccess || txError || isTxError || approvalTxHash || txHash) {
            setShowPaymentStatus(true);
        }
    }, [isLoading, isTxSuccess, txError, isTxError, approvalTxHash, txHash]);

    // Check if there's any transaction activity to show in PaymentStatus
    const hasTransactionActivity = isLoading || isTxSuccess || isTxError || txError || approvalTxHash || txHash;

    return (
        <div className="min-h-screen bg-[#0A0D14] font-mono text-[#F2F2F2] p-4 lg:p-6">
            {/* Navbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 z-40 bg-[#131620]/90 backdrop-blur-md border-b border-[#22304a]/30 px-4 py-3"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#2D8B75]/20 p-2 rounded-md">
                            <DollarSign className="w-5 h-5 text-[#2D8B75]" />
                        </div>
                        <h1 className="text-xl font-bold text-[#F2F2F2] font-mono hidden sm:block" style={{
                            textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
                        }}>Payzoll</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        {isConnected && (
                            <div className="mr-2 hidden md:flex items-center gap-2 px-3 py-2 bg-[#0c0f16]/80 rounded-xl border border-[#22304a]/30">
                                <span className="text-[#2D8B75] font-mono mr-1">{selectedToken?.symbol}</span>
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-400 font-mono text-sm">
                                    {selectedChain?.name || "Unknown Network"}
                                </span>
                            </div>
                        )}
                        <ConnectButton
                            chainStatus="icon"
                            showBalance={false}
                            accountStatus="address"
                        />
                    </div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto pt-16 md:pt-20">
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column - Token Selection */}
                    <div className="lg:col-span-4 xl:col-span-3">
                        {/* Token Selector */}
                        <TokenSelector
                            tokens={tokens[selectedChain.id] || []}
                            selectedToken={selectedToken}
                            onTokenChange={handleTokenChange}
                            address={address as `0x${string}`}
                            chainId={selectedChain?.id}
                            isConnected={isConnected}
                            isLoading={isLoading}
                            exchangeRate={exchangeRate}
                            onExchangeRateChange={handleExchangeRateChange}
                        />

                        {/* Payment Status - Only shown when there is transaction activity */}
                        <AnimatePresence>
                            {showPaymentStatus && hasTransactionActivity && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PaymentStatus
                                        txError={txError}
                                        isWritePending={isWritePending}
                                        isTxLoading={isTxLoading}
                                        isTxSuccess={isTxSuccess}
                                        isTxError={isTxError}
                                        approvalTxHash={approvalTxHash}
                                        isApproving={isApproving}
                                        txHash={txHash}
                                        getExplorerUrl={getExplorerUrl}
                                        needsApproval={needsApproval}
                                        selectedTokenSymbol={selectedToken?.symbol}
                                        selectedEmployeesCount={selectedEmployees.length}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column - Employee Table */}
                    <div className="lg:col-span-8 xl:col-span-9 space-y-6">
                        {isConnected ? (
                            <>
                                {/* Employee Table */}
                                <EmployeeTable
                                    employees={employees}
                                    selectedEmployees={selectedEmployees}
                                    toggleEmployeeSelection={toggleEmployeeSelection}
                                    toggleAllEmployees={toggleAllEmployees}
                                    allEmployeesSelected={allEmployeesSelected}
                                    usdToToken={usdToToken}
                                    selectedTokenSymbol={selectedToken?.symbol}
                                    isLoading={isLoading}
                                    onEmployeeUpdate={handleEmployeeUpdate}
                                    onEmployeeDelete={handleEmployeeDelete}
                                    onEmployeeAdd={handleEmployeeAdd}
                                />

                                {/* Action Button Panel */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-4 md:p-5 lg:p-6
                                              hover:border-[#2D8B75]/30 transition-all shadow-lg"
                                >
                                    <div className="mb-4">
                                        <h3 className="font-bold text-lg text-[#F2F2F2] font-mono mb-2" style={{
                                            textShadow: "0 0 5px rgba(45, 139, 117, 0.3), 0 0 10px rgba(45, 139, 117, 0.1)"
                                        }}>Execute Payments</h3>

                                        <p className="text-sm text-gray-400 font-mono">
                                            {selectedEmployees.length === 0
                                                ? 'Select employees to process payments'
                                                : `Send payments to ${selectedEmployees.length} selected employee${selectedEmployees.length !== 1 ? 's' : ''}`
                                            }
                                        </p>
                                    </div>

                                    {selectedEmployees.length > 0 && (
                                        <div className="p-3 bg-[#0c0f16]/80 border border-[#22304a]/30 rounded-xl mb-4 font-mono">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-400">Total USD:</span>
                                                <span className="text-[#F2F2F2] font-bold">${calculateTotalAmount().toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-400">Total {selectedToken?.symbol}:</span>
                                                <span className="text-[#2D8B75] font-bold">{usdToToken(calculateTotalAmount().toString())}</span>
                                            </div>
                                        </div>
                                    )}

                                    {needsApproval && selectedEmployees.length > 0 && (
                                        <div className="flex items-start gap-2 p-3 bg-[#2D8B75]/10 border border-[#2D8B75]/30 rounded-xl mb-4">
                                            <AlertTriangle className="w-4 h-4 text-[#2D8B75] mt-0.5 flex-shrink-0" />
                                            <p className="text-xs text-[#F2F2F2] font-mono">
                                                Token approval required. You'll need to confirm two transactions.
                                            </p>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleTransaction}
                                        disabled={isLoading || selectedEmployees.length === 0}
                                        className={`w-full p-3 rounded-xl font-medium transition-all flex items-center justify-center gap-3
                                              ${isLoading || selectedEmployees.length === 0
                                                ? 'bg-[#0c0f16]/80 text-gray-500 cursor-not-allowed border border-[#22304a]/30'
                                                : 'bg-[#2D8B75] text-white hover:bg-[#2D8B75]/80 shadow-lg shadow-[#2D8B75]/20'
                                            } font-mono`}
                                    >
                                        {isLoading ? (
                                            <ActivityIcon className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <DollarSign className="w-5 h-5" />
                                        )}
                                        <span>
                                            {isApproving
                                                ? `Approving ${selectedToken?.symbol}...`
                                                : isSending || isWritePending || isTxLoading
                                                    ? 'Processing Transaction...'
                                                    : selectedEmployees.length === 0
                                                        ? 'Select Employees to Pay'
                                                        : needsApproval && selectedToken?.address !== NATIVE_ADDRESS
                                                            ? `Approve & Send ${selectedToken?.symbol}`
                                                            : `Pay ${selectedEmployees.length} Employee${selectedEmployees.length !== 1 ? 's' : ''}`}
                                        </span>
                                    </button>
                                </motion.div>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-8 md:p-10 lg:p-12
                                         hover:border-[#2D8B75]/30 transition-all shadow-lg flex flex-col items-center justify-center"
                            >
                                <div className="bg-[#2D8B75]/10 p-6 rounded-full mb-6 border border-[#2D8B75]/20">
                                    <Wallet className="w-12 h-12 text-[#2D8B75]" />
                                </div>

                                <h2 className="text-2xl font-bold text-[#F2F2F2] mb-4 font-mono text-center" style={{
                                    textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
                                }}>Connect Your Wallet</h2>

                                <p className="text-gray-400 mb-6 font-mono text-center max-w-md">
                                    Connect your wallet to manage and process employee payments with cryptocurrency
                                </p>

                                <ConnectButton
                                    showBalance={false}
                                    chainStatus="icon"
                                    accountStatus="full"
                                />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDashboard;