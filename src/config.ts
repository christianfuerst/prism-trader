import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  address: string;
  mnemonic: string;
}

const config: Config = {
  address: process.env.ADDRESS,
  mnemonic: process.env.MNEMONIC,
};

export default config;
