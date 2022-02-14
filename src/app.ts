import {
  LCDClient,
  MnemonicKey,
  MsgExecuteContract,
  Coin,
} from "@terra-money/terra.js";
import signale from "signale";

import { Balance, Simulation } from "./types";
import config from "./config";

signale.config({
  displayTimestamp: true,
  displayDate: true,
});

const terra = new LCDClient({
  URL: "https://lcd.terra.dev",
  chainID: "columbus-5",
  gasPrices: { uusd: 0.15 },
});

const mk = new MnemonicKey({
  mnemonic: config.mnemonic,
});

const wallet = terra.wallet(mk);

// cLUNA > LUNA
const simulateStrategyOne = async (offerAmount: number) => {
  let result: Simulation;

  result = await terra.wasm.contractQuery(
    "terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx",
    {
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
    }
  );

  const offer_amount_luna: number = parseInt(result.amount);

  result = await terra.wasm.contractQuery(
    "terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c",
    {
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
    }
  );

  return parseInt(result.amount);
};

// cLUNA < LUNA
const simulateStrategyTwo = async (offerAmount: number) => {
  let result: Simulation;

  result = await terra.wasm.contractQuery(
    "terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c",
    {
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
    }
  );

  const offer_amount_luna: number = parseInt(result.amount);

  result = await terra.wasm.contractQuery(
    "terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx",
    {
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
    }
  );

  return parseInt(result.amount);
};

// pLUNA + yLUNA > LUNA
const simulateStrategyThree = async (offerAmount: number) => {
  let result: Simulation;

  result = await terra.wasm.contractQuery(
    "terra16t7dpwwgx9n3lq6l6te3753lsjqwhxwpday9zx",
    {
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
    }
  );

  const offer_amount_luna: number = parseInt(result.amount);

  result = await terra.wasm.contractQuery(
    "terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c",
    {
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
    }
  );

  const pAmount: number = parseInt(result.amount);

  result = await terra.wasm.contractQuery(
    "terra1yrc0zpwhuqezfnhdgvvh7vs5svqtgyl7pu3n6c",
    {
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
    }
  );

  const yAmount: number = parseInt(result.amount);

  return pAmount + yAmount;
};

const getAssetBalance = async (contract: string, address: string) => {
  const result: Balance = await terra.wasm.contractQuery(contract, {
    balance: {
      address: address,
    },
  });

  return result.balance;
};

const handleTrading = async () => {
  // How much UST should be used for one trade?
  const tradeAmount: number = 100 * 1000000;

  let resultStrategyOne: number = 1;
  let resultStrategyTwo: number = 1;
  let resultStrategyThree: number = 1;

  resultStrategyOne = await simulateStrategyOne(tradeAmount);
  resultStrategyTwo = await simulateStrategyTwo(tradeAmount);
  resultStrategyThree = await simulateStrategyThree(tradeAmount);

  const walletBalance = await terra.bank.balance(config.address);
  const ustBalance = walletBalance[0].get("uusd")
    ? walletBalance[0].get("uusd").amount.toNumber()
    : 0;

  signale.info(
    `Strategy: cLUNA > LUNA | IN: ${(tradeAmount / 1000000).toFixed(
      2
    )} UST | OUT: ${(resultStrategyOne / 1000000).toFixed(2)} UST | PROFIT: ${(
      resultStrategyOne / 1000000 -
      tradeAmount / 1000000
    ).toFixed(2)} UST`
  );

  signale.info(
    `Strategy: cLUNA < LUNA | IN: ${(tradeAmount / 1000000).toFixed(
      2
    )} UST | OUT: ${(resultStrategyTwo / 1000000).toFixed(2)} UST | PROFIT: ${(
      resultStrategyTwo / 1000000 -
      tradeAmount / 1000000
    ).toFixed(2)} UST`
  );

  signale.info(
    `Strategy: pLUNA + yLUNA > LUNA | IN: ${(tradeAmount / 1000000).toFixed(
      2
    )} UST | OUT: ${(resultStrategyThree / 1000000).toFixed(
      2
    )} UST | PROFIT: ${(
      resultStrategyThree / 1000000 -
      tradeAmount / 1000000
    ).toFixed(2)} UST`
  );
};

handleTrading();
setInterval(handleTrading, 20000);
