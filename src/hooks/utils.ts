import { Alchemy, Network } from "alchemy-sdk";

export const AlchemyInstance = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});