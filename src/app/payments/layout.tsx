"use client";
import React from 'react';
// import type { Metadata } from "next";
import { RainbowKitProvider, getDefaultConfig, Chain, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

// Define your chains according to RainbowKit's Chain type
const polygon = {
    id: 137,
    name: 'Polygon',
    iconUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    iconBackground: 'Black',
    nativeCurrency: { name: 'Polygon', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://polygon-rpc.com'] },
    },
    blockExplorers: {
        default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
    },
} as const satisfies Chain;

const bnb = {
    id: 56,
    name: 'BNB Chain',
    iconUrl: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    iconBackground: 'Black',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://binance.llamarpc.com'] },
    },
    blockExplorers: {
        default: { name: 'BscScan', url: 'https://bscscan.com' },
    },
} as const satisfies Chain;


const educhain = {
    id: 41923,
    name: 'Educhain',
    iconUrl: 'https://cryptologos.cc/logos/open-campus-edu-logo.png?v=040',
    iconBackground: 'Black',
    nativeCurrency: { name: 'Educhain', symbol: 'EDU', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.edu-chain.raas.gelato.cloud/66a13f09ceab49998f954e7bb71c7c02'] },
    },
    blockExplorers: {
        default: { name: 'Blockscout', url: 'https://educhain.blockscout.com' },
    },
} as const satisfies Chain;

const optimism = {
    id: 10,
    name: 'Optimism',
    iconUrl: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=040',
    iconBackground: '#fff',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://mainnet.optimism.io'] },
    },
    blockExplorers: {
        default: { name: 'OptimismScan', url: 'https://optimistic.etherscan.io' },
    },
} as const satisfies Chain;

const avalanche = {
    id: 43114,
    name: 'Avalanche',
    iconUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.png?v=040',
    iconBackground: 'Black',
    nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
        default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
} as const satisfies Chain;


const bnbTestnet = {
    id: 97,
    name: 'BNB Chain Testnet',
    iconUrl: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    iconBackground: 'Black',
    nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
    },
    blockExplorers: {
        default: { name: 'BscScan Testnet', url: 'https://testnet.bscscan.com' },
    },
} as const satisfies Chain;


// Configure RainbowKit using these chains
const config = getDefaultConfig({
    appName: 'PayZoll',
    projectId: '23c5e43972b3775ee6ed4f74f3e76efb', // Replace with your project ID
    chains: [polygon, avalanche, bnb, educhain, optimism, bnbTestnet],
});

// Create query client
const queryClient = new QueryClient();

export default function PaymentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="payments-layout">
            <div className="container mx-auto px-4 py-6">
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider theme={darkTheme()}>
                            {children}
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>

            </div>
        </div>
    );
}