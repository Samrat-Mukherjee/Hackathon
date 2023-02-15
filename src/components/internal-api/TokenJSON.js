import matic from "../../../node_modules/cryptocurrency-icons/svg/icon/matic.svg";
//import eth from "../../../node_modules/cryptocurrency-icons/svg/icon/eth.svg";
import sol from "../../../node_modules/cryptocurrency-icons/svg/icon/sol.svg";
import usdc from "../../../node_modules/cryptocurrency-icons/svg/icon/usdc.svg";
import usdt from "../../../node_modules/cryptocurrency-icons/svg/icon/usdt.svg";
import dai from "../../../node_modules/cryptocurrency-icons/svg/icon/dai.svg";
//import busd from "../../../node_modules/cryptocurrency-icons/svg/icon/busd.svg";
import zrx from "../../../node_modules/cryptocurrency-icons/svg/icon/zrx.svg";
import wbtc from "../../../node_modules/cryptocurrency-icons/svg/icon/wbtc.svg";
import busd from '../../assets/binance.svg';
import eth from '../../assets/ethereum.svg';
import weth from '../../assets/wrapethereum.svg';

const tokenABI = [
    {
        "id" : 1,
        "name" : "Polygon",
        "symbol" : "MATIC",
        "decimal": 18,
        "img" : matic,
        "address" : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    },
    {
        "id" : 2,
        "name" : "Wrapped Ether",
        "symbol" : "WETH",
        "decimal": 18,
        "img" : eth,
        "address" : "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
    },

    {
        "id" : 3,
        "name" : "Solana",
        "symbol" : "SOL",
        "decimal": 18,
        "img" : sol,
        "address" : "0x7DfF46370e9eA5f0Bad3C4E29711aD50062EA7A4"
    },
    {
        "id" : 4,
        "name" : "USD Coin",
        "symbol" : "USDC",
        "decimal": 6,
        "img" : usdc,
        "address" : "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
    },
    {
        "id" : 5,
        "name" : "Tether USD",
        "symbol" : "USDT",
        "decimal": 6,
        "img" : usdt,
        "address" : "0xc2132D05D31c914a87C6611C10748AEb04B58e8F"
    },
    {
        "id" : 6,
        "name" : "Dai",
        "symbol" : "DAI",
        "decimal": 18,
        "img" : dai,
        "address" : "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"
    },
    {
        "id" : 7,
        "name" : "Binance USD",
        "symbol" : "BUSD",
        "decimal": 18,
        "img" : busd,
        "address" : "0xdAb529f40E671A1D4bF91361c21bf9f0C9712ab7"
    },
    {
        "id" : 8,
        "name" : "0x",
        "symbol" : "ZRX",
        "decimal": 18,
        "img" : zrx,
        "address" : "0x5559Edb74751A0edE9DeA4DC23aeE72cCA6bE3D5"
    },
    {
        "id" : 9,
        "name" : "Wrapped BTC",
        "symbol" : "WBTC",
        "decimal": 8,
        "img" : wbtc,
        "address" : "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6"
    },
    {
        "id" : 10,
        "name" : "Wrapped Matic",
        "symbol" : "WMATIC",
        "decimal": 18,
        "img" : matic,
        "address" : "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
    },
];

export default tokenABI;