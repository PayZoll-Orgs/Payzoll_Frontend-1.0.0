import {
    polygon,
    bnb,
    educhain,
    optimism,
    avalanche,
    bnbTestnet,
} from "./evm-chains-mainnet";


export const contractMainnetAddresses = {
    [bnb.id]: '0x2c137aC6Bc804A9F798053347802F489F0025768',
    [educhain.id]: '0xYourContractAddressOnEduchainMainnet',
    [polygon.id]: '0xYourContractAddressOnPolygonMainnet',
    [avalanche.id]: '0xYourContractAddressOnAvalanche',
    [optimism.id]: '0xYourContractAddressOnOptimism',
    [bnbTestnet.id]:'0x9571BcCA765f30FF221dfB976ab530Ba44bd85AE'
    // [arbitrum.id]: '0xYourContractAddressOnArbitrum',
};


export const tokensPerMainnetChain = {
    [polygon.id]: [
        { symbol: 'MATIC', address: '0x0000000000000000000000000000000000001010', decimals: 18 },
        { symbol: 'USDT', address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', decimals: 6 },
        { symbol: 'USDC', address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', decimals: 6 },
    ],
    [bnb.id]: [
        { symbol: 'BNB', address: '0x0000000000000000000000000000000000000000', decimals: 18 },
        { symbol: 'USDT', address: '0x55d398326f99059fF775485246999027B3197955', decimals: 6 },
        { symbol: 'USDC', address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', decimals: 6 },
    ],
    [educhain.id]: [
        { symbol: 'EDU', address: '0x0000000000000000000000000000000000000000', decimals: 18 },
        { symbol: 'USDT', address: '0x7277Cc818e3F3FfBb169c6Da9CC77Fc2d2a34895', decimals: 6 },
        { symbol: 'USDC', address: '0x836d275563bAb5E93Fd6Ca62a95dB7065Da94342', decimals: 6 },
    ],
    [avalanche.id]: [
        { symbol: 'AVAX', address: '0x0000000000000000000000000000000000000000', decimals: 18 },
        { symbol: 'USDC', address: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', decimals: 6 },
        { symbol: 'USDC.e', address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', decimals: 6 },
        { symbol: 'USDT', address: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', decimals: 6 },
        { symbol: 'USDT.e', address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', decimals: 6 },
        { symbol: 'DAI.e', address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', decimals: 18 },
    ],
    [optimism.id]: [
        { symbol: 'ETH', address: '0x0000000000000000000000000000000000000000', decimals: 18 },
        { symbol: 'USDC', address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', decimals: 6 },
        { symbol: 'USDT', address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', decimals: 6 },
    ],
    [bnbTestnet.id]: [
        { symbol: "tBNB", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
        { symbol: "USDT", address: "0x337610d27c682e347c9cd60bd4b3b107c9d34ddd", decimals: 18 },
        { symbol: "USDC", address: "0x0a385f86059e0b2a048171d78afd1f38558121f3", decimals: 18 },
    ],
};