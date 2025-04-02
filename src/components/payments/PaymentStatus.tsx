"use client";
import {
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
    ExternalLink,
    Copy,
    Info
} from "lucide-react";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface PaymentStatusProps {
    txError: string;
    isWritePending: boolean;
    isTxLoading: boolean;
    isTxSuccess: boolean;
    isTxError: boolean;
    approvalTxHash?: `0x${string}`;
    isApproving: boolean;
    txHash?: `0x${string}`;
    getExplorerUrl: (hash?: `0x${string}`) => string;
    needsApproval: boolean;
    selectedTokenSymbol?: string;
    selectedEmployeesCount: number;
}

const PaymentStatus = ({
    txError,
    isWritePending,
    isTxLoading,
    isTxSuccess,
    isTxError,
    approvalTxHash,
    isApproving,
    txHash,
    getExplorerUrl,
    needsApproval,
    selectedTokenSymbol,
    selectedEmployeesCount
}: PaymentStatusProps) => {
    const [copySuccess, setCopySuccess] = useState(false);

    // Copy transaction hash to clipboard
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    // Auto-reset copy success after 2 seconds
    useEffect(() => {
        if (copySuccess) {
            const timer = setTimeout(() => setCopySuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [copySuccess]);

    const isProcessing = isWritePending || isTxLoading || isApproving;

    // Calculate status state
    const getStatusState = () => {
        if (isProcessing) return "processing";
        if (isTxSuccess) return "success";
        if (isTxError || txError) return "error";
        if (txHash) return "complete";
        return "idle";
    };

    const statusState = getStatusState();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#131620]/90 backdrop-blur-sm border border-[#22304a]/30 rounded-xl p-4 md:p-5 lg:p-6
                      hover:border-[#2D8B75]/30 transition-all shadow-lg h-full"
        >
            <div className="flex items-center gap-3 mb-5">
                <div className={`p-2 rounded-md ${statusState === "processing" ? "bg-[#B38D36]/20 animate-pulse" :
                        statusState === "success" ? "bg-green-400/20" :
                            statusState === "error" ? "bg-red-400/20" :
                                "bg-[#2D8B75]/20"
                    }`}>
                    {statusState === "processing" && <Clock className="w-5 h-5 text-[#B38D36]" />}
                    {statusState === "success" && <CheckCircle className="w-5 h-5 text-green-400" />}
                    {statusState === "error" && <XCircle className="w-5 h-5 text-red-400" />}
                    {statusState === "idle" && <Info className="w-5 h-5 text-[#2D8B75]" />}
                </div>
                <h2 className="text-lg font-bold text-[#F2F2F2] font-mono" style={{
                    textShadow: "0 0 5px rgba(45, 139, 117, 0.4), 0 0 10px rgba(45, 139, 117, 0.2)"
                }}>
                    Transaction Status
                </h2>
            </div>

            <div className="space-y-4">
                {/* Transaction errors */}
                {txError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3 p-4 bg-red-400/10 border border-red-400/30 
                                 text-[#F2F2F2] rounded-xl text-sm"
                    >
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="font-mono">{txError}</p>
                    </motion.div>
                )}

                {/* Processing indicator */}
                {isProcessing && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3 p-4 bg-[#B38D36]/10 border border-[#B38D36]/30 
                                 text-[#F2F2F2] rounded-xl text-sm"
                    >
                        <Clock className="w-5 h-5 text-[#B38D36] animate-spin flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium mb-1 font-mono">
                                {isApproving
                                    ? `Approving ${selectedTokenSymbol}...`
                                    : "Processing transaction..."}
                            </p>
                            <p className="text-gray-400 font-mono">
                                Please wait while the transaction is being processed
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Success message */}
                {isTxSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3 p-4 bg-green-400/10 border border-green-400/30 
                                 text-[#F2F2F2] rounded-xl text-sm"
                    >
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium mb-1 font-mono">Payment successful!</p>
                            <p className="text-gray-400 font-mono">
                                {selectedEmployeesCount} employee{selectedEmployeesCount !== 1 ? 's' : ''} paid successfully
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Error state */}
                {isTxError && !txError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3 p-4 bg-red-400/10 border border-red-400/30 
                                 text-[#F2F2F2] rounded-xl text-sm"
                    >
                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium mb-1 font-mono">Transaction failed</p>
                            <p className="text-gray-400 font-mono">
                                The transaction could not be processed. Please try again.
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Approval transaction hash */}
                {approvalTxHash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-4 bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl border border-[#22304a]/30"
                    >
                        <p className="text-gray-400 mb-2 text-sm font-mono">Approval Transaction:</p>
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[#F2F2F2] text-xs truncate font-mono bg-[#131620] p-2 rounded-xl flex-1">
                                {approvalTxHash}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => copyToClipboard(approvalTxHash)}
                                    className="text-[#2D8B75] hover:text-[#2D8B75]/80 p-2 bg-[#131620] rounded-xl transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <a
                                    href={getExplorerUrl(approvalTxHash)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2D8B75] hover:text-[#2D8B75]/80 p-2 bg-[#131620] rounded-xl transition-colors"
                                    title="View on explorer"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Main transaction hash */}
                {txHash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 p-4 bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl border border-[#22304a]/30"
                    >
                        <p className="text-gray-400 mb-2 text-sm font-mono">Transaction Hash:</p>
                        <div className="flex items-center justify-between gap-2">
                            <div className="text-[#F2F2F2] text-xs truncate font-mono bg-[#131620] p-2 rounded-xl flex-1">
                                {txHash}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => copyToClipboard(txHash)}
                                    className="text-[#2D8B75] hover:text-[#2D8B75]/80 p-2 bg-[#131620] rounded-xl transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {copySuccess ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <a
                                    href={getExplorerUrl(txHash)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2D8B75] hover:text-[#2D8B75]/80 p-2 bg-[#131620] rounded-xl transition-colors"
                                    title="View on explorer"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Information about approval */}
                {needsApproval && !isProcessing && !isTxSuccess && !isTxError && selectedEmployeesCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-[#2D8B75]/10 border border-[#2D8B75]/30 rounded-xl text-sm flex items-start gap-2"
                    >
                        <Info className="w-5 h-5 text-[#2D8B75] flex-shrink-0 mt-0.5" />
                        <p className="text-[#F2F2F2] font-mono">
                            This transaction requires approval to use {selectedTokenSymbol}.
                            You'll need to confirm two transactions.
                        </p>
                    </motion.div>
                )}

                {!isProcessing && !isTxSuccess && !isTxError && !txError && !needsApproval && !txHash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center p-8 bg-[#0c0f16]/80 backdrop-blur-sm rounded-xl border border-[#22304a]/30"
                    >
                        <Clock className="w-10 h-10 text-gray-400 opacity-50 mb-2" />
                        <p className="text-gray-400 text-center font-mono">
                            No active transactions
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default PaymentStatus;