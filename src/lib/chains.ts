import { defineChain } from 'viem'

export const polygon = defineChain({
    id: 137,
    name: 'Polygon',
    nativeCurrency: { decimals: 18, name: 'MATIC', symbol: 'MATIC' },
    rpcUrls: {
        default: { http: ['https://polygon-rpc.com'] },
    },
    blockExplorers: {
        default: { name: 'Polygonscan', url: 'https://polygonscan.com' },
    },
})

export const bnb = defineChain({
    id: 56,
    name: 'BNB Chain',
    nativeCurrency: { decimals: 18, name: 'BNB', symbol: 'BNB' },
    rpcUrls: {
        default: { http: ['https://binance.llamarpc.com'] },
    },
    blockExplorers: {
        default: { name: 'BscScan', url: 'https://bscscan.com' },
    },
})

export const educhain = defineChain({
    id: 41923,
    name: 'Educhain',
    nativeCurrency: { decimals: 18, name: 'EDU', symbol: 'EDU' },
    rpcUrls: {
        default: { http: ['https://rpc.edu-chain.raas.gelato.cloud/66a13f09ceab49998f954e7bb71c7c02'] },
    },
    blockExplorers: {
        default: { name: 'Blockscout', url: 'https://educhain.blockscout.com' },
    },
})


export const avalanche = defineChain({
    id: 43114,
    name: 'Avalanche',
    nativeCurrency: { decimals: 18, name: 'AVAX', symbol: 'AVAX' },
    rpcUrls: {
        default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
        default: { name: 'Snowtrace', url: 'https://snowtrace.io' },
    },
})


export const optimism = defineChain({
    id: 10,
    name: 'Optimism',
    nativeCurrency: { decimals: 18, name: 'ETH', symbol: 'ETH' },
    rpcUrls: {
        default: { http: ['https://mainnet.optimism.io'] },
    },
    blockExplorers: {
        default: { name: 'OptimismScan', url: 'https://optimistic.etherscan.io' },
    },
})

export const allMainnetChains = [
    polygon,
    bnb,
    educhain,
    avalanche,
    optimism
]