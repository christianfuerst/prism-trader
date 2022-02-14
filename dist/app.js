"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const terra_js_1 = require("@terra-money/terra.js");
const signale_1 = __importDefault(require("signale"));
const config_1 = __importDefault(require("./config"));
signale_1.default.config({
    displayTimestamp: true,
    displayDate: true,
});
const terra = new terra_js_1.LCDClient({
    URL: "https://lcd.terra.dev",
    chainID: "columbus-5",
    gasPrices: { uusd: 0.15 },
});
const mk = new terra_js_1.MnemonicKey({
    mnemonic: config_1.default.mnemonic,
});
const wallet = terra.wallet(mk);
// cLUNA > LUNA
const simulateStrategyOne = (offerAmount) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield terra.wasm.contractQuery("terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx", {
        simulate_swap_operations: {
            operations: [
                {
                    astro_swap: {
                        ask_asset_info: {
                            native_token: {
                                denom: "uluna",
                            },
                        },
                        offer_asset_info: {
                            native_token: {
                                denom: "uusd",
                            },
                        },
                    },
                },
            ],
            offer_amount: offerAmount.toString(),
        },
    });
    const offer_amount_luna = parseInt(result.amount);
    result = yield terra.wasm.contractQuery("terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c", {
        simulate_swap_operations: {
            operations: [
                {
                    prism_swap: {
                        ask_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                        offer_asset_info: {
                            native: "uluna",
                        },
                    },
                },
                {
                    prism_swap: {
                        ask_asset_info: {
                            native: "uusd",
                        },
                        offer_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                    },
                },
            ],
            offer_amount: offer_amount_luna.toString(),
        },
    });
    return parseInt(result.amount);
});
// cLUNA < LUNA
const simulateStrategyTwo = (offerAmount) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield terra.wasm.contractQuery("terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c", {
        simulate_swap_operations: {
            operations: [
                {
                    prism_swap: {
                        ask_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                        offer_asset_info: {
                            native: "uusd",
                        },
                    },
                },
                {
                    prism_swap: {
                        ask_asset_info: {
                            native: "uluna",
                        },
                        offer_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                    },
                },
            ],
            offer_amount: offerAmount.toString(),
        },
    });
    const offer_amount_luna = parseInt(result.amount);
    result = yield terra.wasm.contractQuery("terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx", {
        simulate_swap_operations: {
            operations: [
                {
                    astro_swap: {
                        ask_asset_info: {
                            native_token: {
                                denom: "uusd",
                            },
                        },
                        offer_asset_info: {
                            native_token: {
                                denom: "uluna",
                            },
                        },
                    },
                },
            ],
            offer_amount: offer_amount_luna.toString(),
        },
    });
    return parseInt(result.amount);
});
// pLUNA + yLUNA > LUNA
const simulateStrategyThree = (offerAmount) => __awaiter(void 0, void 0, void 0, function* () {
    let result;
    result = yield terra.wasm.contractQuery("terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx", {
        simulate_swap_operations: {
            operations: [
                {
                    astro_swap: {
                        ask_asset_info: {
                            native_token: {
                                denom: "uluna",
                            },
                        },
                        offer_asset_info: {
                            native_token: {
                                denom: "uusd",
                            },
                        },
                    },
                },
            ],
            offer_amount: offerAmount.toString(),
        },
    });
    const offer_amount_luna = parseInt(result.amount);
    result = yield terra.wasm.contractQuery("terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c", {
        simulate_swap_operations: {
            operations: [
                {
                    prism_swap: {
                        ask_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                        offer_asset_info: {
                            cw20: "terra1tlgelulz9pdkhls6uglfn5lmxarx7f2gxtdzh2",
                        },
                    },
                },
                {
                    prism_swap: {
                        ask_asset_info: {
                            native: "uusd",
                        },
                        offer_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                    },
                },
            ],
            offer_amount: offer_amount_luna.toString(),
        },
    });
    const pAmount = parseInt(result.amount);
    result = yield terra.wasm.contractQuery("terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c", {
        simulate_swap_operations: {
            operations: [
                {
                    prism_swap: {
                        ask_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                        offer_asset_info: {
                            cw20: "terra17wkadg0tah554r35x6wvff0y5s7ve8npcjfuhz",
                        },
                    },
                },
                {
                    prism_swap: {
                        ask_asset_info: {
                            native: "uusd",
                        },
                        offer_asset_info: {
                            cw20: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
                        },
                    },
                },
            ],
            offer_amount: offer_amount_luna.toString(),
        },
    });
    const yAmount = parseInt(result.amount);
    return pAmount + yAmount;
});
const getAssetBalance = (contract, address) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield terra.wasm.contractQuery(contract, {
        balance: {
            address: address,
        },
    });
    return result.balance;
});
const handleTrading = () => __awaiter(void 0, void 0, void 0, function* () {
    // How much UST should be used for one trade?
    const tradeAmount = 100 * 1000000;
    let resultStrategyOne = 1;
    let resultStrategyTwo = 1;
    let resultStrategyThree = 1;
    resultStrategyOne = yield simulateStrategyOne(tradeAmount);
    resultStrategyTwo = yield simulateStrategyTwo(tradeAmount);
    resultStrategyThree = yield simulateStrategyThree(tradeAmount);
    const walletBalance = yield terra.bank.balance(config_1.default.address);
    const ustBalance = walletBalance[0].get("uusd")
        ? walletBalance[0].get("uusd").amount.toNumber()
        : 0;
    signale_1.default.info(`Strategy: cLUNA > LUNA | IN: ${(tradeAmount / 1000000).toFixed(2)} UST | OUT: ${(resultStrategyOne / 1000000).toFixed(2)} UST | PROFIT: ${(resultStrategyOne / 1000000 -
        tradeAmount / 1000000).toFixed(2)} UST`);
    signale_1.default.info(`Strategy: cLUNA < LUNA | IN: ${(tradeAmount / 1000000).toFixed(2)} UST | OUT: ${(resultStrategyTwo / 1000000).toFixed(2)} UST | PROFIT: ${(resultStrategyTwo / 1000000 -
        tradeAmount / 1000000).toFixed(2)} UST`);
    signale_1.default.info(`Strategy: pLUNA + yLUNA > LUNA | IN: ${(tradeAmount / 1000000).toFixed(2)} UST | OUT: ${(resultStrategyThree / 1000000).toFixed(2)} UST | PROFIT: ${(resultStrategyThree / 1000000 -
        tradeAmount / 1000000).toFixed(2)} UST`);
});
handleTrading();
setInterval(handleTrading, 20000);
//# sourceMappingURL=app.js.map