export interface Token {
  contract_addr: string;
}

export interface Info {
  token: Token;
}

export interface Asset {
  info: Info;
  amount: string;
}

export interface Pool {
  assets: Asset[];
  total_share: string;
}

export interface Balance {
  balance: number;
}

export interface AnchorState {
  total_liabilities: string;
  total_reserves: string;
  last_interest_updated: number;
  last_reward_updated: number;
  global_interest_index: string;
  global_reward_index: string;
  anc_emission_rate: string;
  prev_aterra_supply: string;
  prev_exchange_rate: string;
}

export interface Simulation {
  amount: string;
}
